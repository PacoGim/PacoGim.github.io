<script lang="ts">
	import getTranslationsFn from '../functions/getTranslations.fn'
	import { langStore } from '../store'

	let hqImageLoaded = false
</script>

<section-svlt id="projects-section">
	<project-logo>
		<img src="./img/jahmin_logo.svg" alt="" />
	</project-logo>
	<a href="https://github.com/PacoGim/Jahmin" target="_blank">Jahmin <img src="./img/github_logo.svg" alt="" /></a>
	<project-container>
		<project-image>
			<img
				style="display: {hqImageLoaded === false ? 'initial' : 'none'};"
				src="./img/jahmin_screenshot_lq.webp"
				alt=""
			/>

			<img
				style="display: {hqImageLoaded === true ? 'initial' : 'none'};"
				src="./img/jahmin_screenshot.webp"
				alt=""
				on:load={() => (hqImageLoaded = true)}
			/>
		</project-image>

		<project-description>
			<h2>{getTranslationsFn('My beloved long term project', $langStore)}</h2>
			<p>
				{getTranslationsFn(
					'Jahmin is my main project, which I have been passionately and independently working on full time for the past 3 years.',
					$langStore
				)}
			</p>
			<br />
			<p>{getTranslationsFn("It's a working local music library app capable of handling 70k+ songs.", $langStore)}</p>
			<br />
			<p>{getTranslationsFn('Click on the Github logo above if you want to know more!', $langStore)}</p>
			<br />
			<h3>
				{getTranslationsFn(
					'I have many other projects in my computer... But they are mostly script that can perform complicated tasks and they are more personal stuff than ready to release.',
					$langStore
				)}
			</h3>
		</project-description>
	</project-container>
</section-svlt>

<style lang="scss">
	section-svlt {
		margin-top: 5rem;
		display: flex;
		width: 100%;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding: 5rem;
	}

	a {
		font-size: 2rem;
		font-variation-settings: 'wght' 700;
		color: #fff;
		text-decoration: none;
		display: flex;
		align-items: center;
	}

	a img {
		height: 1.5rem;
		margin-left: 0.25rem;
	}

	project-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	project-logo {
		display: block;
		width: 150px;
		height: 150px;
		border-radius: 100vmax;
		border: 4px solid #fff;
		background-color: rgba(255, 255, 255, 0.1);
	}

	project-logo img {
		height: 100%;
		width: 100%;
		padding-top: 1rem;
	}

	project-image {
		display: block;
		height: calc(100vh - 200px);
	}

	h2 {
		text-align: center;
		margin-bottom: 1rem;
		font-variation-settings: 'wght' 600;
	}

	project-image img {
		width: 100%;
		height: 100%;
	}

	project-description {
		padding: 5rem;
		width: 600px;
		border-radius: 20px;

		backdrop-filter: blur(5px);

		background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));
	}

	:global(html[screen-size='medium']),
	:global(html[screen-size='small']) {
		project-image {
			height: initial;
		}
	}

	:global(html[screen-size='small']) {
		section-svlt {
			padding: 0;
		}

		project-description {
			width: 100%;
			border-radius: 0;
		}
	}
</style>
