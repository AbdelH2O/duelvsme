import { createClient } from 'redis';

const client = createClient({
    url: process.env.VITE_REDIS_FULL_URL,
});
// console.log(import.meta.env.VITE_REDIS_FULL_URL);

// client.connect();
// client.on('error', (err) => console.log('Redis Client Error', err));

export default client;