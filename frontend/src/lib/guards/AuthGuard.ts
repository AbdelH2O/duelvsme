import {isAuthenticated} from '../stores/auth'; // stores related to app state, auth state
import type { LoadOutput } from '@sveltejs/kit';
// import type { User } from '../utils/User';

let auth: boolean;
isAuthenticated.subscribe(authState => auth = authState);

export async function authGuard(url: URL): Promise<LoadOutput> {
  const loggedIn = typeof window !== 'undefined' ? localStorage.getItem('isAthenticated') || auth : auth;
  console.log(loggedIn);
  if (loggedIn) {
    return {};
  } else {
    console.log('not logged in');
    console.log(typeof window !== 'undefined' ? localStorage.getItem('isAthenticated') || auth : auth);
    return { redirect: '/', status: 302 };
  }
}

export default {
  authGuard
}