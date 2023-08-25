<script lang="ts">
	import { aboutSectionFontWeight, projectsSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold'
	import scrollToElementFn from '../functions/scrollToElement.fn'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$aboutSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($aboutSectionFontWeight <= fontWeightMaxTreshold && $aboutSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#about-section')
		}
	}
</script>

<section-svlt id="about-section" bind:this={selfElement}> Hello! This is a section of the portfolio! </section-svlt>

<style>
	section-svlt {
		background-color: rgb(39, 39, 111);
	}
</style>
