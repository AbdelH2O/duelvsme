import supabase from './utilitySupabase.js';
import calcReward from './calcRewards.js';
import Cf from 'cf-wrapper';

const checkSubmissions = async () => {
    const cl = new Cf();
    const submissions = (await supabase.from('submissions').select('*').filter('processed', 'eq', false));
    // console.log('submissions:', submissions);
    submissions.data.forEach(async (sub) => {
        
        const verdict = await cl.checkSubmission(sub.problem.split('/')[0], sub.id);
        let processed = true;
        if (verdict[0].startsWith('In queue') || verdict[0].startsWith('Running')) {
            processed = false;
        } else if (verdict[0].startsWith('Accepted')) {
            const match = await supabase
                .from('match')
                .select('problems, who_solved, scores, contestant_1')
                .filter('id', 'eq', sub.match);
            const who_solved = match.data[0].who_solved;
            who_solved[match.data[0].problems.indexOf(sub.problem)] = match.data[0].contestant_1 === sub.username ? 1 : 2;   
            const scores = match.data[0].scores;
            let processed = false;
            if (scores.some((score) => score >= 800)) {
                calcReward(sub.match);
                processed = true;
            }
            scores[match.data[0].contestant_1 === sub.username ? 0 : 1] += 100 * (match.data[0].problems.indexOf(sub.problem));
            const resp = await supabase.from('match').update({
                who_solved,
                scores,
                processed,
            }).match({
                id: sub.match,
            });
        }
        if (sub.status !== verdict[0]){
            const resp = await supabase.from('submissions').update({
                status: verdict[0],
                runtime: verdict[1],
                memory: verdict[2],
                processed,
            }).match({
                id: sub.id
            });
        }
    });
}

export default checkSubmissions;