<script lang="ts">
	import { onMount } from 'svelte'
	import getRandomNumberFn from '../functions/getRandomNumber.fn'

	let starrySkyElement: HTMLElement = undefined

	onMount(() => {
		let height = document.querySelector('html').offsetHeight
		let width = document.querySelector('html').offsetWidth

		for (let i = 0; i < 100; i++) {
			let positionX = getRandomNumberFn(0, width)
			let positionY = getRandomNumberFn(0, height)
			let size = getRandomNumberFn(1, 6)

			let starElement = document.createElement('star')
			starElement.style.left = `${positionX}px`
			starElement.style.top = `${positionY}px`
			starElement.style.height = `${size}px`
			starElement.style.width = `${size}px`
			starElement.style.animationDelay = `${getRandomNumberFn(0, 1000)}ms`
			starElement.style.animationDuration = `${getRandomNumberFn(10000, 20000)}ms`

			starrySkyElement.appendChild(starElement)
		}
	})
</script>

<starry-sky bind:this={starrySkyElement} />

<style>
	starry-sky {
		position: relative;
	}

	:global(star) {
		position: absolute;
		display: block;
		background-color: #fff;
		opacity: 0.75;
		z-index: -1;

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
			filter: blur(1px);
		}
		100% {
			filter: blur(4px);
			transform: scale(1);
		}
	}
</style>
