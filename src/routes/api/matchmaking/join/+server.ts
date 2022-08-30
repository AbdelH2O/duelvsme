// throw new Error("@migration task: Update +server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");

import { error, json } from "@sveltejs/kit";
import { auth } from "$lib/lucia";
import type { RequestHandler } from "@sveltejs/kit";
import client from "$lib/utils/redisClient";

export const POST: RequestHandler = async ({ request }) => {
    try {
        const user = await auth.validateRequest(request);
        const key = await client.hGet('sockets', user.user.username);
        console.log(key);
        if (key !== null) {
            throw error(400, 'You are already in queue.');
        }
        await client.hSet('sockets', `${user.user.username}`, JSON.stringify({joinedAt: Math.floor(Date.now()/1000)}));

        await client.zAdd('queue_upper', [{score: user.user.rating + 50, value: `${user.user.username}`}]);
        await client.zAdd('queue_lower', [{score: user.user.rating - 50, value: `${user.user.username}`}]);

        await client.hSet('elo', `${user.user.username}`, `${user.user.rating}`);
             
        return json({message: "Successfully joined queue."});
    } catch (err) {
        console.error(err);
        throw error(500, "Internal server error.");
    }

};
