import client from '$lib/utils/redisClient';
import supabase from './utilitySupabase';
import Cf from 'cf-wrapper';

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

const create_game = async (user1: string, user2: string, x: number) => {
    // Get random account for the set accounts
    // const account = await client.sRandMember('accounts') || 'username;password';
    const cl = new Cf('', '');
    try {
        const problems: string[] = [];
        for (let i = 0; i < 500; i+=100) {
            const problem: Problem = JSON.parse(await client.sRandMember(`${x+i}`) || '{}');
            const statement = await cl.getProblemStatement(problem.contestId, problem.index);
            console.log(statement);
            await client.hSet('problems', `${problem.contestId}/${problem.index}`, statement);
            problems.push(`${problem.contestId}/${problem.index}`);
        }
        const id = uuidv4();

        const { data, error } = await supabase.from('match').insert({
            id: id,
            type: 'lockout',
            contestant_1: user1,
            contestant_2: user2,
            scores: [0, 0],
            problems: problems,
            start_time: new Date(Date.now() + 5000).toISOString(),
            duration: 45 * 60,
            who_solved: [0, 0, 0, 0, 0]
        });

        const resp = await supabase.from('user').update({
            match: id
        }).or(`username.eq.${user1},username.eq.${user2}`);

        console.log(resp);

        await client.hSet('match', user1, id);
        await client.hSet('match', user2, id);
    } catch (e) {
        console.log(e);
    }
}

const update_scores = async () => {
    const users = await client.hGetAll('sockets');
    const now = Math.floor(Date.now()/1000);
    Object.keys(users).forEach(async (user) => {
        const { joinedAt } = JSON.parse(users[user]);
        const player_elo_range = Math.min(
            50 * (1 + 25 / 100) ** Math.floor((now - joinedAt) / 10), 300
        );
        const rating = await client.hGet('elo', user) || '1500';
        await client.zAdd('queue_upper', [{score: parseInt(rating) + player_elo_range, value: user}]);
        await client.zAdd('queue_lower', [{score: parseInt(rating) - player_elo_range, value: user}]);
    });
}

const matchmake = async () => {
    await client.connect();
    await update_scores();
    const { members: players_up } = await client.zScan('queue_upper', 0);
    console.log(players_up);
    if (players_up.length <= 1) {
        return;
    }
    for (let i = players_up.length - 1; i > 0; i--) {
        const player1 = players_up[i];
        const player1_up = player1.score;
        const player1_lo = await client.zScore('queue_lower', player1.value) || player1_up;

        // Since player1 always has the highest score, all the possible intersections need to have 
        // player2_up between player1_lo and player1_up

        // []: player1
        // {}: player2
        // case1: [   {  ]    }
        // case2: [   {    }  ]
        // case3: [      ] {   }
        // (the rest of the cases were ommitted because it would imply that player1 doesn't have the highest score)
        // we're only interested in case1 and case2
        
        if (
            players_up[i - 1].score >= player1_lo &&
            players_up[i - 1].score <= player1_up
        ) {
            const x = Math.min(
                Math.round(parseInt(await client.hGet('elo', player1.value)|| '1500')/100) * 100,
                Math.round(parseInt(await client.hGet('elo', players_up[i - 1].value) || '1500')) * 100
            );
            await create_game(player1.value, players_up[i - 1].value, x);
            console.log(player1.value, players_up[i - 1].value);
            await client.zRem('queue_upper', player1.value);
            await client.zRem('queue_lower', player1.value);
            await client.zRem('queue_upper', players_up[i - 1].value);
            await client.zRem('queue_lower', players_up[i - 1].value);
            await client.hDel('sockets', player1.value);
            await client.hDel('sockets', players_up[i - 1].value);
            await client.hDel('elo', player1.value);
            await client.hDel('elo', players_up[i - 1].value);
             i--;
        }
    }
    await client.disconnect();
}

export default matchmake;