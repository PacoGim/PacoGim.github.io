<script lang="ts">
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import { homeSectionFontWeight, windowScrollValueStore } from '../store'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$homeSectionFontWeight = calculateFontWeightFn(selfElement)
	}
</script>

<section-svlt id="home-section" bind:this={selfElement}> Hello! This is a section of the portfolio! </section-svlt>

<style>
	section-svlt {
		background-color: rgb(93, 29, 29);
	}
</style>
