import { error } from '@sveltejs/kit';
import { auth } from '$lib/lucia';
import jwt from 'jsonwebtoken';
import type { RequestHandler } from '@sveltejs/kit';
import type { Error } from '@abdelh2o/lucia-sveltekit';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const { email, username, password } = body;
  if (!email || !password || !username) {
    throw error(400, 'Missing required fields.');
  }
  try {
    const createUser = await auth.createUser('username', username, {
      password,
      user_data: {
        email,
        username,
        rating: 1500,
      },
    });
    const headers = new Headers();
    headers.append('set-cookie', createUser.cookies.join(';'));
    return new Response(
      JSON.stringify(
        {
          message: 'Successfully created user.',
        }
      ),
      {
        headers,
      }
    );
  } catch (e) {
    const err = e as Error;
    if (
      err.message === 'AUTH_DUPLICATE_IDENTIFIER_TOKEN' ||
      err.message === 'AUTH_DUPLICATE_USER_DATA'
    ) {
      throw error(400, 'Username or email already exists.');
    }
    throw error(500, 'Internal server error.');
  }
};
