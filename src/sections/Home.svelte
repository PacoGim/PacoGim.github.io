<script lang="ts">
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import scrollToElementFn from '../functions/scrollToElement.fn'
	import { homeSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$homeSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($homeSectionFontWeight <= fontWeightMaxTreshold && $homeSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#home-section')
		}
	}
</script>

<section-svlt id="home-section" bind:this={selfElement} />

<style>
	section-svlt {
		background-color: rgb(93, 29, 29);
	}
</style>
