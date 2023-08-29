<script lang="ts">
	import { onMount } from 'svelte'
	import Navigation from './Navigation.svelte'
	import Home from './sections/Home.svelte'
	import { windowScrollStoppedStore, windowScrollValueStore } from './store'
	import Jahmin from './sections/Jahmin.svelte'
	import Skills from './sections/Skills.svelte'
	import Experience from './sections/Experience.svelte'
	import Education from './sections/Education.svelte'
	import Bio from './sections/Bio.svelte'

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

<main>
	<Navigation />
	<Home />
	<Bio />
	<Jahmin />
	<Skills />
	<Experience />
	<Education />
</main>

<style>
	:global(section-svlt) {
		display: flex;
		height: 100vh;
		padding-left: 216px;
	}

	:global(section-svlt):nth-child(odd) {
		background-color: hsl(0, 0%, 20%);
	}

	:global(section-svlt):nth-child(even) {
		background-color: hsl(0, 0%, 10%);
	}
</style>
