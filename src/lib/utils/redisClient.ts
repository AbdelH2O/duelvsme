import { createClient } from 'redis';

const client = createClient({
    url: import.meta.env.REDIS_URL,
    username: import.meta.env.REDIS_USERNAME,
    password: import.meta.env.REDIS_PASSWORD,
});
// client.connect();
client.on('error', (err) => console.log('Redis Client Error', err));

export default client;