<script lang="ts" context="module">
    import '../app.css';
    import {authGuard} from '../lib/guards/AuthGuard';
    import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
    export async function load({ url }: LoadEvent): Promise<LoadOutput> {
        if(url.pathname === '/') {
            return {};
        }
        return await authGuard(url);
    }
    // console.log("hi");
</script>
<html lang="en" class="dark">
    <slot></slot>
</html>