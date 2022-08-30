import { json } from '@sveltejs/kit';
import producer, { job } from "$lib/utils/owl";
import Cf from "cf-wrapper";
import client from "$lib/utils/redisClient";
import fs from "fs";
import process from 'process';

export const POST = async () => {
    await client.connect();
    const started = await client.get('back');
    if (started === 'true') {
        return json({
            message: 'background worker is already running.',
        }, {
            status: 400
        });
    }
    // const content = fs.readFileSync(process.cwd() + '/src/users.txt', 'utf8');
    const content = `***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***`;
    const accounts = content.split('\n');
    for (const account of accounts) {
        await client.sAdd('accounts', account);
    }
    const cf = new Cf('svelte', 'svelte');
    const problems = await cf.getProblemsList();
    problems.sort((a, b) => a.rating - b.rating);
    for (const problem of problems) {
        await client.sAdd(`${problem.rating}`, JSON.stringify(problem));
        // await client.zAdd('problems', [{score: problem.rating, value: JSON.stringify(problem)}]);
    }
    producer.enqueue({
        queue: "queue",
        id: `${Math.floor(new Date(Date.now() + 15000).getTime()/1000)}`,
        payload: "test",
        runAt: new Date(Date.now() + 15000),
    });
    await job.start();
    await client.set('back', 'true');
    await client.disconnect();
    return json({
        message: "ok"
    });
}