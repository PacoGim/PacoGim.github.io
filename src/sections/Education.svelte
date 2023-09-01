<script lang="ts">
	import { educationSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold.const'
	import scrollToElementFn from '../functions/scrollToElement.fn'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$educationSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($educationSectionFontWeight <= fontWeightMaxTreshold && $educationSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#education-section')
		}
	}
</script>

<section-svlt id="education-section" bind:this={selfElement}>
	<h1>Education</h1>
</section-svlt>

<style>
	section-svlt {
	}
</style>
