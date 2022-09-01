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
		const match = await client.hGet('match', lucia.user.username);
		const isQueued = await client.hExists('elo', lucia.user.username);
		console.log('isQueues:', match);
		return {
			match: match,
			isQueued: isQueued,
		};
	} catch (err) {
		console.log(err);
		throw error(500, 'Internal server error.');
	}
}
