<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { supabase_key } from '$lib/stores/supabase';
  import { Lucia } from "@abdelh2o/lucia-sveltekit/client";
  import supabase from '$lib/utils/supabase';
  import { browser } from '$app/env';
  import 'agnostic-svelte/css/common.min.css';
  import '../app.css';

  let isDark: boolean;
  theme.subscribe(val => isDark = (val === "dark"));
  
  if (browser) {
    theme.set(localStorage.getItem('theme') || 'light');
  }
  const handleThemeChange = () => {
    console.log($theme);
    if (!isDark) {
      theme.set('dark');
    } else {
      theme.set('light');
    }
    if (browser) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  };
  supabase_key.subscribe((data) => {
		supabase.auth.setAuth(data);
	});
</script>

<html lang="en" class="dark">
  <!-- <div class="fixed right-4 top-4 h-[2.4rem] w-[2.5rem] z-10">
    <button
      id="theme-toggle"
      type="button"
      class="w-full h-full text-gray-500 dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-gray-800 rounded-lg text-sm p-4.5"
    >
      <svg
        id="theme-toggle-dark-icon"
        on:click="{handleThemeChange}"
        class="{$theme === 'light' ? "z-20 w-full h-full hidden fill-[#da3c40]" : "z-20 w-full h-full fill-[#da3c40]"}"
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
        class="{$theme === 'light' ? "z-20 w-full h-full fill-[#da3c40]" : "z-20 w-full h-full hidden fill-[#da3c40]"}"
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
  </div> -->
  <Lucia>
    <slot class="-z-10" />
  </Lucia>
</html>
