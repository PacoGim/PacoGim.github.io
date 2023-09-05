<script lang="ts">
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold.const'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import scrollToElementFn from '../functions/scrollToElement.fn'
	import { experienceSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$experienceSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($experienceSectionFontWeight <= fontWeightMaxTreshold && $experienceSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#experience-section')
		}
	}
</script>

<section-svlt id="experience-section" bind:this={selfElement}>
	<p></p>
</section-svlt>

<style>
	section-svlt {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
	}

	section-svlt p {
		margin-bottom: 1rem;
	}
</style>
