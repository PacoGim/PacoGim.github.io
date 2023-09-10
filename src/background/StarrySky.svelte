<script lang="ts">
	import { afterUpdate, onMount } from 'svelte'
	import getRandomNumberFn from '../functions/getRandomNumber.fn'
	import { currentScreenSize } from '../store'

	let starrySkyElement: HTMLElement = undefined

	onMount(() => {
		setTimeout(() => {
			let height = Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			)

			let width = window.innerWidth

			let starNumbers = 0

			switch ($currentScreenSize) {
				case 'big':
					starNumbers = 100
					break
				case 'medium':
					starNumbers = 66
					break
				default:
					starNumbers = 33
			}

			for (let i = 0; i < 3; i++) {
				starrySkyElement.appendChild(createCosmicSmoke(height, width))
			}

			for (let i = 0; i < starNumbers; i++) {
				starrySkyElement.appendChild(createStar(height, width))
			}
		}, 10)
	})

	function createCosmicSmoke(height: number, width: number) {
		let positionX = getRandomNumberFn(0, width) - width / 3
		let positionY = getRandomNumberFn(0, height) - height / 3
		let size = width / 3

		let cosmicSmokeElement = document.createElement('cosmic-smoke')

		cosmicSmokeElement.style.left = `${positionX}px`
		cosmicSmokeElement.style.top = `${positionY}px`
		cosmicSmokeElement.style.height = `${size}px`
		cosmicSmokeElement.style.width = `${size}px`

		return cosmicSmokeElement
	}

	function createStar(height: number, width: number) {
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

		return starElement
	}
</script>

<starry-sky bind:this={starrySkyElement} />

<style>
	starry-sky {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
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

	:global(cosmic-smoke) {
		position: absolute;
		display: block;
		background-color: #2954a3;
		z-index: -2;

		filter: blur(1000px);
		border-radius: 100vmax;
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
