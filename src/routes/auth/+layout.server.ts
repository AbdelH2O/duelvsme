import { redirect, type Load } from '@sveltejs/kit';
import type { LoadEvent } from '@sveltejs/kit';

export const load: Load = async ({ parent, url }: LoadEvent) =>  {
  const { lucia } = await parent();
  console.log(lucia);
  if (lucia !== null) {
    if (url.pathname === '/auth/login' || url.pathname === '/auth/signup') {
        throw redirect(302, '/app/dashboard');
    }
    return {};
  }
  if (url.pathname !== '/' && url.pathname !== '/auth/login' && url.pathname !== '/auth/signup') {
    throw redirect(302, '/');
  }
  return {};
}
