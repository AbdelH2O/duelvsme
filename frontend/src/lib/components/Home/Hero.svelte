<script lang="ts">
    import laptop from '../../../assets/laptop.jpeg';
    import dvsme from '../../../assets/duelvsme.svg';
	import { createEventDispatcher } from 'svelte';
	import { isAuthenticated } from '$lib/stores/auth';

    const dispatch = createEventDispatcher();
	const login = () => {
        dispatch('message', {
            text: 'login'
        });
    }
	const logout = () => {
		dispatch('message', {
			text: 'logout'
		});
	};
</script>
<div class="relative bg-white dark:bg-gray-900 overflow-hidden lg:h-[95vh]">
	<div class="max-w-7xl mx-auto">
		<div
			class="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 lg:h-[95vh]"
		>
			<svg
				class="hidden fill-white dark:fill-gray-900 lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				<polygon points="50,0 100,0 50,100 0,100" />
			</svg>

			<div>
				<div class="relative pt-6 px-4 sm:px-6 lg:px-8">
					<nav
						class="relative flex items-center justify-between sm:h-10 lg:justify-start"
						aria-label="Global"
					>
						<div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
							<div class="flex items-center justify-between w-full md:w-auto">
								<a href="#">
									<span class="sr-only">Workflow</span>
									<img alt="Workflow" style="height: 60px" src={dvsme} />
								</a>
								<div class="-mr-2 flex items-center md:hidden">
									<button
										type="button"
										class="bg-white dark:bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
										aria-expanded="false"
									>
										<span class="sr-only">Open main menu</span>
										<!-- Heroicon name: outline/menu -->
										<svg
											class="h-6 w-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M4 6h16M4 12h16M4 18h16"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
						<div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
							<a href="#" class="font-xl text-gray-500 dark:text-gray-300 dark:hover:text-gray-50">Product</a>

							<a href="#" class="font-medium text-gray-500 dark:text-gray-300 hover:text-gray-50">Features</a>

							<!-- <a href="#" class="font-medium text-gray-500 hover:text-gray-900">Marketplace</a> -->

							<a href="#" class="font-medium text-gray-500 dark:text-gray-300 hover:text-gray-50">Company</a>
							{#if !$isAuthenticated}
								<button on:click={login} class="font-medium text-red-600 hover:text-red-50">Log in</button>
								<!-- {/if} -->
							{:else}
								<button on:click={logout} class="font-medium text-red-600 hover:text-red-50">Log out</button>
							{/if}

							<!-- <a href="/signup" class="font-medium text-red-600 hover:text-red-500">Sign up</a> -->
						</div>
					</nav>
				</div>

				<!--
            Mobile menu, show/hide based on menu open state.
  
            Entering: "duration-150 ease-out"
              From: "opacity-0 scale-95"
              To: "opacity-100 scale-100"
            Leaving: "duration-100 ease-in"
              From: "opacity-100 scale-100"
              To: "opacity-0 scale-95"
          -->
				<div
					class="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
				>
					<div
						class="rounded-lg shadow-md bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 overflow-hidden"
					>
						<div class="px-5 pt-4 flex items-center justify-between">
							<div>
								<img
									class="h-8 w-auto"
									src="https://tailwindui.com/img/logos/workflow-mark-red-600.svg"
									alt=""
								/>
							</div>
							<div class="-mr-2">
								<button
									type="button"
									class="bg-white dark:bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
								>
									<span class="sr-only">Close main menu</span>
									<!-- Heroicon name: outline/x -->
									<svg
										class="h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
						</div>
						<div class="px-2 pt-2 pb-3 space-y-1">
							<a
								href="#"
								class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-300 dark:hover:bg-gray-50"
								>Product</a
							>

							<a
								href="#"
								class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-gray-900 dark:hover:bg-gray-50"
								>Features</a
							>

							<a
								href="#"
								class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-gray-900 dark:hover:bg-gray-50"
								>Marketplace</a
							>

							<a
								href="#"
								class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-gray-900 dark:hover:bg-gray-50"
								>Company</a
							>
						</div>
						<a
							href="/login"
							class="block w-full px-5 py-3 text-center font-medium text-red-600 bg-gray-50 hover:bg-gray-100"
						>
							Log in
						</a>
					</div>
				</div>
			</div>

			<main
				class="mt-280 mx-200 max-w-7xl px-4 sm:mt-20 sm:px-6 md:mt-26 lg:mt-44 lg:px-8 xl:mt-400"
			>
				<div class="sm:text-center lg:text-left">
					<h1 class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
						<span class="block xl:inline">A new take at</span>
						<span class="block text-red-600 xl:inline">Competitive Programming</span>
					</h1>
					<p
						class="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
					>
						Level up your programming skills with coding duels.
					</p>
					<div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
						<div class="rounded-md shadow">
							{#if $isAuthenticated}
								<a
									href="/dashboard"
									class="font-bold w-full flex items-center justify-center px-8 py-3 border border-transparent text-base rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
								>
									Get started
								</a>
							{:else}
								<div
									on:click={login}
									class="cursor-pointer font-bold w-full flex items-center justify-center px-8 py-3 border border-transparent text-base rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
								>
									Login
							</div>
							{/if}
						</div>
						<div class="mt-3 sm:mt-0 sm:ml-3">
							<a
								href="#"
								class="font-bold w-full flex items-center justify-center px-8 py-3 border border-transparent text-base rounded-md text-red-700 bg-red-100 dark:bg-white hover:bg-red-200 md:py-4 md:text-lg md:px-10"
							>
								Learn more
							</a>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
	<div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
		<img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src={laptop} alt="" />
	</div>
</div>
