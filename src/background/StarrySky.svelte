<script lang="ts">
	import { onMount } from 'svelte'
	import getRandomNumberFn from '../functions/getRandomNumber.fn'

	let numbersArray = []

	onMount(() => {
		for (let i = 0; i < 200; i++) {
			numbersArray.push(getRandomNumberFn(0, 9))
		}

		numbersArray = numbersArray
	})
</script>

<starry-sky>
	{#each numbersArray as number, index (index)}
		{#if getRandomNumberFn(0, 9) === 9}
			<span
				style="height: {number}px;width: {number}px;animation-delay:{getRandomNumberFn(
					1000,
					4000
				)}ms;animation-duration:{getRandomNumberFn(10000, 50000)}ms;"
			/>
		{:else}
			<nothing />
		{/if}
	{/each}
</starry-sky>

<style>
	starry-sky {
		display: grid;
		grid-template-columns: repeat(15, 1fr);
		grid-template-rows: repeat(15, 1fr);
		z-index: -999;

		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		opacity: 0.75;
	}

	starry-sky span {
		display: block;
		background-color: #fff;
		filter: blur(4px);
		border-radius: 100vmax;

		transform: scale(1);

		animation: scaleGrowShrink cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
	}

	@keyframes scaleGrowShrink {
		0% {
			transform: scale(1);
			filter: blur(4px);
		}
		50% {
			transform: scale(3);
			filter: blur(2px);
		}
		100% {
			filter: blur(4px);
			transform: scale(1);
		}
	}
</style>
