<script lang="ts">
	export let left = 40;
	export let bottom = 40;
	
	let moving = false;
	
	function onMouseDown() {
		moving = true;
	}
	
	function onMouseMove(e: MouseEvent) {
		if (moving) {
			left += e.movementX;
			bottom -= e.movementY;
		}
	}
	
	function onMouseUp() {
		moving = false;
	}
	
// 	$: console.log(moving);
</script>

<style>
	.draggable {
		user-select: none;
		cursor: move;
        position: absolute;
        border-radius: 0.375rem;
		overflow: hidden;
		z-index: 9999999;
	}
</style>

<section on:mousedown={onMouseDown} style="left: {left}px; bottom: {bottom}px;" class="w-[15] h-fit draggable bg-transparent">
	<slot></slot>
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />