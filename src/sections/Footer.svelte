<script lang="ts">
	import GoldText from '../components/goldText.comp.svelte'
</script>

<section-svlt id="footer-section">
	<my-logo>
		<GoldText text="PG" style="font-size: 2rem;max-height: 36px;" />
	</my-logo>

		<span> Designed by Paco Gimeno</span>
	<contact>
		<a href="https://github.com/PacoGim" target="_blank"><img src="./img/github_logo.svg" alt="" /></a>
		<a href="https://www.linkedin.com/in/paco-gimeno-958a53283/" target="_blank"><img src="./img/linkedin_logo.svg" alt="" /></a
		>
	</contact>
</section-svlt>

<style lang="scss">
	section-svlt {
		height: 60px;
		font-size: 1rem;
		display: flex;

		justify-content: space-between;
		align-items: center;
		margin-top: 10rem;
		padding: 0.5rem 1rem;

		background-color: rgba(0, 0, 0, 0.9);
	}

	contact img {
		height: 2rem;
	}

	contact a:first-of-type {
		margin-right: 0.5rem;
	}

	:global(html[screen-size='small']){

		my-logo{
			display: none;
		}
	}
</style>
