<script lang="ts">
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import getTranslationsFn from '../functions/getTranslations.fn'
	import scrollToElementFn from '../functions/scrollToElement.fn'
	import { homeSectionFontWeight, langStore, windowScrollStoppedStore, windowScrollValueStore } from '../store'

	$: if (selfElement) {
		$windowScrollValueStore
		$homeSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($homeSectionFontWeight <= fontWeightMaxTreshold && $homeSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#home-section')
		}
	}

	let selfElement: HTMLElement = undefined
</script>

<section-svlt id="home-section" bind:this={selfElement}>
	<p class="name">Paco Gimeno</p>
	<separator />
	<p>{getTranslationsFn('Software Engineer', $langStore)}</p>
</section-svlt>

<style>
	section-svlt {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		font-size: 3rem;
	}

	p.name {
		font-variation-settings: 'wght' 600;
	}

	separator {
		display: block;
		background-color: #fff;
		height: 2px;
		width: 50%;
	}
</style>
