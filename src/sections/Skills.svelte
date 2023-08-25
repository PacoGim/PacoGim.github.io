<script lang="ts">
	import { onMount } from 'svelte'
	import { projectsSectionFontWeight, skillsSectionFontWeight, windowScrollValueStore } from '../store'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$skillsSectionFontWeight = calculateFontWeightFn(selfElement)
	}
</script>

<section-svlt id="skills-section" bind:this={selfElement}> Hello! This is a section of the portfolio! </section-svlt>

<style>
	section-svlt {
		background-color: rgb(39, 39, 111);
	}
</style>
