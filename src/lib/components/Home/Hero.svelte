<script lang="ts">
    import laptop from '../../../assets/laptop.jpeg';
    import dvsme from '../../../assets/duelvsme.svg';
    import down from '../../../assets/down.svg';
	import { Loader } from '@abdelh2o/agnostic-svelte';
	import { getSession } from "@abdelh2o/lucia-sveltekit/client";
	import { goto } from '$app/navigation';
	import { signOut } from "@abdelh2o/lucia-sveltekit/client";

	const lucia = getSession();

	let joiningS = false, joining = 0, starting = false;

	const handleLogin = (butt_ind: number) => {
		joining = butt_ind;
		goto('/auth/login');
	};
	const handleSignup = () => {
		joiningS = true;
		goto('/auth/signup');
	};
	const handleLogout = async () => {
		try {
			await signOut();
			window.location.href = '/';
		} catch (e) {
			console.log(e);
		}
	};
</script>

<div class="relative bg-gray-900 overflow-hidden h-screen lg:border-b-2 border-gray-800 border-solid shadow-2xl">
	<div class="absolute w-full h-fit flex-row justify-center z-20 bottom-0 hidden lg:flex">
		<div class="w-48 h-14 flex flex-col items-center animate-bounce mb-5 select-none cursor-pointer" on:click={() => window.scrollTo({top: window.innerHeight + 1, behavior: "smooth"})}>
			<p class="text-gray-300">Keep scrolling</p>
			<img src={down} alt="down" class="w-20 h-20" />
		</div>
	</div>
	<div class="max-w-7xl mx-auto">
		<div
			class="relative z-10 bg-gray-900 sm:pb-16 md:pb-20 max-w-2xl w-full pb-28 xl:pb-32 h-screen"
		>
			<svg
				class="fill-gray-900 md:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2 hidden"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				<polygon points="50,0 100,0 50,100 0,100" />
			</svg>

			<div>
				<div class="relative pt-6 sm:px-6 px-8">
					<nav
						class="relative flex items-center sm:h-10 justify-start"
						aria-label="Global"
					>
						<div class="flex items-center flex-shrink-0 flex-grow-0">
							<div class="flex items-center justify-between w-full md:w-auto">
								<div >
									<img alt="Workflow" style="height: 60px" src={dvsme} />
								</div>
							</div>
						</div>
						<div class="block ml-10 pr-4 space-x-8 w-full">
							<!-- <a href="/" class="font-xl text-gray-500 dark:text-gray-300 dark:hover:text-gray-50">Product</a>

							<a href="/" class="font-medium text-gray-500 dark:text-gray-300 hover:text-gray-50">Features</a> -->

							<!-- <a href="/" class="font-medium text-gray-500 hover:text-gray-900">Marketplace</a> -->

							<!-- <a href="/" class="font-medium text-gray-500 dark:text-gray-300 hover:text-gray-50">Company</a> -->
							<div class="w-full flex flex-row justify-end">
								{#if !$lucia}
									<button disabled={joining === 1} on:click={() => handleLogin(1)} class="font-semibold text-red-600 hover:text-red-50 mr-10">
										{#if joining === 1}
											<Loader />
										{:else}
											Login
										{/if}
									</button>
									<button disabled={joiningS} on:click={handleSignup} class="font-semibold bg-red-600 py-3 px-5 rounded-md text-white hover:brightness-90">
										{#if joiningS}
											<Loader />
										{:else}
											Sign up
										{/if}
									</button>
								{:else}
									<button on:click={handleLogout} class="font-semibold text-red-600 hover:text-red-50">Log out</button>
								{/if}

							</div>

						</div>
					</nav>
				</div>	
			</div>

			<main
				class="mt-280 mx-200 max-w-7xl px-4 sm:mt-20 sm:px-6 md:mt-26 lg:mt-44 lg:px-8 xl:mt-400"
			>
				<div class="sm:text-center lg:text-left">
					<h1 class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
						<span class="block xl:inline">A new take at</span>
						<span class="block text-red-600 xl:inline">Competitive Programming</span>
					</h1>
					<p
						class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
					>
						Level up your programming skills with coding duels.
					</p>
					<div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
						<div class="rounded-md shadow">
							{#if $lucia}
								<div
									on:click={async () => {
										starting = true;
										goto('/app/dashboard');
									}}
									class="select-none cursor-pointer font-bold w-full flex items-center justify-center px-8 py-3 border border-transparent text-base rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 no-underline"
								>
									{#if starting}
										<Loader />
									{:else}
										<span>Get started</span>
									{/if}
								</div>
							{:else}
								<div
									on:click={() => handleLogin(2)}
									class={`${joining !== 2 ? "cursor-pointer" : ""} font-bold w-full flex items-center justify-center px-8 py-3 border border-transparent text-base rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 select-none no-underline`}
								>
									{#if joining === 2}
										<span>
											<Loader size="large"/>
										</span>
									{:else}
										<span>Login</span>
									{/if}
							</div>
							{/if}
						</div>
						<div class="mt-3 sm:mt-0 sm:ml-3">
							<div
								class="cursor-not-allowed brightness-50 font-bold w-full flex items-center justify-center px-8 py-3 border border-transparent text-base rounded-md text-red-700 bg-white hover:brightness-90 hover:bg-red-200 md:py-4 md:text-lg md:px-10 select-none no-underline"
							>
								Roadmap
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
	<div class="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
		<img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src={laptop} alt="" />
	</div>
</div>
