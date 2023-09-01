<script lang="ts">
	import { jahminSectionFontWeight, windowScrollStoppedStore, windowScrollValueStore } from '../store'
	import calculateFontWeightFn from '../functions/calculateFontWeight.fn'
	import fontWeightMaxTreshold from '../constants/fontWeightMaxTreshold.const'
	import fontWeightMinTresholdConst from '../constants/fontWeightMinTreshold.const'
	import scrollToElementFn from '../functions/scrollToElement.fn'

	let selfElement: HTMLElement = undefined

	$: if (selfElement) {
		$windowScrollValueStore
		$jahminSectionFontWeight = calculateFontWeightFn(selfElement)
	}

	$: if ($windowScrollStoppedStore === true) {
		if ($jahminSectionFontWeight <= fontWeightMaxTreshold && $jahminSectionFontWeight >= fontWeightMinTresholdConst) {
			scrollToElementFn('#jahmin-section')
		}
	}
</script>

<section-svlt id="jahmin-section" bind:this={selfElement}>
	<section-header>
		<img-container><img src="./img/jahmin_logo.svg" alt="" /></img-container>

		<a href="https://github.com/PacoGim/Jahmin" target="_blank">
			<h1>Jahmin</h1>
			<svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="28" fill="currentColor">
				<path
					d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
				/>
			</svg>
		</a>
	</section-header>
	<p>
		Jahmin, my pride and joy, I have been working on this app for some years now. A cross platform Music player based on
		ElectronJS and Svelte, capable of handling thousands of songs while the app is being used thanks to the use of Web Workers.
	</p>

	<p>A massive codebase that can handle:</p>
	<ul>
		<li>Song metadata updating</li>
		<li>Lyrics</li>
		<li>Configurations</li>
		<li>Dynamic colors based on album arts</li>
		<li>Customizable art grid</li>
		<li>A beautiful song list</li>
		<li>Album art optimization</li>
		<li>Song rating</li>
		<li>Animated album arts</li>
		<li>And much, much more</li>
	</ul>
</section-svlt>

<style>
	section-svlt {
		display: flex;
		flex-direction: column;
		padding-top: 5rem;
		align-items: center;
	}

	section-header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img-container {
		display: block;
		width: 200px;
		height: 200px;
		border-radius: 100vmax;
		border: 5px solid #fff;

		box-shadow: 0 0 0px 0px #fff;
	}

	img {
		padding-top: 1rem;
		width: 100%;
		height: 100%;
		border-radius: 100vmax;
	}

	p {
		max-width: 600px;
		padding: 1rem;
	}

	a {
		display: flex;
		color: #fff;
		text-decoration: none;
		align-items: center;
	}

	a svg {
		margin-left: 0.5rem;
	}
</style>
