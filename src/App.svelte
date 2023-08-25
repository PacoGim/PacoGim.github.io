<script lang="ts">
	import { onMount } from 'svelte'
	import Navigation from './Navigation.svelte'
	import Home from './sections/Home.svelte'
	import Projects from './sections/Projects.svelte'

	onMount(() => {
		window.addEventListener('scroll', evt => {
			console.log(evt)
		})
	})
</script>

<Navigation />

<main>
	<Home />
	<Projects />
</main>

<style>
	:global(section-svlt) {
		display: flex;
		height: 100vh;
	}
</style>
