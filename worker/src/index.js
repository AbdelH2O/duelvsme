import * as Bull from 'bull';
import matchmake from './matchmake.js';
import checkSubmissions from './checkSubmissions.js';
import calcReward from './calcRewards.js';
// console.log(Bull.default);


const taskQueue = new Bull.default('taskQueue', process.env.VITE_REDIS_FULL_URL, {
    settings: {
        stalledInterval: 300000, // How often check for stalled jobs (use 0 for never checking).
        guardInterval: 5000, // Poll interval for delayed jobs and added jobs.
        drainDelay: 300 // A timeout for when the queue is in drained state (empty waiting for jobs).
    }
});

taskQueue.process(async (job, done) => {
    console.log(job.data);
    if (job.data.queue === 'queue') {
        await matchmake();
        await checkSubmissions();
        await taskQueue.add({
            queue: 'queue',
            id: `${Math.floor(new Date(Date.now() + 15000).getTime()/1000)}`,
        }, {
            delay: 10000,
        });
        done();
    } else {
        await calcReward(job.data.id.split(' '[0]));
        done();
    }
});

export default taskQueue;