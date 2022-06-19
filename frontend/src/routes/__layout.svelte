<script context="module" lang="ts">
    import '../app.css';
    import {authGuard} from '../lib/guards/AuthGuard';
    import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
    export async function load({ url }: LoadEvent): Promise<LoadOutput> {
        if(url.pathname === '/') {
            return {};
        }
        return await authGuard(url);
    }
</script>
<html lang="en" class="dark">
    <slot />
</html>