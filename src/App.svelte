<script lang="ts">
	import { onMount } from 'svelte'
	import Navigation from './Navigation.svelte'
	import Home from './sections/Home.svelte'
	import Skills from './sections/Skills.svelte'
	import Experience from './sections/Experience.svelte'
	import Footer from './sections/Footer.svelte'
	import Bio from './sections/Bio.svelte'
	import Projects from './sections/Projects.svelte'
	import mediaQueriesFn from './functions/mediaQueries.fn'
	import StarrySky from './background/StarrySky.svelte'
	import { langStore } from './store'
	import getTranslationsFn from './functions/getTranslations.fn'

	onMount(() => {
		mediaQueriesFn()
	})
</script>

<main id="app">
	<StarrySky />
	<Navigation />
	<Home />
	<Bio />
	<Projects />
	<Experience />
	<Skills />
	<Footer />
	<go-up-container>
		<button
			class="nostyle"
			onclick={() => document.querySelector('body').scrollIntoView({ block: 'start', behavior: 'smooth' })}
		>
			{getTranslationsFn('Go back up', $langStore)}
		</button>
	</go-up-container>
</main>

<style>
	main {
		position: relative;
		padding-bottom: 10rem;
	}

	go-up-container {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;

		margin-top: 5rem;
	}
	go-up-container button {
		padding: 0.5rem 1rem;
		border-radius: 100vmax;

		background: linear-gradient(to bottom right, #c961de, #2954a3);
	}
</style>
