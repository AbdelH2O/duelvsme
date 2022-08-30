import '../app.css';
import { authGuard } from '../lib/guards/AuthGuard';
import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

export async function load({ url }: LoadEvent): Promise<LoadOutput> {
  if (url.pathname === '/') {
    return {};
  }
  // throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
  throw await authGuard(url);
}
