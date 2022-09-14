<script lang="ts">
    import Hero from "$lib/components/Home/Hero.svelte";
    import Split from "$lib/components/Home/Split.svelte";
    import Features from "$lib/components/Home/Features.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Parallax from "$lib/components/Home/Parallax.svelte";

</script>
<svelte:head>
    <title>Duelvsme</title>
</svelte:head>
<Hero/>
<div class="hidden lg:block">
    <Parallax />
    <div class="absolute top-[700vh] w-full flex flex-col items-center z-50">
        <hr class="w-screen border-gray-800 border-t-2"/>
        <Split />
    </div>
</div>
<!-- <Features />
<Footer /> -->
