<script lang="ts">
	import scrollToElementFn from './functions/scrollToElement.fn'
	import {
		aboutSectionFontWeight,
		bioSectionFontWeight,
		homeSectionFontWeight,
		langStore,
		projectsSectionFontWeight,
		skillsSectionFontWeight
	} from './store'
</script>

<navigation-svlt>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$homeSectionFontWeight};"
		on:click={() => scrollToElementFn('#home-section')}
	>
		Home
	</button>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$projectsSectionFontWeight};"
		on:click={() => scrollToElementFn('#projects-section')}
	>
		Projects
	</button>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$bioSectionFontWeight};"
		on:click={() => scrollToElementFn('#bio-section')}>Bio</button
	>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$skillsSectionFontWeight};"
		on:click={() => scrollToElementFn('#skills-section')}
	>
		Skills
	</button>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$aboutSectionFontWeight};"
		on:click={() => scrollToElementFn('#about-section')}
	>
		About
	</button>

	<separator />

	<button class="nostyle langButton" class:selected={$langStore === 'en'} on:click={() => ($langStore = 'en')}>
		English
	</button>

	<button class="nostyle langButton" class:selected={$langStore === 'fr'} on:click={() => ($langStore = 'fr')}>
		Français
	</button>
</navigation-svlt>

<style>
	navigation-svlt {
		display: flex;
		flex-direction: column;
		position: fixed;
		justify-content: center;
		align-items: center;
		top: 1rem;
		left: 1rem;
		font-size: 1.75rem;
	}

	separator {
		display: block;
		background-color: #fff;
		width: 100%;
		height: 2px;
	}

	button.langButton {
		font-size: 1rem;

		transition: font-variation-settings 300ms ease-in-out;
	}

	button.langButton.selected {
		font-variation-settings: 'wght' 600;
	}
</style>
