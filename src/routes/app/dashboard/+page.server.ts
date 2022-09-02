import client from '$lib/utils/redisClient';
import { error } from '@sveltejs/kit';
import type { LoadEvent, Load } from '@sveltejs/kit';
import supabase from '$lib/utils/utilitySupabase';
import type { PageServerLoad } from './$types';

export const load = async ({ parent }: LoadEvent) =>  {
	try {
        await client.connect();
    } catch(err) {
        console.log(err);
    }
	try {
		const { lucia } = await parent();
		if (!lucia) {
			throw error(401 ,'Not authenticated.');
		}
		const match = await client.hGet('match', lucia.user.username);
		const isQueued = await client.hExists('elo', lucia.user.username);
		console.log('isQueues:', match);
		if (match) {
			const { data: matchData, error: matchError } = await supabase
				.from('match')
				.select('id, contestant_1, contestant_2, scores, start_time, duration')
				.eq('id', match);
			if (matchError) {
				throw error(500, matchError.message);
			}
			if (matchData) {
				return {
					match: match,
					game: matchData[0],
					isQueued: isQueued
				};
			}
		}
		return {
			match: match,
			isQueued: isQueued,
			game: null,
		};
	} catch (err) {
		console.log(err);
		throw error(500, 'Internal server error.');
	}
}
