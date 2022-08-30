import { createClient } from 'redis';

const client = createClient({
    url: 'redis://localhost:6379'
});
client.connect();
client.on('error', (err) => console.log('Redis Client Error', err));

export default client;