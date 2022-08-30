<script lang="ts">
  import dvsme from '../../../assets/duelvsme.svg';
  import { getSession } from '@abdelh2o/lucia-sveltekit/client';

  const session = getSession();
  // let session;
  // console.log(sess);
  // sess.update()
</script>

<div class="h-screen w-screen flex">
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->

  <!-- Static sidebar for desktop -->
  <div class="flex flex-shrink-0">
    <div class="flex flex-col w-20">
      <div class="flex-1 flex flex-col min-h-0 overflow-y-auto bg-red-600">
        <div class="flex-1">
          <div class="bg-red-900 py-4 flex items-center justify-center">
            <a href="/app/dashboard">
              <img class="h-14 w-auto" src={dvsme} alt="Duelvsme">
            </a>
          </div>
          <nav aria-label="Sidebar" class="py-6 flex flex-col items-center space-y-3">
            <a href="/" class="flex items-center p-4 rounded-lg text-indigo-200 hover:bg-red-700 active:bg-red-800">
              <!-- Heroicon name: outline/home -->
              <svg class="h-6 w-6 stroke-gray-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="sr-only">Home</span>
            </a>

            <a href="/" class="flex items-center p-4 rounded-lg text-indigo-200 hover:bg-red-700 active:bg-red-800">
              <!-- Heroicon name: outline/fire -->
              <svg class="h-6 w-6 stroke-gray-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              <span class="sr-only">Trending</span>
            </a>

            <a href="/" class="flex items-center p-4 rounded-lg text-indigo-200 hover:bg-red-700 active:bg-red-800">
              <!-- Heroicon name: outline/bookmark-alt -->
              <svg class="h-6 w-6 stroke-gray-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="sr-only">Bookmarks</span>
            </a>

            <a href="/" class="flex items-center p-4 rounded-lg text-indigo-200 hover:bg-red-700 active:bg-red-800">
              <!-- Heroicon name: outline/inbox -->
              <svg class="h-6 w-6 stroke-gray-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <span class="sr-only">Messages</span>
            </a>

            <a href="/" class="flex items-center p-4 rounded-lg text-indigo-200 hover:bg-red-700 active:bg-red-800">
              <!-- Heroicon name: outline/user -->
              <svg class="h-6 w-6 stroke-gray-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="sr-only">Profile</span>
            </a>
          </nav>
        </div>
        <div class="flex-shrink-0 flex pb-5">
          <a href="/" class="flex-shrink-0 w-full">
            <img class="block mx-auto h-10 w-10 rounded-full bg-white" src={`https://avatars.dicebear.com/api/identicon/${$session.user.username}.svg`} alt="">
            <div class="sr-only">
              <p>{$session.user.username}</p>
              <p>Account settings</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
    <!-- Mobile top navigation -->

    <main class="flex-1 flex overflow-hidden dark:bg-gray-900">
      <div class="container mx-auto sm:px-6 lg:px-8">
        <slot></slot>
      </div>
      <!-- Primary column -->
      <!-- <section aria-labelledby="primary-heading" class="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last">
        <h1 id="primary-heading" class="sr-only">Account</h1>
         Your content
      </section> -->

      <!-- Secondary column (hidden on smaller screens) -->
      <!-- <aside class="hidden lg:block lg:flex-shrink-0 lg:order-first">
        <div class="h-full relative flex flex-col w-96 border-r border-gray-900 bg-white dark:bg-gray-900 overflow-y-auto">
         Your content
          <slot>

          </slot>
        </div> -->
      <!-- </aside> -->
    </main>
  </div>
</div>
