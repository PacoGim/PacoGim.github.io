<script lang="ts">
	import getTranslationsFn from '../functions/getTranslations.fn'
	import { langStore } from '../store'
</script>

<section-svlt id="experience-section">
	<h1>{getTranslationsFn('Experience', $langStore)}</h1>
	<br />
	<p>
		{getTranslationsFn(
			'Well... At the end of my Programming studies, I got a place as internship in INDRA (Spain) for about 3 months. The post was suposed to be about Java but they asked me if I would mind to “assist” them in some bank branch they had and I said yes sure.',
			$langStore
		)}
	</p>
	<br />
	<p>{getTranslationsFn('It was a bad idea.', $langStore)}</p>
	<br />
	<p>
		{getTranslationsFn(
			"Turns out that the bank branch works with COBOL... So they teached me COBOL in like a week and that's about it really...",
			$langStore
		)}
	</p>
	<br />
	<p>
		{getTranslationsFn(
			'It is extremely expensive to run a program to the Main Frame so most of the programs I wrote had to be checked by someone.',
			$langStore
		)}
	</p>
	<br />
	<p>
		{getTranslationsFn(
			'At the end of the internship and after that pretty bad taste, I decided to create a massive app and make money from it… but it is not really worth the effort and I would rather work in a company with people.',
			$langStore
		)}
	</p>
	<br />

	<h2>
		{getTranslationsFn(
			"For many years, I have been honing my skills and now, I'm feeling ready to tackle any challenge.",
			$langStore
		)}
	</h2>
</section-svlt>

<style lang="scss">
	section-svlt {
		display: block;
		text-align: center;
		padding: 5rem;
		max-width: 800px;
		margin: 0 auto;

		border-radius: 20px;

		backdrop-filter: blur(5px);
		background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));

		margin-top: 10rem;
		// padding-bottom: 10rem;
	}
</style>
