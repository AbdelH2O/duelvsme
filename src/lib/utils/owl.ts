// import Owl from '@quirrel/owl';
// import Redis from 'ioredis';
// import matchmake from './matchmake';
// import checkSubmissions from './checkSubmissions';

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
