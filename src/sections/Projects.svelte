<script lang="ts">
	import { onMount } from 'svelte'
	import { projectsSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'
	import scrollToElementFn from '../functions/scrollToElement.fn'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$projectsSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($projectsSectionFontWeight <= fontWeightMaxTreshold && $projectsSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#projects-section')
		}
	}
</script>

<section-svlt id="projects-section" bind:this={selfElement}>
	<!--  -->


</section-svlt>

<style>
	section-svlt {
	}
</style>
