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
	<h1>Experience</h1>
</section-svlt>

<style>
	section-svlt {
	}
</style>
