<script lang="ts">
	import { onMount } from 'svelte'
	import Navigation from './Navigation.svelte'
	import Home from './sections/Home.svelte'
	import Projects from './sections/Projects.svelte'
	import { windowScrollValueStore } from './store'
	import Bio from './sections/Bio.svelte'
	import Skills from './sections/Skills.svelte'
	import About from './sections/About.svelte'

	onMount(() => {
		window.addEventListener('scroll', evt => {
			$windowScrollValueStore = window.scrollY || document.documentElement.scrollTop
		})
	})
</script>

<Navigation />

<main>
	<Home />
	<Projects />
	<Bio />
	<Skills />
	<About />
</main>

<style>
	:global(section-svlt) {
		display: flex;
		height: 100vh;
	}
</style>
