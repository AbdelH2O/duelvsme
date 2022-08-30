import {error } from '@sveltejs/kit';
import { auth } from '$lib/lucia';
import type { RequestHandler } from '@sveltejs/kit';
import type { Error } from '@abdelh2o/lucia-sveltekit';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const { username, password } = body;
  try {
    const authenticateUser = await auth.authenticateUser(
      'username',
      username,
      password,
    );
    const headers = new Headers();
    authenticateUser.cookies.forEach((cookie: string) => {
        headers.append('set-cookie', cookie);
    });
    console.log(headers);
    return new Response(
        JSON.stringify(
            {
                message: 'Successfully authenticated user.',
            },
        ),
        {
            headers,
        },
    );
  } catch (e) {
    const err = e as Error;
    if (
      err.message === 'AUTH_INVALID_IDENTIFIER_TOKEN' ||
      err.message === 'AUTH_INVALID_PASSWORD'
    ) {
        throw error(400, 'Invalid username or password.');
    }
    throw error(500, 'Internal server error.');
  }
};
