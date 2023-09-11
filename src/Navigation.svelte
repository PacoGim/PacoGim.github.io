<script lang="ts">
	import GoldText from './components/goldText.comp.svelte'
	import getTranslationsFn from './functions/getTranslations.fn'
	import { currentScreenSize, langStore } from './store'

	let isActive = false
</script>

<navigation-svlt>
	<GoldText text={$currentScreenSize!=='small'?'Paco Gimeno':'PG'} style="font-size: 2.5rem;margin-right:1rem;white-space: nowrap;" />

	{#if $currentScreenSize === 'small'}
		<lang-change>
			<button class="nostyle" class:selected={$langStore === 'en'} on:click={() => ($langStore = 'en')}>English</button>
			<separator>|</separator>
			<button class="nostyle" class:selected={$langStore === 'fr'} on:click={() => ($langStore = 'fr')}>Français</button>
		</lang-change>
	{/if}

	{#if $currentScreenSize === 'small'}
		<hamburger-menu onclick={() => (isActive = !isActive)} data-isActive={String(isActive)}>
			<hamburger-line />
			<hamburger-line />
			<hamburger-line />
		</hamburger-menu>
	{/if}

	<nav-links data-isActive={String(isActive)}>
		<a href="#/" on:click={() => (isActive = false)}>{getTranslationsFn('Home', $langStore)}</a>
		<a href="#bio-section" on:click={() => (isActive = false)}>{getTranslationsFn('Bio', $langStore)}</a>
		<a href="#projects-section" on:click={() => (isActive = false)}>{getTranslationsFn('Projects', $langStore)}</a>
		<a href="#skills-section">{getTranslationsFn('Skills', $langStore)}</a>
		<a href="#experience-section">{getTranslationsFn('Experience', $langStore)}</a>
		{#if $currentScreenSize !== 'small'}
			<lang-change>
				<button class="nostyle" class:selected={$langStore === 'en'} on:click={() => ($langStore = 'en')}>English</button>
				<separator>|</separator>
				<button class="nostyle" class:selected={$langStore === 'fr'} on:click={() => ($langStore = 'fr')}>Français</button>
			</lang-change>
		{/if}
	</nav-links>
</navigation-svlt>

<style lang="scss">
	hamburger-menu {
		position: fixed;
		right: 1rem;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.85);
		height: 2.5rem;
		width: 2.5rem;
		border-radius: 2.5px;
		padding: 0.5rem;
		border: 1px solid #fff;
		z-index: 1;
	}

	hamburger-menu hamburger-line {
		display: block;
		height: 1px;
		width: 100%;
		background-color: #fff;

		transition: transform 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	hamburger-menu[data-isActive='true'] {
		hamburger-line:nth-of-type(1) {
			transform: rotateZ(45deg) translateY(4px) translateX(4px) scale(1.2);
		}

		hamburger-line:nth-of-type(2) {
			transform: scale(0);
		}

		hamburger-line:nth-of-type(3) {
			transform: rotateZ(-45deg) translateY(-4px) translateX(4px) scale(1.2);
		}
	}

	navigation-svlt {
		position: relative;
		display: flex;
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.5);
		align-items: center;
	}

	nav-links {
		margin-left: auto;
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		text-align: center;
		transition: transform 0ms ease-out;
		transform: translateY(77px) translateX(110%);
		z-index: 1;
	}

	a {
		display: inline-block;
		text-decoration: none;
		color: inherit;
		margin: 0 0.5rem;
		padding: 0.5rem 0rem;
	}

	lang-change {
		display: flex;
		margin-left: 2rem;
		white-space: nowrap;
		align-items: center;
	}

	lang-change button.selected {
		font-variation-settings: 'wght' 700;
	}

	lang-change separator {
		margin: 0 0.25rem;
	}

	:global(html[screen-size='big']) {
		nav-links {
			transform: translateY(0) translateX(0);
		}
	}

	:global(html[screen-size='medium']) {
		nav-links {
			grid-template-columns: repeat(5, 1fr);
			transform: translateY(0) translateX(0);
		}

		lang-change {
			flex-direction: row;
			grid-column: 1 / -1;
			justify-content: center;
		}
	}

	:global(html[screen-size='small']) {
		navigation-svlt {
			justify-content: space-between;
			padding-right: 4rem;
		}

		navigation-svlt lang-change {
			margin: 0 auto;
		}

		nav-links {
			grid-template-columns: repeat(2, 1fr);
			position: absolute;
			display: flex;
			flex-direction: column;
			background-color: rgba(0, 0, 0, 0.85);
			transform: translateY(77px) translateX(110%);
			top: 0;
			right: 0;
			padding: 1rem;

			transition: transform 300ms ease-out;

			position: fixed;
			top: 0;
			right: 0;
		}

		nav-links[data-isActive='true'] {
			transform: translateY(77px) translateX(0);
		}

		lang-change {
			margin: 0;
		}
	}
</style>
