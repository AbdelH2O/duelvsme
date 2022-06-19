import {user} from '../stores/auth'; // stores related to app state, auth state
import type { LoadOutput } from '@sveltejs/kit';
import type { User } from '../utils/User';

let auth: User;
user.subscribe(authState => auth = authState);

export async function authGuard(url: URL): Promise<LoadOutput> {
  const loggedIn = auth.isAuthenticated;

  if (loggedIn && url.pathname === '/login') {
    return { status: 302, redirect: '/' };
  } else if (loggedIn || url.pathname === '/login') {
    return {};
  } else {
    return { status: 302, redirect: '/login' }
  }
}

export default {
  authGuard
}