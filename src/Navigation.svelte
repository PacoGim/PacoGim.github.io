<script lang="ts">
	import getTranslationsFn from './functions/getTranslations.fn'
	import scrollToElementFn from './functions/scrollToElement.fn'
	import {
		bioSectionFontWeight,
		homeSectionFontWeight,
		jahminSectionFontWeight,
		langStore,
		educationSectionFontWeight,
		skillsSectionFontWeight,
		experienceSectionFontWeight
	} from './store'

	function scrollToSection(sectionId: string) {
		scrollToElementFn(`#${sectionId}`)
	}
</script>

<navigation-svlt>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$homeSectionFontWeight};"
		on:click={() => scrollToSection('home-section')}
	>
		{getTranslationsFn('Home', $langStore)}
	</button>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$bioSectionFontWeight};"
		on:click={() => scrollToSection('bio-section')}
	>
		{getTranslationsFn('Bio', $langStore)}
	</button>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$jahminSectionFontWeight};"
		on:click={() => scrollToSection('jahmin-section')}
	>
		{getTranslationsFn('Project', $langStore)}
		<br />
		Jahmin
	</button>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$skillsSectionFontWeight};"
		on:click={() => scrollToSection('skills-section')}>{getTranslationsFn('Skills', $langStore)}</button
	>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$experienceSectionFontWeight};"
		on:click={() => scrollToSection('experience-section')}
	>
		{getTranslationsFn('Experience', $langStore)}
	</button>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$educationSectionFontWeight};"
		on:click={() => scrollToSection('education-section')}
	>
		{getTranslationsFn('Education', $langStore)}
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
		width: 200px;
	}

	separator {
		display: block;
		background-color: #fff;
		width: 100%;
		height: 2px;
		margin: 0.5rem 0;
	}

	button{
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
