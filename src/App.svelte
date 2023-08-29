<script lang="ts">
	import { onMount } from 'svelte'
	import Navigation from './Navigation.svelte'
	import Home from './sections/Home.svelte'
	import Projects from './sections/Projects.svelte'
	import { windowScrollStoppedStore, windowScrollValueStore } from './store'
	import Bio from './sections/Bio.svelte'
	import About from './sections/About.svelte'
	import Jahmin from './sections/Jahmin.svelte'
	import How from './sections/How.svelte'

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
	<How />
	<About />
</main>

<style>
	:global(section-svlt) {
		display: flex;
		height: 100vh;
		padding-left: 200px;
	}

	:global(section-svlt):nth-child(odd) {
		background-color: hsl(0, 0%, 20%);
	}

	:global(section-svlt):nth-child(even) {
		background-color: hsl(0, 0%, 10%);
	}
</style>
