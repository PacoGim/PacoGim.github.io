<script lang="ts">
	import { bioSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold.const'
	import scrollToElementFn from '../functions/scrollToElement.fn'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$bioSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($bioSectionFontWeight <= fontWeightMaxTreshold && $bioSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#bio-section')
		}
	}

	function calculateYears() {
		const dateNow = new Date()
		const dateDegree = new Date(2017, 6, 29)
		const diff = dateNow.getTime() - dateDegree.getTime()
		const years = diff / (1000 * 60 * 60 * 24 * 365.25)
		return Math.floor(years)
	}
</script>

<section-svlt id="bio-section" bind:this={selfElement}>
	<h1>Hello!,</h1>
	<h3>I’m pleased to see that I may have peaked your interest and for that I’m already glad.</h3>
	<p>
		Born in France in 1992, I quickly learned to use computers. High School bored me to death so I finished all the mandatory
		studies, moved to Spain then jumped right away in Programming studies.
	</p>
	<p>I managed to surpass my expectations and ended up with the best grades while also helping my other classmates.</p>
	<p>
		For my last year of schooling, I managed to get a place at the multinational INDRA as an intern but more about that in the
		Experience section.
	</p>
	<p>Now I'm a full stack engineer with {calculateYears()} years of experience and I’m back in France looking for a job.</p>
	<p>I’m cheerful, kindhearted, lifelong learner, perfectionist and magnanimous.</p>
</section-svlt>

<style>
	section-svlt {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	section-svlt > * {
		max-width: 600px;
		margin-bottom: 1rem;
	}

	h1 {
		width: 100%;
		text-align: left;
		font-size: 2.5rem;
		font-variation-settings: 'wght' 600;
		margin-bottom: 0;
	}

	h3 {
		font-size: 1.5rem;
		font-variation-settings: 'wght' 500;
	}

	p {
		font-size: 1.25rem;
	}

	:global(html[screen-size='small'] p) {
		max-width: initial;
		margin: 0 4rem;
	}
</style>
