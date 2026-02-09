<script lang="ts">
	import getTranslationsFn from '../functions/getTranslations.fn'
	import { langStore } from '../store'
</script>

<section-svlt id="skills-section">
	<h1>{getTranslationsFn('Skills', $langStore)}</h1>
	<br />
	<h2>{getTranslationsFn("My main skill is that I find solutions to problems very quickly.", $langStore)}</h2>
	<br />
	<h3>{getTranslationsFn("For frameworks, I don't mind which one as long that it gets the job done.", $langStore)}</h3>
	<br />
	<p>{getTranslationsFn("I mainly program with the Svelte framework and Typescript.", $langStore)}</p>
	<br />
	<p>{getTranslationsFn("But I have used in the past these technologies for fairly big projects:", $langStore)}</p>
	<br />
	<ul>
		<li>Astro</li>
		<li>SQLite3</li>
		<li>Vue.js</li>
		<li>React</li>
		<li>GraphQL</li>
		<li>MySQL</li>
		<li>Node.js</li>
		<li>MongoDB</li>
		<li>Angular</li>
		<li>COBOL</li>
	</ul>
</section-svlt>

<style lang="scss">
	section-svlt {
		display: block;
		text-align: left;
		padding: 5rem;
		max-width: 800px;
		margin: 5rem auto;

		border-radius: 20px;

		backdrop-filter: blur(5px);
		background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));
	}

	h1{
		text-align: center;
	}

	li {
		list-style: none;
		text-align: center;
	}
</style>
