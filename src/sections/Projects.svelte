<script lang="ts">
	import { projectsSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold.const'
	import scrollToElementFn from '../functions/scrollToElement.fn'
	import projectsConst from '../constants/projects.const'
	import { onMount } from 'svelte'
	import { fade, slide } from 'svelte/transition'

	$: if (selfElement) {
		$windowScrollValueStore
		$projectsSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($projectsSectionFontWeight <= fontWeightMaxTreshold && $projectsSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#projects-section')
		}
	}

	$: updateProjectData(projectsConst[selectedIndex])

	let selfElement: HTMLElement = undefined
	let projectTitleElement: HTMLElement = undefined
	let projectDescriptionElement: HTMLElement = undefined

	let selectedIndex = 0
	let projectTitle = projectsConst[0].name
	let projectDescription = projectsConst[0].description
	let isMounted = false

	function handleListClickEvent(evt: MouseEvent) {
		const eventTarget = evt.target as HTMLElement
		const projectNameElement = eventTarget.closest('project-name') as HTMLElement

		if (projectNameElement === null) return

		selectedIndex = Number(projectNameElement.dataset.index)
	}

	function updateProjectData(project: { name: string; description: string }) {
		// if (isMounted === false) return
		// projectTitleElement.style.opacity = '0'
		// projectDescriptionElement.style.opacity = '0'
		// setTimeout(() => {
		// 	projectTitle = project.name
		// 	projectDescription = project.description
		// 	projectTitleElement.style.opacity = '1'
		// 	projectDescriptionElement.style.opacity = '1'
		// }, 300)
	}

	onMount(() => {
		// isMounted = true
		setTimeout(() => {
		selectedIndex = 1
		}, 1000)
	})
</script>

<section-svlt id="projects-section" bind:this={selfElement}>
	<project-preview>
		{#each projectsConst as project, index (index)}
			{#if selectedIndex === index}
				<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
					<svelte:component this={project.component} />
				</div>
			{/if}
		{/each}
	</project-preview>

	<projects-container>
		<projects-list role="button" tabindex="0" on:click={handleListClickEvent} on:keypress={handleListClickEvent}>
			{#each projectsConst as project, index (index)}
				<project-name
					data-index={index}
					class:selected={selectedIndex === index}
					class:fade1={Math.abs(selectedIndex - index) === 1}
					class:fade2={Math.abs(selectedIndex - index) === 2}
					class:fade3={Math.abs(selectedIndex - index) === 3}
					class:fade4={Math.abs(selectedIndex - index) > 3}
				>
					{project.name}</project-name
				>
			{/each}
		</projects-list>
	</projects-container>
</section-svlt>

<style>
	section-svlt {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	project-preview {
		display: flex;
		flex-direction: column;
		width: 500px;
		height: 600px;

		border-right: 4px solid #fff;

		transform: translateX(10px);

		text-align: center;

		background-color: rgba(255, 255, 255, 0.05);
	}

	project-preview span {
		transition: opacity 300ms ease-in-out;
	}

	project-title {
		font-size: 2rem;
		border: 5px solid #fff;
		padding: 2rem;

		border-radius: 10px 10px 0 0;
	}

	project-description {
		border: 5px solid #fff;
		padding: 2rem;

		border-top: none;

		height: 100%;
		border-radius: 0 0 10px 10px;
	}

	projects-container {
		display: flex;
		align-items: center;
	}

	/* project-carret {
		display: block;
		height: 5rem;
		width: 5rem;
	} */

	projects-list {
		display: flex;
		flex-direction: column;
		align-items: start;

		width: 300px;

		transition: all 3000ms ease-in-out;
	}

	project-name {
		margin: 0.25rem 0;
		text-align: left;
		cursor: pointer;

		user-select: none;

		display: flex;
		align-items: center;

		transition-property: opacity, font-size;
		transition-duration: 300ms;
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	project-name::before {
		content: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0iI2ZmZmZmZiIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0xODEuNjYsMTMzLjY2bC04MCw4MEE4LDgsMCwwLDEsODgsMjA4VjQ4YTgsOCwwLDAsMSwxMy42Ni01LjY2bDgwLDgwQTgsOCwwLDAsMSwxODEuNjYsMTMzLjY2WiI+PC9wYXRoPjwvc3ZnPg==');
		height: 25px;
		opacity: 0;

		transition: opacity 300ms ease-in-out;
	}

	project-name.selected::before {
		opacity: 1;
	}

	project-name.selected {
		opacity: 1;
		font-size: 32px;
	}

	project-name.fade1 {
		opacity: 0.87;
		font-size: 28px;
	}

	project-name.fade2 {
		opacity: 0.75;
		font-size: 24px;
	}

	project-name.fade3 {
		opacity: 0.62;
		font-size: 20px;
	}

	project-name.fade4 {
		opacity: 0.5;
		font-size: 16px;
	}
</style>
