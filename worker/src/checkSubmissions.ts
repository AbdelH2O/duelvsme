import supabase from './utilitySupabase';
import Cf from 'cf-wrapper';

const checkSubmissions = async () => {
    const cl = new Cf();
    const submissions = (await supabase.from('submissions').select('*').filter('processed', 'eq', false)) as {
        data: Submission[],
    };
    console.log('submissions:', submissions);
    submissions.data.forEach(async (sub) => {
        
        const verdict = await cl.checkSubmission(sub.problem.split('/')[0], sub.id);
        let processed = true;
        if (verdict[0].startsWith('In queue') || verdict[0].startsWith('Running')) {
            processed = false;
        } else if (verdict[0].startsWith('Accepted')) {
            const match = await supabase
                .from('match')
                .select('problems, who_solved, contestant_1')
                .filter('id', 'eq', sub.match) as {
                    data: Game[],
                };
            const who_solved = match.data[0].who_solved;
            who_solved[match.data[0].problems.indexOf(sub.problem)] = match.data[0].contestant_1 === sub.username ? 1 : 2;            
            const resp = await supabase.from('match').update({
                who_solved,
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