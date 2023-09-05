<script lang="ts">
	import getTranslationsFn from './functions/getTranslations.fn'
	import scrollToElementFn from './functions/scrollToElement.fn'
	import {
		bioSectionFontWeight,
		homeSectionFontWeight,
		langStore,
		educationSectionFontWeight,
		skillsSectionFontWeight,
		experienceSectionFontWeight,
		projectsSectionFontWeight
	} from './store'

	function scrollToSection(sectionId: string) {
		scrollToElementFn(`#${sectionId}`)
	}
</script>

<navigation-svlt>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$homeSectionFontWeight}; grid-area:home-button"
		on:click={() => scrollToSection('home-section')}
	>
		{getTranslationsFn('Home', $langStore)}
	</button>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$bioSectionFontWeight};grid-area:bio-button"
		on:click={() => scrollToSection('bio-section')}
	>
		{getTranslationsFn('Bio', $langStore)}
	</button>

	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$projectsSectionFontWeight};grid-area:projects-button"
		on:click={() => scrollToSection('projects-section')}
	>
		{getTranslationsFn('Projects', $langStore)}
	</button>

	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$skillsSectionFontWeight};grid-area:skills-button"
		on:click={() => scrollToSection('skills-section')}>{getTranslationsFn('Skills', $langStore)}</button
	>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$experienceSectionFontWeight};grid-area:experience-button"
		on:click={() => scrollToSection('experience-section')}
	>
		{getTranslationsFn('Experience', $langStore)}
	</button>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$educationSectionFontWeight};grid-area:education-button"
		on:click={() => scrollToSection('education-section')}
	>
		{getTranslationsFn('Education', $langStore)}
	</button>

	<separator style="grid-area:separator" />

	<button
		class="nostyle langButton"
		style="grid-area:lang-eng"
		class:selected={$langStore === 'en'}
		on:click={() => ($langStore = 'en')}
	>
		English
	</button>

	<button
		class="nostyle langButton"
		style="grid-area:lang-fr"
		class:selected={$langStore === 'fr'}
		on:click={() => ($langStore = 'fr')}
	>
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
	}

	separator {
		display: block;
		background-color: #fff;
		width: 100%;
		height: 2px;
		margin: 0.5rem 0;
	}

	button {
		margin-bottom: 0.5rem;
	}

	button.langButton {
		font-size: 1rem;

		transition: font-variation-settings 300ms ease-in-out;
	}

	button.langButton.selected {
		font-variation-settings: 'wght' 800;
	}
</style>
