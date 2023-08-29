<script lang="ts">
	import { onMount } from 'svelte'
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import getTranslationsFn from '../functions/getTranslations.fn'
	import scrollToElementFn from '../functions/scrollToElement.fn'
	import { homeSectionFontWeight, langStore, windowScrollStoppedStore, windowScrollValueStore } from '../store'

	$: if (selfElement) {
		$windowScrollValueStore
		$homeSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($homeSectionFontWeight <= fontWeightMaxTreshold && $homeSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#home-section')
		}
	}

	let isVisible = false

	let selfElement: HTMLElement = undefined

	// function foo() {
	// 	let elementObserver: IntersectionObserver

	// 	elementObserver = new IntersectionObserver(
	// 		entries => {
	// 			if (entries[0].isIntersecting === true) {
	// 				isVisible = true
	// 			} else {
	// 				isVisible = false
	// 			}
	// 		},
	// 		{
	// 			threshold: 1
	// 		}
	// 	)

	// 	elementObserver.observe(selfElement.querySelector('#home-section p.who'))
	// }

	// $: console.log(isVisible)

	onMount(() => {
		isVisible = true
	})
</script>

<section-svlt id="home-section" class:isVisible bind:this={selfElement}>
	<section-header>
		<img-container><img src="https://placehold.co/400x400/png" alt="" /></img-container>
	</section-header>

	<section-body>
		<p class="who">Paco Gimeno</p>
		<separator />
		<p class="what">{getTranslationsFn('Software Engineer', $langStore)}</p>
	</section-body>
</section-svlt>

<style>
	section-svlt {
		display: flex;
		flex-direction: column;
		font-size: 3rem;

		text-align: center;

		background: linear-gradient(135deg, rgba(0,61,255,1) 0%, rgba(0,130,255,1) 50%, rgba(0,191,255,1) 100%);
	}

	section-header {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 8rem;
	}

	section-body {
		display: flex;
		align-items: center;
		justify-content: start;
		flex-direction: column;
		height: 100%;
		padding: 5rem;
	}

	#home-section p,
	#home-section separator {
		transition-property: transform, opacity;
		transition-duration: 2000ms;
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	img-container {
		display: block;
		width: 200px;
		height: 200px;
		border-radius: 100vmax;
		border: 5px solid #fff;
		background-color: #fff;

		box-shadow: 0 0 0px 0px #fff;

		transform: rotateX(90deg);
		transition-property: transform, opacity, box-shadow;
		transition-delay: 1000ms;
		transition-duration: 1000ms, 1000ms, 10000ms;
		transition-timing-function: ease-in-out;
	}

	img {
		width: 100%;
		height: 100%;
		border-radius: 100vmax;
	}

	#home-section.isVisible img-container {
		box-shadow: 0 0 500px 0px #fff;
		transform: translateY(0px);
		opacity: 1;
	}

	p.who {
		font-variation-settings: 'wght' 600;
		transform: translateY(-200px);
		opacity: 0;
	}

	#home-section.isVisible p.who {
		transform: translateY(-25px);
		opacity: 1;
	}

	p.what {
		transform: translateY(200px);
		opacity: 0;
	}

	#home-section.isVisible p.what {
		transform: translateY(25px);
		opacity: 1;
	}

	separator {
		display: block;
		background-color: #fff;
		height: 5px;
		width: 50%;

		border-radius: 100vmax;

		transform: scale(0);
		opacity: 0;
	}

	#home-section.isVisible separator {
		transform: scale(1);
		opacity: 1;
	}
</style>
