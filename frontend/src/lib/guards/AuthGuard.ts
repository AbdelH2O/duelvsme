import {isAuthenticated} from '../stores/auth'; // stores related to app state, auth state
import type { LoadOutput } from '@sveltejs/kit';
import type { User } from '../utils/User';

let auth: boolean;
isAuthenticated.subscribe(authState => auth = authState);

export async function authGuard(url: URL): Promise<LoadOutput> {
  const loggedIn = auth;
  console.log('authGuard', loggedIn, url.pathname);
  if (loggedIn) {
    return {};
  } else {
    return { status: 302, redirect: '/' }
  }
}

export default {
  authGuard
}