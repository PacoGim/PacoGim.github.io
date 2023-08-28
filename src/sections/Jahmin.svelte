<script lang="ts">
	import { jahminSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'
	import scrollToElementFn from '../functions/scrollToElement.fn'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$jahminSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($jahminSectionFontWeight <= fontWeightMaxTreshold && $jahminSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#jahmin-section')
		}
	}
</script>

<section-svlt id="jahmin-section" bind:this={selfElement}>
	<p>
		Jahmin, my pride and joy, I have been working on this app for some years now. A cross platform Music player based on
		ElectronJS and Svelte, capable of handling thousands of songs while the app is being used thanks to the use of Web Workers.
	</p>

	<p>A massive codebase that can handle:</p>
	<ul>
		<li>Song metadata updating</li>
		<li>Lyrics</li>
		<li>Configurations</li>
		<li>Dynamic colors based on album arts</li>
		<li>Customizable art grid</li>
		<li>A beautiful song list</li>
		<li>Album art optimization</li>
		<li>Song rating</li>
		<li>Animated album arts</li>
		<li>And much, much more</li>
	</ul>
</section-svlt>

<style>
	section-svlt {
		display: block;
	}
</style>
