<script lang="ts">
	import getTranslationsFn from "../functions/getTranslations.fn"
	import { langStore } from "../store"

	function calculateYears() {
		const dateNow = new Date()
		const dateDegree = new Date(2017, 6, 29)
		const diff = dateNow.getTime() - dateDegree.getTime()
		const years = diff / (1000 * 60 * 60 * 24 * 365.25)
		return Math.floor(years)
	}
</script>

<section-svlt id="bio-section">
	<h1>{getTranslationsFn('Hello!', $langStore)}</h1>
	<br>
	<h2>{getTranslationsFn('I’m Paco Gimeno, a Full Stack Engineer based in Paris with a strong product mindset and a passion for building production-ready applications.', $langStore)}</h2>
	<br />
	<p>
		{getTranslationsFn('Originally from France, I pursued my early programming studies in Spain before returning to Paris to continue my engineering journey. This international path shaped my adaptability and fluency in French, English, and Spanish.', $langStore)}
	</p>
	<br />
	<p>{getTranslationsFn('I primarily work with Svelte, TypeScript, Node.js, and Electron, leveraging my system-level background to build clean, efficient, and pragmatic solutions across frontend, backend, and infrastructure.', $langStore)}</p>
	<br />
	<p>
		{getTranslationsFn('I’m looking for an opportunity to contribute to ambitious products, tackle challenging engineering problems, and collaborate with strong technical teams.', $langStore)}
	</p>
</section-svlt>

<style lang="scss">
</style>
