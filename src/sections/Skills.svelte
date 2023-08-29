<script lang="ts">
	import { skillsSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold'
	import scrollToElementFn from '../functions/scrollToElement.fn'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$skillsSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($skillsSectionFontWeight <= fontWeightMaxTreshold && $skillsSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#skills-section')
		}
	}
</script>

<section-svlt id="skills-section" bind:this={selfElement}>
	<h1>Skills</h1>
</section-svlt>

<style>
	section-svlt {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
</style>
