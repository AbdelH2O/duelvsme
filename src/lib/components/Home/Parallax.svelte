<script lang="ts">
    import dvsme from '../../../assets/duelvsme.svg';

    let scroll: number, height: number;
    $: console.log(scroll, height);
</script>

<svelte:window bind:scrollY={scroll} bind:innerHeight={height}/>
<section class="h-[350vh] -z-10 absolute top-0 w-full">
    <div class="w-full flex flex-col items-center">
        <img src={dvsme} alt="Duelvsme" class="w-96 relative m-auto"  style={scroll <= height ? `transform: translateY(${Math.min(scroll * 1.2)}px) translateX(-12rem) translateX(50%) rotate(${scroll/5}deg);` : `top: ${Math.max(height*1.2, scroll)}px; transform: translateX(-12rem) translateX(50%) rotate(${scroll/5}deg);`} />
        <h1
            style={
                scroll <= height || scroll > 3 * height ?
                `display: none;` :
                `opacity: ${100 - height*60/scroll}%;color: white; transform: translateY(${scroll + height/7}px)`
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
</section>