import client from '$lib/utils/redisClient';
import { error } from '@sveltejs/kit';
import type { LoadEvent, Load } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async ({ parent }: LoadEvent) =>  {
	try {
		const { lucia } = await parent();
		if (!lucia) {
			throw error(401 ,'Not authenticated.');
		}
		await client.connect();	
		const isQueued = await client.hExists('elo', lucia.user.username);
		console.log('isQueues:', isQueued);
		await client.disconnect();
		return {
			isQueued: isQueued,
		};
	} catch (err) {
		console.log(err);
		throw error(500, 'Internal server error.');
	}
}
