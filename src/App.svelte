<script lang="ts">
	import { onMount } from 'svelte'
	import Navigation from './Navigation.svelte'
	import Home from './sections/Home.svelte'
	import Projects from './sections/Projects.svelte'
	import { windowScrollStoppedStore, windowScrollValueStore } from './store'
	import Bio from './sections/Bio.svelte'
	import Skills from './sections/Skills.svelte'
	import About from './sections/About.svelte'
	import Jahmin from './sections/Jahmin.svelte'

	let windowScrollDebounce = undefined

	onMount(() => {
		window.addEventListener('scroll', evt => {
			$windowScrollValueStore = window.scrollY || document.documentElement.scrollTop
			$windowScrollStoppedStore = false

			clearTimeout(windowScrollDebounce)

			windowScrollDebounce = setTimeout(() => {
				$windowScrollStoppedStore = true
			}, 500)
		})
	})
</script>

<Navigation />

<main>
	<Home />
	<Projects />
	<Jahmin />
	<Bio />
	<Skills />
	<About />
</main>

<style>
	:global(section-svlt) {
		display: flex;
		height: 100vh;
		padding-left: 200px;
	}

	:global(section-svlt):nth-child(odd) {
		background-color: hsl(195, 100%, 50%);
	}

	:global(section-svlt):nth-child(even) {
		background-color: hsl(195, 100%, 45%);
	}
</style>
