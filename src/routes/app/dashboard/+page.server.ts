import client from '$lib/utils/redisClient';
import { error } from '@sveltejs/kit';
import type { LoadEvent, Load } from '@sveltejs/kit';
import supabase from '$lib/utils/utilitySupabase';
import { subMinutes, addMinutes, addSeconds, parseISO,  } from 'date-fns';

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
		// console.log('isQueues:', isQueued);
		if (match) {
			const { data: matchData, error: matchError } = await supabase
				.from('match')
				.select('id, contestant_1, contestant_2, scores, start_time, duration, processed')
				.eq('id', match);
			if (matchError) {
				throw error(500, matchError.message);
			}
			console.log('matchData:', matchData[0]);
			const dif = new Date().getTimezoneOffset();
			// console.log(new Date().getTime());
			
			const now = dif > 0 ? subMinutes(new Date(), dif) : addMinutes(new Date(), dif);
			// console.log(formatISO(new Date().getTime()), formatISO(now.getTime()));
			// console.log(now.getTime()/1000 >= addSeconds(parseISO(game.data[0].start_time), 2700).getTime()/1000);
			
			// if (addSeconds(parseISO(matchData[0].start_time), matchData[0].duration).getTime() <= now.getTime()) {
				
			// }

			if (matchData && !matchData[0].processed && addSeconds(parseISO(matchData[0].start_time), matchData[0].duration).getTime() > now.getTime()) {
				return {
					match: match,
					game: matchData[0],
					isQueued: isQueued
				};
			} else {
				await client.hDel('match', lucia.user.username);
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
