<script lang="ts">
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import { bioSectionFontWeight, windowScrollValueStore } from '../store'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$bioSectionFontWeight = calculateFontWeightFn(selfElement)
	}
</script>

<section-svlt id="bio-section"  bind:this={selfElement}> Hello! This is a section of the portfolio! </section-svlt>

<style>
	section-svlt {
		background-color: deepskyblue;
	}
</style>
