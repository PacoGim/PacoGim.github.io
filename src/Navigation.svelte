<script lang="ts">
	import GoldText from './components/goldText.comp.svelte'
	import { currentScreenSize, langStore } from './store'
</script>

<navigation-svlt>
	<GoldText
		text={$currentScreenSize === 'small' ? 'PG' : 'Paco Gimeno'}
		style="font-size: 2.5rem;margin-right:1rem;white-space: nowrap;"
	/>
	<nav-links>
		<a href="/">Home</a>
		<a href="/">Bio</a>
		<a href="/">Projects</a>
		<a href="/">Skills</a>
		<a href="/">Experience</a>
		<a href="/">Education</a>
	</nav-links>
	<lang-change>
		<button class="nostyle" class:selected={$langStore === 'en'} on:click={() => ($langStore = 'en')}>English</button>
		<separator>|</separator>
		<button class="nostyle" class:selected={$langStore === 'fr'} on:click={() => ($langStore = 'fr')}>Français</button>
	</lang-change>
</navigation-svlt>

<style lang="scss">
	navigation-svlt {
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
	}

	lang-change button.selected {
		font-variation-settings: 'wght' 700;
	}

	lang-change separator {
		margin: 0 0.25rem;
	}

	/* navigation-svlt {
		display: flex;
		flex-direction: column;
		position: fixed;
		justify-content: center;
		align-items: center;
		top: 1rem;
		left: 1rem;
		font-size: 1.75rem;
		width: 200px;

		z-index: 1;
	}*/

	:global(html[screen-size='medium']) {
		nav-links {
			grid-template-columns: repeat(3, 1fr);
		}

		lang-change {
			flex-direction: column;
		}

		lang-change separator {
			display: none;
		}
	}

	:global(html[screen-size='small']) {
		nav-links {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
