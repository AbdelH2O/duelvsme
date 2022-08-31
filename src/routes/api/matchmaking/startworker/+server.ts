import { json } from '@sveltejs/kit';
import getOwl from "$lib/utils/owl";
import Redis from 'ioredis';
import matchmake from '$lib/utils/matchmake';
import checkSubmissions from '$lib/utils/checkSubmissions';
import Owl from '@quirrel/owl';
import Cf from "cf-wrapper";
import client from "$lib/utils/redisClient";

export const POST = async () => {
    try {
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
        // const content = `***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***
        // ***REMOVED***`;
        // const accounts = content.split('\n');
        // for (const account of accounts) {
        //     await client.sAdd('accounts', account);
        // }
        // const cf = new Cf('svelte', 'svelte');
        // const problems = await cf.getProblemsList();
        // problems.sort((a, b) => a.rating - b.rating);
        // for (const problem of problems) {
        //     await client.sAdd(`${problem.rating}`, JSON.stringify(problem));
        //     // await client.zAdd('problems', [{score: problem.rating, value: JSON.stringify(problem)}]);
        // }
        console.log(typeof Owl);
        
        const owl = getOwl({
            redisFactory: () => new Redis(`${import.meta.env.VITE_REDIS_FULL_URL}`),
            scheduleMap: {
                'api/matchmaking/checkqueue': (lastExecution, scheduleMeta) => {
                    console.log('checking');
                    return null;
                }
            },
        });
        const producer = owl.createProducer();
        const job = await owl.createWorker(async (job, ackDescriptor) => {
            // console.log(`${job.queue}: Received job #${job.id} with payload ${job.payload}.`);
            await matchmake();
            await checkSubmissions();
            producer.enqueue({
                queue: 'queue',
                id: `${Math.floor(new Date(Date.now() + 15000).getTime()/1000)}`,
                payload: 'test',
                runAt: new Date(Date.now() + 15000),
            });
        });
        producer.enqueue({
            queue: "queue",
            id: `${Math.floor(new Date(Date.now() + 15000).getTime()/1000)}`,
            payload: "test",
            runAt: new Date(Date.now() + 15000),
        });
        await job.start();
        await client.set('back', 'true');
        return json({
            message: "ok"
        });
    } catch (e) {
        console.log(e);
        return json({
            message: "error"
        });
    }
}