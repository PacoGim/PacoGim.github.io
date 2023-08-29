<script lang="ts">
	import getTranslationsFn from './functions/getTranslations.fn'
	import scrollToElementFn from './functions/scrollToElement.fn'
	import {
		aboutSectionFontWeight,
		bioSectionFontWeight,
		homeSectionFontWeight,
		jahminSectionFontWeight,
		langStore,
		howSectionFontWeight
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
	<!-- <button
		class="nostyle"
		style="font-variation-settings: 'wght' {$projectsSectionFontWeight};"
		on:click={() => scrollToSection('projects-section')}
	>
		{getTranslationsFn('Projects', $langStore)}
	</button> -->
	<button
	class="nostyle"
	style="font-variation-settings: 'wght' {$jahminSectionFontWeight};"
	on:click={() => scrollToSection('jahmin-section')}
	>
	{getTranslationsFn('Project', $langStore)}
	<br>
	Jahmin
	</button>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$bioSectionFontWeight};"
		on:click={() => scrollToSection('bio-section')}>Bio</button
	>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$howSectionFontWeight};"
		on:click={() => scrollToSection('how-section')}
	>
		{getTranslationsFn('How do I work?', $langStore)}
	</button>
	<button
		class="nostyle"
		style="font-variation-settings: 'wght' {$aboutSectionFontWeight};"
		on:click={() => scrollToSection('about-section')}
	>
		{getTranslationsFn('About', $langStore)}
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
		margin: 0.5rem 0;
	}

	button.langButton {
		font-size: 1rem;

		transition: font-variation-settings 300ms ease-in-out;
	}

	button.langButton.selected {
		font-variation-settings: 'wght' 600;
	}
</style>
