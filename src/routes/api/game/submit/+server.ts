import { json, error } from '@sveltejs/kit';
import { auth } from '$lib/lucia';
import type { RequestHandler } from '@sveltejs/kit';
import Cf from 'cf-wrapper';
import client from '$lib/utils/redisClient';
import supabase from '$lib/utils/utilitySupabase';
import type { Error } from '@abdelh2o/lucia-sveltekit';

export const POST: RequestHandler = async ({ request }) => {
    try {
        await client.connect();
    } catch(err) {
        console.log(err);
    }
    try {
        const user = await auth.validateRequest(request);
        const body = await request.json();
        const { 
            problem,
            language,
            code,
            match
        } = body;
        if (!problem || !language || !code || !match) {
            throw error(400, 'Invalid request.');
        }
        const { data } = (await supabase.from('match').select('*').filter('id', 'eq', match)) as {
            data: Game[]
        };
        const index = data[0].problems.indexOf(problem);
        if (data[0].who_solved[index] !== 0) {
            throw error (400, 'Problem already solved');
        }
        const account = (await client.sRandMember('accounts'))?.split(';') || '';
        const cl = new Cf(account[0].trim(), account[1]);
        await cl.login();
        const submission = await cl.submit(
            problem.split('/')[0],
            problem.split('/')[1],
            language,
            code,
        );        
        if(!submission) {
            throw error(500, 'Failed to submit.');
        }
        
        const resp = await supabase.from('submissions').insert({
            id: submission,
            username: user.user.username,
            problem: problem,
            language: language,
            code: code,
            status: 'pending',
            match: match,
        });
        return json({
            submission: submission,
        });
    } catch (err) {
        // check if err is not the one we throw in line 29
        if (err.status === 500) {
            throw error(500, 'Failed to submit.');
        }
        throw error(401, 'Unauthorized');
    }
}