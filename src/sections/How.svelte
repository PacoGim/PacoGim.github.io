<script lang="ts">
	import { howSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold'
	import scrollToElementFn from '../functions/scrollToElement.fn'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$howSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($howSectionFontWeight <= fontWeightMaxTreshold && $howSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#how-section')
		}
	}
</script>

<section-svlt id="how-section" bind:this={selfElement}>
	<!--  -->
	<p>First and foremost, I hate praising myself, I'm a humble programmer that never steps on others.</p>
	<p>But I need to write all I have done so youy know who am I and what do I do.</p>
	<p>Programming goes beyond just work or a hobby for me, it is part of my life.</p>
	<p>I can't count the amount of mini projects I programmed:</p>
	<ul>
		<li>Perfect Aaa contrast finder from any color.</li>
		<li>An impractical new browser DB that I had to scrap.</li>
		<li>A super complex double player system to fix an audible crackle when chain playing songs in HTML5</li>
	</ul>
</section-svlt>

<style>
	section-svlt {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
</style>
