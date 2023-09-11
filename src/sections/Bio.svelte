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
	<h2>{getTranslationsFn('I’m pleased to see that I may have peaked your interest and for that I’m already glad.', $langStore)}</h2>
	<br />
	<p>
		{getTranslationsFn('Born in France in 1992, I quickly learned to use computers. High School bored me to death so I finished all the mandatory studies, moved to Spain then jumped right away in Programming studies since I new that this was my vocation.', $langStore)}
	</p>
	<br />
	<p>{getTranslationsFn('I managed to surpass my expectations and ended up with the best grades while also helping my other classmates.', $langStore)}</p>
	<br />
	<p>
		{getTranslationsFn('For my last year of schooling, I managed to get a place at the multinational INDRA as an intern but more about that in the Experience section.', $langStore)}
	</p>
	<br />
	<p>{getTranslationsFn("Now I'm a full stack engineer with ", $langStore)} {calculateYears()} {getTranslationsFn(" years of experience and I’m back in France looking for a job.", $langStore)}</p>
	<br />
	<p>{getTranslationsFn("I’m cheerful, kindhearted, lifelong learner, perfectionist and magnanimous.", $langStore)}</p>
	<br>
	<p>{getTranslationsFn("I speak french, english and spanish.", $langStore)}</p>
</section-svlt>

<style lang="scss">
	section-svlt {
		display: block;
		padding: 5rem;
		max-width: 800px;
		margin: 0 auto;

		border-radius: 20px;

		backdrop-filter: blur(5px);
		background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));
	}
</style>
