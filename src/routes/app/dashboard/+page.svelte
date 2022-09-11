<script lang="ts">
	import { onMount } from 'svelte/internal';
	import dvsme from '../../../assets/duelvsme.svg';
	import lockout from '../../../assets/lockout.svg';
	import { getSession } from '@abdelh2o/lucia-sveltekit/client';
	import supabase from '$lib/utils/supabase';
	import { goto } from '$app/navigation';
	import { Button, Loader, Spinner } from '@abdelh2o/agnostic-svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	import { diff } from '$lib/stores/game';

	export let data: {
		match: string | null;
		isQueued: boolean;
		game: Game | null;
	};
	let gameFound = false, opponent = '', counter = 0, rating = '', resuming = false, joining = false;
	
	let st = 'Matchmaking in progress.', fact='';
	fetch(`/api/random`)
		.then(res => res.json())
		.then(text => {
			fact = text.text;
		}).catch(err => {
			fact = err;
		}
	);
	let sub;
	if (data.isQueued) {
		const inter1 = setInterval(() => {
			st += ".";
			
			if (st.length == 27) {
				st = 'Matchmaking in progress';
			}
		} , 750);
		const inter2 = setInterval(async () => {
			await fetch(`/api/random`)
				.then(res => res.json())
				.then(text => {
					fact = text.text;
				}).catch(err => {
					fact = err;
				}
			);
		}, 10000);
		sub = supabase.from('match').on('*', (data) => {
			gameFound = true;
			opponent = $session.user.username === data.new.contestant_1 ? data.new.contestant_2 : data.new.contestant_1;
			rating = $session.user.username === data.new.contestant_2 ? data.new.ratings[0] : data.new.ratings[1];
			counter = 5;
			clearInterval(inter1);
			clearInterval(inter2);
			const inter3 = setInterval(() => {
				if (counter == 0) {
					clearInterval(inter3);
					goto('/app/game/' + data.new.id);
				} else {
					counter--;
				}
			}, 1000);
		}).subscribe();
	}

	const session = getSession();
	supabase.auth.setAuth($session?.access_token || "");
	
	// send a post request to /api/matchmaking/join
	const joinMatchmaking = async () => {
		const response = await fetch('/api/matchmaking/join', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${$session?.access_token}`,
			},
		});
		data.isQueued = true;
		supabase.auth.setAuth($session?.access_token || "");
		const inter1 = setInterval(() => {
			st += ".";
			
			if (st.length == 27) {
				st = 'Matchmaking in progress';
			}
		} , 500);
		fetch(`/api/random`)
			.then(res => res.json())
			.then(text => {
				fact = text.text;
			}).catch(err => {
				fact = err;
			}
		);
		const inter2 = setInterval(async () => {
			await fetch(`/api/random`)
				.then(res => res.json())
				.then(text => {
					fact = text.text;
				}).catch(err => {
					fact = err;
				}
			);
		}, 10000);
		sub = supabase.from('match').on('INSERT', (data) => {
			gameFound = true;
			opponent = $session.user.username === data.new.contestant_1 ? data.new.contestant_2 : data.new.contestant_1;
			rating = $session.user.username === data.new.contestant_1 ? data.new.ratings[0] : data.new.ratings[1];
			counter = 5;
			clearInterval(inter1);
			clearInterval(inter2);
			const inter3 = setInterval(() => {
				if (counter == 0) {
					clearInterval(inter3);
					goto('/app/game/' + data.new.id);
				} else {
					counter--;
				}
			}, 1000);
		}).subscribe();
	}
	const func = async (e: MouseEvent) => {
		joining = true;
    	e.preventDefault();
		joinMatchmaking();
	}

	const resume = async (e: MouseEvent) => {
		resuming = true;
		e.preventDefault();
		goto('/app/game/' + data.match);
	}

	let prev: Duration = { minutes: 0, seconds: 0 };
	const subs = diff.subscribe((val) => {
		if (
			val &&
			(val.minutes || 0) * 60 + (val.seconds || 0) !== prev
		) {
			data = {
				game: null,
				isQueued: false,
				match: null,
			}
			subs();
		}
		val = prev;
	});
</script>
<svelte:head>
    <title>Dashboard</title>
</svelte:head>
<div class="h-full max-w-[108rem] pt-12 px-14">
	{#if data.isQueued}
		{#if !gameFound}
			<div class="flex flex-col items-center">
				<div class="h-max flex flex-col justify-between mx-auto mt-4">
					<img src={dvsme} alt="spinning-logo" class="h-80 animate-[spin_4s_linear_infinite] pointer-events-none select-none"/>
				</div>
				<div>
					<h1 class="text-black dark:text-gray-50 text-5xl mt-14 select-none">
						{st}
					</h1>
				</div>
				<div class="flex flex-col items-center bg-slate-300 dark:bg-red-900 mt-10 px-8 pb-10 rounded-md w-3/4 shadow-2xl">
					<div class="dark:bg-red-700 bg-slate-400 p-3 rounded-b-md">
						<h1 class="text-black dark:text-gray-50 text-2xl ">
							Did you know?
						</h1>
					</div>
					<h1 class="text-black dark:text-gray-50 text-md mt-10 text-center">
						{fact}
					</h1>
				</div>
			</div>
		{:else}
			<div class="text-center flex flex-row justify-center">
				<div class="bg-gray-800 border-gray-700 border-2 border-solid w-3/4 flex flex-col h-full py-6 rounded-md">
					<div class="flex flex-row justify-center w-full">
						<div class="bg-gray-700 w-fit rounded-md p-8 px-20">
							<img class="inline-block h-24 w-24 rounded-full bg-white" src={`https://avatars.dicebear.com/api/identicon/${opponent}.svg`} alt="">
							<p class="pt-4 font-bold text-3xl">
								{opponent}
							</p>
							<p class="text-gray-200">
								Rating: {rating}
							</p>
						</div>
					</div>
					<h1 class="text-black dark:text-gray-50 text-5xl mt-14 select-none">
						Lockout is starting in {counter}
					</h1>
					<!-- <h1 class="text-black dark:text-gray-50 text-5xl mt-14 select-none">
						redirecting in {counter}
					</h1> -->
				</div>
			</div>
		{/if}
	{:else}
	{#if data.match === null}
		<div>
			<h1 class="text-black dark:text-gray-50 text-3xl">
				Welcome back, {$session.user.username}
			</h1>
		</div>
			<div class="h-max flex justify-between mx-auto mt-4">
				<div
					on:click={func}
					class={`${!joining ? "cursor-pointer" : ""}  flex flex-col content-center ml-4 p-6 max-w-sm bg-gray-200 rounded-lg border border-gray-200 shadow-xl hover:bg-slate-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 items-center`}
				>
					{#if !joining}
						<!-- <div> -->
							<img src={lockout} alt="lockout" class="h-min" />
							<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
								Lockout Game
							</h5>
							<p class="font-normal text-gray-700 dark:text-gray-400 text-center">
								Face off against an opponent in a 20-45mins lockout game and see who comes out on top. Ready
								for the challenge?
							</p>
						<!-- </div> -->
					{:else}
						<div class="h-full flex justify-center flex-col items-center w-screen">
							<div class="top-1/2">
								<Loader size="large" />
							</div>
						</div>
					{/if}
				</div>
				<div
					class="cursor-not-allowed brightness-50 flex flex-col content-center ml-4 p-6 max-w-sm bg-gray-200 rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 items-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						width="250"
						height="250"
						viewBox="0 0 172 172"
						style=" fill:#000000;"
						><g
							fill="none"
							fill-rule="nonzero"
							stroke="none"
							stroke-width="1"
							stroke-linecap="butt"
							stroke-linejoin="miter"
							stroke-miterlimit="10"
							stroke-dasharray=""
							stroke-dashoffset="0"
							font-family="none"
							font-weight="none"
							font-size="none"
							text-anchor="none"
							style="mix-blend-mode: normal"
							><path d="M0,172v-172h172v172z" fill="none" /><g
								><path
									d="M119.57096,68.5764h-39.3794v34.8472h39.37768c10.11532,0 26.63936,-6.364 33.2218,-17.4236v-0.00172c-6.58072,-11.05788 -23.10648,-17.42188 -33.22008,-17.42188z"
									class=""
								/><path
									d="M119.56924,106.32696h-39.37768c-1.60476,0 -2.90336,-1.30032 -2.90336,-2.90336v-34.8472c0,-1.60304 1.2986,-2.90508 2.90336,-2.90508h39.37768c11.78372,0 28.79108,7.20508 35.71924,18.84432c0.54352,0.91504 0.54352,2.0554 0,2.96872c-6.92816,11.63924 -23.93552,18.8426 -35.71924,18.8426zM83.09664,100.52024h36.4726c8.2388,0 23.04456,-5.15484 29.75428,-14.52024c-6.70972,-9.36712 -21.51548,-14.52024 -29.75428,-14.52024h-36.4726z"
									fill="#c12d32"
								/><path
									d="M68.5764,77.2882c-1.59616,0 -2.90336,-1.3072 -2.90336,-2.90336c0,-1.5996 1.3072,-2.90508 2.90336,-2.90508c1.59616,0 2.90336,1.30548 2.90336,2.90508c0,1.59444 -1.3072,2.90336 -2.90336,2.90336zM56.95952,77.2882h-23.23204c-1.59616,0 -2.90336,-1.3072 -2.90336,-2.90336c0,-1.5996 1.3072,-2.90508 2.90336,-2.90508h23.23204c1.59616,0 2.90336,1.30548 2.90336,2.90508c0.00172,1.59444 -1.30548,2.90336 -2.90336,2.90336z"
									class="stroke-[#c12d32] fill-[#c12d32]"
								/><path
									d="M54.05616,88.90336h-34.8472c-1.60476,0 -2.90336,-1.30032 -2.90336,-2.90336c0,-1.60476 1.2986,-2.90336 2.90336,-2.90336h34.8472c1.60476,0 2.90336,1.30032 2.90336,2.90336c0,1.60304 -1.2986,2.90336 -2.90336,2.90336z"
									class="stroke-[#c12d32] fill-[#c12d32]"
								/><path
									d="M68.5764,100.52024h-23.23204c-1.59616,0 -2.90336,-1.30892 -2.90336,-2.90336c0,-1.5996 1.3072,-2.90508 2.90336,-2.90508h23.23204c1.59616,0 2.90336,1.30548 2.90336,2.90508c0,1.59444 -1.3072,2.90336 -2.90336,2.90336zM33.72748,100.52024c-1.59616,0 -2.90336,-1.30892 -2.90336,-2.90336c0,-1.5996 1.3072,-2.90508 2.90336,-2.90508c1.59616,0 2.90336,1.30548 2.90336,2.90508c0.00172,1.59444 -1.30548,2.90336 -2.90336,2.90336z"
									class="stroke-[#c12d32] fill-[#c12d32]"
								/><path
									d="M68.5764,42.43928h-8.7118c-1.60476,0 -2.90336,-1.30032 -2.90336,-2.90508c0,-1.60304 1.2986,-2.90336 2.90336,-2.90336h8.7118c1.60476,0 2.90336,1.30032 2.90336,2.90336c0,1.60648 -1.2986,2.90508 -2.90336,2.90508z"
									class="stroke-[#c12d32] fill-[#c12d32]"
								/><path
									d="M54.05616,54.05616h-5.80672c-1.59616,0 -2.90336,-1.3072 -2.90336,-2.90336c0,-1.5996 1.3072,-2.90508 2.90336,-2.90508h5.80672c1.59616,0 2.90336,1.30548 2.90336,2.90508c0,1.59444 -1.3072,2.90336 -2.90336,2.90336zM36.63256,54.05616c-1.59616,0 -2.90336,-1.3072 -2.90336,-2.90336c0,-1.5996 1.3072,-2.90508 2.90336,-2.90508c1.59616,0 2.90508,1.30548 2.90508,2.90508c-0.00172,1.59444 -1.30892,2.90336 -2.90508,2.90336zM25.0174,54.05616h-5.80844c-1.59616,0 -2.90336,-1.3072 -2.90336,-2.90336c0,-1.5996 1.3072,-2.90508 2.90336,-2.90508h5.80844c1.59616,0 2.90336,1.30548 2.90336,2.90508c0,1.59444 -1.3072,2.90336 -2.90336,2.90336z"
									class="stroke-[#c12d32] fill-[#c12d32]"
								/><path
									d="M45.34436,65.67132h-20.32696c-1.60476,0 -2.90508,-1.30032 -2.90508,-2.90336c0,-1.60476 1.2986,-2.90336 2.90508,-2.90336h20.32696c1.60476,0 2.90336,1.30032 2.90336,2.90336c0,1.60304 -1.2986,2.90336 -2.90336,2.90336z"
									class="stroke-[#c12d32] fill-[#c12d32]"
								/><path
									d="M109.23204,59.8646h-40.65564c-1.60476,0 -2.90336,-1.30032 -2.90336,-2.90336c0,-1.60304 1.2986,-2.90336 2.90336,-2.90336h40.65564c1.60476,0 2.90508,1.30032 2.90508,2.90336c0,1.60132 -1.30032,2.90336 -2.90508,2.90336z"
									class="stroke-[#c12d32] fill-[#c12d32]"
								/><path
									d="M109.23204,117.94384h-40.65564c-1.60476,0 -2.90336,-1.30032 -2.90336,-2.90336c0,-1.60304 1.2986,-2.90336 2.90336,-2.90336h40.65564c1.60476,0 2.90508,1.30032 2.90508,2.90336c0,1.60304 -1.30032,2.90336 -2.90508,2.90336z"
									class="stroke-[#c12d32] fill-[#c12d32]"
								/><path
									d="M45.34436,112.1354h-20.32696c-1.60476,0 -2.90508,-1.30032 -2.90508,-2.90336c0,-1.60304 1.2986,-2.90336 2.90508,-2.90336h20.32696c1.60476,0 2.90336,1.30032 2.90336,2.90336c0,1.60304 -1.2986,2.90336 -2.90336,2.90336z"
									class="stroke-[#c12d32] fill-[#c12d32]"
								/><path
									d="M54.05616,123.75228h-5.80672c-1.59616,0 -2.90336,-1.3072 -2.90336,-2.90508c0,-1.59788 1.3072,-2.90336 2.90336,-2.90336h5.80672c1.59616,0 2.90336,1.30548 2.90336,2.90336c0,1.59788 -1.3072,2.90508 -2.90336,2.90508zM36.63256,123.75228c-1.59616,0 -2.90336,-1.3072 -2.90336,-2.90508c0,-1.59788 1.3072,-2.90336 2.90336,-2.90336c1.59616,0 2.90508,1.30548 2.90508,2.90336c-0.00172,1.59788 -1.30892,2.90508 -2.90508,2.90508zM25.0174,123.75228h-5.80844c-1.59616,0 -2.90336,-1.3072 -2.90336,-2.90508c0,-1.59788 1.3072,-2.90336 2.90336,-2.90336h5.80844c1.59616,0 2.90336,1.30548 2.90336,2.90336c0,1.59788 -1.3072,2.90508 -2.90336,2.90508z"
									class="stroke-[#c12d32] fill-[#c12d32]"
								/><path
									d="M68.5764,135.36744h-8.7118c-1.60476,0 -2.90336,-1.30032 -2.90336,-2.90336c0,-1.60304 1.2986,-2.90336 2.90336,-2.90336h8.7118c1.60476,0 2.90336,1.30032 2.90336,2.90336c0,1.60304 -1.2986,2.90336 -2.90336,2.90336z"
									class="stroke-[#c12d32] fill-[#c12d32]"
								/><path
									d="M114.77904,94.7118h-22.9706c-1.59616,0 -2.90336,-1.3072 -2.90336,-2.90336c0,-1.59788 1.3072,-2.90336 2.90336,-2.90336h22.97232c0.98728,0 1.97284,-0.03096 2.90336,-0.11696c1.68388,-0.17544 3.02032,1.07328 3.13556,2.6402c0.14448,1.59788 -1.04576,2.9928 -2.64364,3.13728c-1.13348,0.08772 -2.26524,0.1462 -3.397,0.1462zM129.18404,91.86692c-1.19024,0 -2.23772,-0.69832 -2.67116,-1.80084c-0.2924,-0.6966 -0.2924,-1.51016 0,-2.20848c0.28896,-0.72584 0.8428,-1.27624 1.56864,-1.56692c1.45168,-0.6106 3.19232,0.1462 3.80292,1.56692c0.60888,1.48264 -0.11696,3.19404 -1.59616,3.80464c-0.35088,0.14448 -0.72756,0.20468 -1.10424,0.20468z"
									fill="#c12d32"
								/><path
									d="M120.84892,83.09664c-1.60476,0 -2.90336,-1.30032 -2.90336,-2.90336v-11.61688c0,-1.60304 1.2986,-2.90508 2.90336,-2.90508c1.60476,0 2.90336,1.30032 2.90336,2.90508v11.61516c0,1.60304 -1.2986,2.90508 -2.90336,2.90508z"
									fill="#c12d32"
								/><g fill="#c12d32"
									><path
										d="M91.80844,83.09664c-1.60476,0 -2.90336,-1.30032 -2.90336,-2.90336v-11.61688c0,-1.60304 1.2986,-2.90508 2.90336,-2.90508c1.60476,0 2.90336,1.30032 2.90336,2.90508v11.61516c0,1.60304 -1.2986,2.90508 -2.90336,2.90508z"
									/></g
								></g
							></g
						></svg
					>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
						Speedforces
					</h5>
					<p class="font-normal text-gray-700 dark:text-gray-400 text-center">
						Solve relatively low rated problems at a fast pace, either against another player or against
						the clock.
					</p>
				</div>
				<div
					class="cursor-not-allowed brightness-50 flex flex-col content-center ml-4 p-6 max-w-sm bg-gray-200 rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 items-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						width="250"
						height="250"
						viewBox="0 0 172 172"
						style=" fill:#000000;"
						><g
							fill="none"
							fill-rule="nonzero"
							stroke="none"
							stroke-width="1"
							stroke-linecap="butt"
							stroke-linejoin="miter"
							stroke-miterlimit="10"
							stroke-dasharray=""
							stroke-dashoffset="0"
							font-family="none"
							font-weight="none"
							font-size="none"
							text-anchor="none"
							style="mix-blend-mode: normal"
							><path d="M0,172v-172h172v172z" fill="none" /><g fill="#c12d32"
								><path
									d="M86,6.88c-43.6552,0 -79.12,35.4648 -79.12,79.12c0,43.6552 35.4648,79.12 79.12,79.12c43.6552,0 79.12,-35.4648 79.12,-79.12c0,-43.6552 -35.4648,-79.12 -79.12,-79.12zM86,13.76c39.9368,0 72.24,32.3032 72.24,72.24c0,39.9368 -32.3032,72.24 -72.24,72.24c-39.9368,0 -72.24,-32.3032 -72.24,-72.24c0,-39.9368 32.3032,-72.24 72.24,-72.24zM86,52.55406l-58.53375,33.44594l5.22719,2.98985l53.30656,30.45609v-25.5514l44.72,25.5514v-66.89187l-44.72,25.5514zM79.12,64.41265v17.62328v7.92813v17.62328l-37.77953,-21.58735zM123.84,64.41265v43.17469l-37.77953,-21.58735z"
								/></g
							></g
						></svg
					>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
						Upsolve
					</h5>
					<p class="font-normal text-gray-700 dark:text-gray-400 text-center">
						Go back in time and have another go at solving the problems you previously encountered but didn't solve. Only 
						now, you have all the time in the world.
					</p>
				</div>
			</div>
		{:else}
			<div class="hidden w-0 h-0">
				<Countdown start_date={data.game.start_time} duration={data.game.duration} />
			</div>
			{#if $diff.minutes !== 0 || $diff.seconds !== 0}
				<div class="text-center flex flex-row justify-center mt-5">
					<div class="bg-gray-800 border-gray-700 border-2 border-solid w-3/4 flex flex-col h-full py-6 rounded-md">
						<h1 class="text-5xl mb-5 inline-flex justify-center">
							Lockout in &nbsp; <Countdown start_date={data.game.start_time} duration={data.game.duration} />
						</h1>
						<div class="flex flex-row justify-center w-full">
							<div class="w-1/3 rounded-md p-8 px-20 bg-gray-700 mr-5">
								<img class="inline-block h-24 w-24 rounded-full bg-white pointer-events-none" src={`https://avatars.dicebear.com/api/identicon/${$session?.user.username}.svg`} alt="">
								<p class="pt-4 font-bold text-3xl select-none">
									{$session.user.username} (You)
								</p>
								<p class="text-gray-200 select-none w-full">
									Score: { $session.user.username === data.game.contestant_1 ? data.game.scores[0] : data.game.scores[1] }
								</p>
							</div>
							<div class="w-1/3 rounded-md p-8 px-20 bg-gray-700 ml-5">
								<img class="inline-block h-24 w-24 rounded-full bg-white pointer-events-none" src={`https://avatars.dicebear.com/api/identicon/${$session.user.username === data.game.contestant_1 ? data.game.contestant_2 : data.game.contestant_1}.svg`} alt="">
								<p class="pt-4 font-bold text-3xl select-none">
									{$session.user.username === data.game.contestant_1 ? data.game.contestant_2 : data.game.contestant_1}
								</p>
								<p class="text-gray-200 select-none">
									Score: { $session.user.username === data.game.contestant_1 ? data.game.scores[1] : data.game.scores[0] }
								</p>
							</div>
						</div>
						<div class="w-full flex flex-col items-center mt-5">
							<div class="w-1/2">
								<Button on:click={resume} mode="primary" size="large" isRounded isDisabled={resuming}>
									{#if !resuming}
										Resume Lockout
									{:else}
										<Loader size="small" />
									{/if}
								</Button>
							</div>
						</div>
						<!-- <h1 class="text-black dark:text-gray-50 text-5xl mt-14 select-none">
							redirecting in {counter}
						</h1> -->
					</div>
				</div>
			{:else}
				<div class="text-center flex flex-row justify-center mt-5">
					<div class="bg-gray-800 border-gray-700 border-2 border-solid w-3/4 flex flex-col h-full py-6 rounded-md">
						<h1 class="text-5xl mb-5 inline-flex justify-center">
							Calculating results in progress
						</h1>
						<Spinner size="large" />
					</div>
				</div>
			{/if}
		{/if}
	{/if}
</div>
