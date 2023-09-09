<script lang="ts">
	import GoldText from './components/goldText.comp.svelte'
	import { langStore } from './store'
</script>

<navigation-svlt>
	<GoldText text="Paco Gimeno" style="font-size: 2.5rem;" />
	<nav-links>
		<a href="/">Home</a>
		<a href="/">Bio</a>
		<a href="/">Projects</a>
		<a href="/">Skills</a>
		<a href="/">Experience</a>
		<a href="/">Education</a>
	</nav-links>
	<lang-change>
		<button class="nostyle" on:click={() => ($langStore = 'en')}>English</button>
		|
		<button class="nostyle" on:click={() => ($langStore = 'fr')}>Français</button>
	</lang-change>
</navigation-svlt>

<style>
	navigation-svlt {
		display: flex;
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.5);
		align-items: center;
	}

	nav-links {
		margin-left: auto;
	}

	a {
		text-decoration: none;
		color: inherit;
		margin: 0 0.5rem;
	}

	lang-change {
		margin-left: 2rem;
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
	}

	:global(html[screen-size='small'] navigation-svlt) {
		display: grid;
		grid-template-areas:
			'home-button bio-button'
			'projects-button skills-button'
			'experience-button education-button'
			'separator separator'
			'lang-eng lang-fr';
		column-gap: 1rem;
		width: 100%;
	} */
</style>
