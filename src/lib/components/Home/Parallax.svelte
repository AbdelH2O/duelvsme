<script lang="ts">
    // import type { SvelteComponent } from 'svelte';
    // import { onMount } from 'svelte';
    import dvsme from '../../../assets/duelvsme.svg';
    
    import FakeLockout from '$lib/components/Home/FakeLockout.svelte';
    
    let scroll = 0, height = 0;
    // $: follow = scroll > height;
    // $: console.log(follow);
    // const load = async () => {
    //     $: if(follow && init){
    //         FakeLockout = (await import('$lib/components/Home/FakeLockout.svelte')).default;
    //         console.log(typeof FakeLockout);
    //         init = true;
    //     }
    // }
    // onMount(load);
    // $: console.log(scroll, 4*height);
    // $: console.assert(scroll !== 3*height ,scroll/5, height*3/5);
</script>

<svelte:window bind:scrollY={scroll} bind:innerHeight={height}/>
<section class="h-[400vh] -z-10 absolute top-0 w-full">
    <div class="w-full flex flex-col items-center">
        <img src={dvsme} alt="Duelvsme" class="w-96 h-96 relative m-auto"
            style={
                scroll <= height ?
                `transform: translateY(${Math.min(scroll * 1.2)}px) translateX(-12rem) translateX(50%) rotate(${scroll/5}deg);` :
                (
                    scroll <= height * 3 ?
                    `transform: translateY(${Math.max(height*1.2, scroll-height + height*1.2)}px) translateX(-12rem) translateX(50%) rotate(${scroll/5}deg);` :
                    `transform: translateY(${height*3.2}px) translateX(-12rem) translateX(50%) rotate(${height*3/5}deg);`
                )
            } 
        />
        <h1
            style={
                scroll <= height ?
                `display: none;` :
                `opacity: ${100 - height*60/scroll}%;color: white; transform: translateY(${Math.min(scroll + height/4, height*3.25)}px)`
            }
            class="font-bold text-4xl"
        >
            Matchmaking in progress{
                scroll - height < height/3 ?
                '.' :
                (
                    scroll - height < height/3 * 2 ?
                    '..' :
                    '...'
                )
            }
        </h1>
    </div>
    <p class="opacity-60" style={scroll < height ? `display: none;` : `position: absolute; transform: translateY(${scroll + 0.5 * height - 10}px) translateX(50vw) translateX(-52px)`}>
        (keep scrolling)
    </p>
</section>
<section class="h-[300vh] w-screen -z-10 absolute flex flex-row justify-center top-[400vh]">
    <div class="w-[90vw] bg-gray-800 h-[85vh] rounded-md border-2 border-gray-700 flex flex-col items-stretch"  style={`transform: translateY(${Math.max(scroll + 0.075*height - 4*height, 0)}px);`}>
        <div class="w-full border-b-2 border-gray-700 h-[6%] flex flex-row justify-start">
            <div class="w-[5%] ml-3 flex flex-row justify-around items-center">
                <div class="bg-red-600 rounded-full w-3 h-3"></div>
                <div class="bg-yellow-500 rounded-full w-3 h-3"></div>
                <div class="bg-green-600 rounded-full w-3 h-3"></div>
            </div>
        </div>
        <div class="h-[94%]">
            <FakeLockout scroll={scroll} height={height}/>
            <!-- {#if follow}
                {#await import('$lib/components/Home/FakeLockout.svelte') then Module}
                    <Module.default />
                {/await}
            {/if}
            <svelte:component this={FakeLockout} /> -->
        </div>
        <!-- <div></div> -->
    </div>
</section>