<script lang="ts">
	import MailIcon from '../icons/MailIcon.svelte'
	import { currentScreenSize } from '../store'



	let copyNotificationElement: HTMLElement = undefined

	let timeoutDebounce = undefined

	function copyEmailToClipboard() {
		navigator.clipboard.writeText('PacoGimDev@gmail.com').then(() => {
			copyNotificationElement.style.transform = 'translateY(-30px)'

			clearTimeout(timeoutDebounce)

			timeoutDebounce = setTimeout(() => {
				copyNotificationElement.style.transform = 'translateY(0px)'
			}, 2000)
		})
	}

	function selectText(evt: MouseEvent) {
		let target = evt.currentTarget as HTMLElement
		let inputElement = target as HTMLInputElement

		if (target.tagName !== 'input') {
			inputElement = target.querySelector('input')
		}

		inputElement.select()
	}
</script>

<section-svlt id="home-section">
	<description-container>
		<h1>Hi, I am Paco Gimeno a Fullstack Engineer based in Paris.</h1>
		<h2>I make ideas become a reality from start to deployement</h2>

		<email-container>
			{#if $currentScreenSize !== 'small'}
				<a class="email" href="mailto:PacoGimDev@gmail.com"
					><MailIcon style="fill: #fff;margin-right: .5rem;" /> PacoGimDev@gmail.com</a
				>
			{:else}
				<button class="nostyle email" on:click={selectText}
					><MailIcon style="fill: #fff;margin-right: .5rem;" /> <input value="PacoGimDev@gmail.com" readonly /></button
				>
			{/if}

			<copy-email-container>
				<button on:click={copyEmailToClipboard} class="nostyle">Copy to clipboard</button>
				<copy-notification bind:this={copyNotificationElement}>Copied!</copy-notification>
			</copy-email-container>
		</email-container>
	</description-container>

	<photo-container>
		<img src="./img/my_face.jpg" alt="" />
	</photo-container>
</section-svlt>

<style lang="scss">
	section-svlt {
		display: flex;

		margin: 0 auto;
		max-width: 1000px;
		// grid-template-columns: 400px auto;
		padding: 4rem;
	}

	description-container {
		width: 400px;
	}

	description-container h1 {
		font-variation-settings: 'wght' 700;
		margin-bottom: 1.5rem;
	}

	description-container h2 {
		margin-bottom: 1.5rem;
		text-align: center;
	}

	email-container {
		display: flex;
		align-items: center;
	}

	button.email,
	a.email {
		display: flex;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.1);
		color: inherit;
		padding: 0.5rem 1rem;
		text-decoration: none;
	}

	a.email {
		margin-right: 1rem;
	}

	button input {
		background-color: transparent;
		color: inherit;
		font-family: inherit;
		border: none;
		font-size: inherit;
	}

	copy-email-container {
		display: inline-grid;
		height: max-content;
		justify-items: center;
	}

	copy-email-container button {
		grid-area: 1/1;

		font-size: 0.8rem;
		font-variation-settings: 'wght' 600;
		background: linear-gradient(to bottom right, #c961de, #2954a3);
		padding: 0.25rem 0.5rem;
		border-radius: 100vmax;
		cursor: pointer;
		z-index: 2;
	}

	copy-email-container copy-notification {
		z-index: 1;
		grid-area: 1/1;

		padding: 0.25rem 0.5rem;
		font-size: 0.8rem;
		font-variation-settings: 'wght' 600;

		height: max-content;
		width: max-content;
		color: #232323;
		background-color: #ececec;

		border-radius: 100vmax;
		transform: translateY(0px);

		transition: transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	photo-container {
		width: 100%;
		display: flex;
		place-self: center;
		height: 300px;
		width: 300px;
		border-radius: 100vmax;
		border: 4px solid #fff;

		margin: 0 auto;

		box-shadow: 0px 0px 50px 10px #2954a3; /* x | y | blur | spread | color */
	}

	photo-container img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: 100vmax;
	}

	:global(html[screen-size='medium']),
	:global(html[screen-size='small']) {
		section-svlt {
			flex-direction: column-reverse;
			align-items: center;
		}

		photo-container {
			margin-bottom: 1.5rem;
		}
	}

	:global(html[screen-size='small']) {
		section-svlt {
			padding: 5rem 1rem;
			text-align: center;
			word-wrap: break-word;
		}

		description-container {
			width: 100%;
		}

		copy-email-container {
			display: none;
		}

		email-container {
			justify-content: center;
		}

		email-container a {
			margin-right: 0;
		}

		photo-container {
			width: 200px;
			height: 200px;
		}
	}
</style>
