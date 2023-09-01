<script lang="ts">
	import { bioSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold.const'
	import scrollToElementFn from '../functions/scrollToElement.fn'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$bioSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($bioSectionFontWeight <= fontWeightMaxTreshold && $bioSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#bio-section')
		}
	}
</script>

<section-svlt id="bio-section" bind:this={selfElement}>
	<p>
		Hello!, my name is Paco Gimeno and I'm a software engineer with 6 years of experience. I'm passionate about creating
		innovative solutions to complex problems and enjoy working collaboratively with others. My technical skills include
		proficiency in Javascript/Typescript and Svelte. I'm also a strong communicator and enjoy helping others learn and grow.
	</p>
</section-svlt>

<style>
	section-svlt {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	p {
		max-width: 200px;
	}
</style>
