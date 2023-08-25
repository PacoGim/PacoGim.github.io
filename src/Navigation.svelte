<script lang="ts">
	import scrollToElementFn from './functions/scrollToElement.fn'
	import {
		aboutSectionFontWeight,
		bioSectionFontWeight,
		homeSectionFontWeight,
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
</navigation-svlt>

<style>
	navigation-svlt {
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 1rem;
		left: 1rem;
		font-size: 1.75rem;
	}
</style>
