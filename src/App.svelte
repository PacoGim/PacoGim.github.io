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
	import Projects from './sections/Projects.svelte'
	import mediaQueriesFn from './functions/mediaQueries.fn'

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

		mediaQueriesFn()
	})
</script>

<main>
	<Navigation />
	<Home />
	<Bio />
	<Projects />
	<Skills />
	<Experience />
	<Education />
</main>

<style>
	:global(html::before) {
		content: attr(screen-size);
		position: fixed;
		top: 10px;
		right: 10px;
		color: #fff;
		font-family: 'Gabarito';
	}

	:global(section-svlt) {
		display: flex;
		height: 100vh;
		padding-left: 216px;
	}

	:global(html[screen-size='small'] section-svlt) {
		padding-left: 0;
		padding-top: 168px;
	}

	:global(section-svlt):nth-child(odd) {
		background-color: hsl(0, 0%, 20%);
	}

	:global(section-svlt):nth-child(even) {
		background-color: hsl(0, 0%, 10%);
	}
</style>
