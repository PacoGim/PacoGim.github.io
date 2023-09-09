<script lang="ts">
	import MailIcon from '../icons/MailIcon.svelte'

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
</script>

<section-svlt id="home-section">
	<description-container>
		<h1>Hi, I am Paco Gimeno a Fullstack Engineer based in Paris.</h1>
		<h2>I make ideas become a reality from start to deployement</h2>

		<email-container>
			<a class="email" href="mailto:PacoGimDev@gmail.com"
				><MailIcon style="fill: #fff;margin-right: .5rem;" /> PacoGimDev@gmail.com</a
			>

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

<style>
	section-svlt {
		display: grid;
		margin: 0 auto;
		max-width: 1000px;
		grid-template-columns: 400px auto;
		padding: 4rem;
	}

	description-container {
		/* width: 400px; */
	}

	description-container h1 {
		font-variation-settings: 'wght' 700;
		margin-bottom: 1.5rem;
		font-size: 2rem;
	}

	description-container h2 {
		font-size: 1.25rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	email-container {
		display: flex;
		align-items: center;
	}

	a.email {
		display: flex;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.1);
		color: inherit;
		padding: 0.5rem 1rem;
		text-decoration: none;
		margin-right: 1rem;
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

		box-shadow: 0px 0px 25px 0px rgba(255, 255, 255, 0.5); /* x | y | blur | spread | color */
	}

	photo-container img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: 100vmax;
	}
</style>
