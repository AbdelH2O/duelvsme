// import Owl, { type OwlConfig } from '@quirrel/owl';
// import Redis from 'ioredis';
import matchmake from './matchmake';
import checkSubmissions from './checkSubmissions';

// const owl = new Owl({
//     redisFactory: () => new Redis(`${import.meta.env.VITE_REDIS_FULL_URL}`),
//     scheduleMap: {
//         'api/matchmaking/checkqueue': (lastExecution, scheduleMeta) => {
//             console.log('checking');
//             return null;
//         }
//     },
// });

// export const job = owl.createWorker(async (job, ackDescriptor) => {
//     // console.log(`${job.queue}: Received job #${job.id} with payload ${job.payload}.`);
//     await matchmake();
//     await checkSubmissions();
//     producer.enqueue({
//         queue: 'queue',
//         id: `${Math.floor(new Date(Date.now() + 15000).getTime()/1000)}`,
//         payload: 'test',
//         runAt: new Date(Date.now() + 15000),
//     });
// });

// const producer = owl.createProducer();

// export default producer;
// const getOwl = (params: OwlConfig<string>) => {
//     return new Owl(params);
// }

// export default getOwl;

import * as Bull from 'bull';
// console.log(Bull.default);


const taskQueue = new Bull.default('taskQueue', import.meta.env.VITE_REDIS_FULL_URL, {
    settings: {
        stalledInterval: 300000, // How often check for stalled jobs (use 0 for never checking).
        guardInterval: 5000, // Poll interval for delayed jobs and added jobs.
        drainDelay: 300 // A timeout for when the queue is in drained state (empty waiting for jobs).
    }
});

taskQueue.process(async (job, done) => {
    console.log(job.data);
    await matchmake();
    await checkSubmissions();
    await taskQueue.add({
        queue: 'queue',
        id: `${Math.floor(new Date(Date.now() + 15000).getTime()/1000)}`,
    }, {
        delay: 10000,
    });
    done();
});

export default taskQueue;