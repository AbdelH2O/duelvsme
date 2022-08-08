<script lang="ts" context="module">
  import '../app.css';
  import { authGuard } from '../lib/guards/AuthGuard';
  import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

  export async function load({ url }: LoadEvent): Promise<LoadOutput> {
    if (url.pathname === '/') {
      return {};
    }
    return await authGuard(url);
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import auth from '../lib/authService';
  import { isAuthenticated, user } from '../lib/stores/auth';
  import type { Auth0Client } from '@auth0/auth0-spa-js';

  let auth0Client: Auth0Client;

  onMount(async () => {
    if (
      !localStorage.getItem('isAuthenticated') ||
      !localStorage.getItem('user')
    ) {
      auth0Client = await auth.createClient();
      isAuthenticated.subscribe(async (auth) => {
        console.log(auth);
        if (!auth) {
          isAuthenticated.set(await auth0Client.isAuthenticated());
          localStorage.setItem('isAuthenticated', JSON.stringify(auth));
          const usr = await auth0Client.getUser();
          console.log(usr);
          user.set(usr ? usr : {});
          localStorage.setItem('user', JSON.stringify(usr));
        }
      });
    } else {
      isAuthenticated.set(
        JSON.parse(
          localStorage.getItem('isAuthenticated')
            ? (localStorage.getItem('isAuthenticated') as string)
            : 'false',
        ),
      );
      user.set(
        JSON.parse(
          localStorage.getItem('user')
            ? (localStorage.getItem('user') as string)
            : '{}',
        ),
      );
    }
  });
  $: theme = 'light';
  if (typeof window !== 'undefined') {
    theme = localStorage.getItem('theme') || 'light';
  }
  const handleThemeChange = () => {
    if (theme === 'light') {
      theme = 'dark';
    } else {
      theme = 'light';
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      console.log('set');
    }
  };
</script>

<html lang="en" class="{theme === 'light' ? "light" : "dark"}">
  <div class="fixed right-4 top-4 h-[2.4rem] w-[2.5rem] z-10">
    <button
      id="theme-toggle"
      type="button"
      class="w-full h-full text-gray-500 dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 rounded-lg text-sm p-4.5"
    >
      <svg
        id="theme-toggle-dark-icon"
        on:click="{handleThemeChange}"
        class="{theme === 'light' ? "z-20 w-full h-full hidden fill-[#da3c40]" : "z-20 w-full h-full fill-[#da3c40]"}"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        />
      </svg>
      <svg
        id="theme-toggle-light-icon"
        on:click="{handleThemeChange}"
        class="{theme === 'light' ? "z-20 w-full h-full fill-[#da3c40]" : "z-20 w-full h-full hidden fill-[#da3c40]"}"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
  <slot class="-z-10" />
</html>
