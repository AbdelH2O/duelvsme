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
</div>
<!-- <Split />
<Features />
<Footer /> -->
