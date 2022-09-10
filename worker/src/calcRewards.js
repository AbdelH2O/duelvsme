import supabase from "./utilitySupabase.js";
import client from './redisClient.js';
import * as elo from "elo-rating";

const calcReward = async (matchId) => {
    const match = await supabase
        .from("match")
        .select("problems, who_solved, scores, contestant_1, contestant_2, ratings")
        .filter("id", "eq", matchId);
    if (match.data[0].processed) {
        return;
    }
    const users = await supabase
        .from("user")
        .select('username, level, xp')
        .or(
            `username.eq.${match.data[0].contestant_1},username.eq.${match.data[0].contestant_2}`
        );
    const who_won = match.data[0].scores[0] === match.data[0].scores[1] ?
        [1, 1] :
        (
            match.data[0].scores[0] > match.data[0].scores[1] ?
            [2, 1] :
            [1, 2]
        );
    const result = elo.default.calculate(match.data[0].ratings[0], match.data[0].ratings[1], who_won % 2);
    const player1 = users.data.find((user) => user.username === match.data[0].contestant_1);
    const player2 = users.data.find((user) => user.username === match.data[0].contestant_2);
    const needed_xp1 = ((player1.level + 1) * (player1.level + 1) / 2) * 180;
    const needed_xp2 = ((player2.level + 1) * (player2.level + 1) / 2) * 180;
    const xp1 = Math.max(
                    10,
                    Math.round(match.data[0].scores[0] / 10) +
                    (((-1) ** who_won[0]) * 10) *
                    (1 + player1.level / 100)
                );
    const xp2 = Math.max(
                    10,
                    Math.round(match.data[0].scores[0] / 10) +
                    (((-1) ** who_won[1]) * 10) *
                    (1 + player2.level / 100)
                );
    const resp = await supabase.from("user").update({
        rating: result.playerRating,
        match: null,
        xp: player1.xp + xp1,
        level: player1.xp + xp1 >= needed_xp1 ? player1.level + 1 : player1.level,
    }).eq("username", match.data[0].contestant_1);
    const resp2 = await supabase.from("user").update({
        rating: result.opponentRating,
        match: null,
        xp: player2.xp + xp2,
        level: player2.xp + xp2 >= needed_xp2 ? player2.level + 1 : player2.level,
    }).eq("username", match.data[0].contestant_2);
    try {
        await client.connect();
    } catch(err) {
        // console.log(err);
    }
    await client.hSet('match', match.data[0].contestant_1, null);
    await client.hSet('match', match.data[0].contestant_2, null);
};

export default calcReward;