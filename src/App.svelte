<script lang="ts">
	import { onMount } from 'svelte'
	import Navigation from './Navigation.svelte'
	import Home from './sections/Home.svelte'
	import Skills from './sections/Skills.svelte'
	import Experience from './sections/Experience.svelte'
	import Education from './sections/Education.svelte'
	import Bio from './sections/Bio.svelte'
	import Projects from './sections/Projects.svelte'
	import mediaQueriesFn from './functions/mediaQueries.fn'
	import StarrySky from './background/StarrySky.svelte'

	onMount(() => {
		mediaQueriesFn()
	})
</script>

<main>
	<StarrySky/>
	<Navigation />
	<Home />
	<Bio />
	<Projects />
	<Skills />
	<Experience />
	<Education />
</main>


<style>
	/* :global(html::before) {
		content: attr(screen-size);
		position: fixed;
		top: 10px;
		right: 10px;
		color: #fff;
		font-family: 'RobotoFlex';
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
	} */
</style>
