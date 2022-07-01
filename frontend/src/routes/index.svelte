<script lang="ts">
    import Hero from "$lib/components/Home/Hero.svelte";
    import Split from "$lib/components/Home/Split.svelte";
    import Features from "$lib/components/Home/Features.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { onMount } from "svelte";
    import auth from "../lib/authService";
    import { isAuthenticated, user } from "../lib/stores/auth";
    import type { Auth0Client } from '@auth0/auth0-spa-js';

    let auth0Client: Auth0Client;

    onMount(async () => {
        auth0Client = await auth.createClient();
        isAuthenticated.subscribe(async (auth) => {
            console.log(auth);
            if (!auth) {
                isAuthenticated.set(await auth0Client.isAuthenticated());
                const usr = await auth0Client.getUser();
                console.log(usr);
                user.set(usr ? usr : {});
            }
        });
    });

    function login() {
        auth.loginWithPopup(auth0Client);
    }

    function logout() {
        console.log(auth0Client);
        auth.logout(auth0Client);
        console.log(isAuthenticated);
    }
    function handleDispatch(event: CustomEvent<{ text: string }>) {
        if(event.detail.text === "login") {
            login();
        } else if(event.detail.text === "logout") {
            console.log("logout");
            logout();
        }
	}
</script>
<Hero on:message="{handleDispatch}" />
<Split />
<Features />
<Footer />
