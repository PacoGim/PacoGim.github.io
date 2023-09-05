<script lang="ts">
	import { skillsSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold.const'
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
	<p>My main frontend skills are Svelte and Javascript/Typescript</p>
	<p>I did also a pretty big Vue.js project a long time ago before switching to Svelte</p>
	<p>Now I'm getting quite interested in Astro</p>
	<br />
	<p>Node.js is my main backend skills</p>
	<p>I have a working application made with Electron</p>
	<p>I know how to use WebWorkers</p>
	<p>For database, MySQL, SQLite3, MongoDB and GraphQL are the ones I have used the most in the past</p>
	<p>I love programming and I learn quickly so I'm not affraid of spending couple weeks learning something new</p>
</section-svlt>

<style>
	section-svlt {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
	}

	section-svlt p {
		margin-bottom: 1rem;
	}
</style>
