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
    
</script>
<script lang="ts">
    import { onMount } from "svelte";
    import auth from "../lib/authService";
    import { isAuthenticated, user } from "../lib/stores/auth";
    import type { Auth0Client } from '@auth0/auth0-spa-js';
    
    let auth0Client: Auth0Client;

    onMount(async () => {
        if (!localStorage.getItem("isAuthenticated") || !localStorage.getItem("user")) {
            auth0Client = await auth.createClient();
            isAuthenticated.subscribe(async (auth) => {
                console.log(auth);
                if (!auth) {
                    isAuthenticated.set(await auth0Client.isAuthenticated());
                    localStorage.setItem("isAuthenticated", JSON.stringify(auth));
                    const usr = await auth0Client.getUser();
                    console.log(usr);
                    user.set(usr ? usr : {});
                    localStorage.setItem("user", JSON.stringify(usr));
                }
            });
        } else {
            isAuthenticated.set(
                JSON.parse(
                    localStorage.getItem("isAuthenticated") ?
                    localStorage.getItem("isAuthenticated") as string :
                    "false"
                )
            );
            user.set(
                JSON.parse(
                    localStorage.getItem("user") ?
                    localStorage.getItem("user") as string :
                    '{}'
                )
            );
        }
    });
</script>
<html lang="en" class="dark">
    <slot></slot>
</html>