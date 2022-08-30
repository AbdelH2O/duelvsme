<script>
	export let left = 40;
	export let bottom = 40;
	
	let moving = false;
	
	function onMouseDown() {
		moving = true;
	}
	
	function onMouseMove(e) {
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
	}
</style>

<section on:mousedown={onMouseDown} style="left: {left}px; bottom: {bottom}px;" class="draggable">
	<slot></slot>
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />