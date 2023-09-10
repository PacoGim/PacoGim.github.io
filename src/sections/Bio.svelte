<script lang="ts">
	function calculateYears() {
		const dateNow = new Date()
		const dateDegree = new Date(2017, 6, 29)
		const diff = dateNow.getTime() - dateDegree.getTime()
		const years = diff / (1000 * 60 * 60 * 24 * 365.25)
		return Math.floor(years)
	}
</script>

<section-svlt id="bio-section">
	<h1>Hello!,</h1>
	<h2>I’m pleased to see that I may have peaked your interest and for that I’m already glad.</h2>
	<br />
	<p>
		Born in France in 1992, I quickly learned to use computers. High School bored me to death so I finished all the mandatory
		studies, moved to Spain then jumped right away in Programming studies.
	</p>
	<br />
	<p>I managed to surpass my expectations and ended up with the best grades while also helping my other classmates.</p>
	<br />
	<p>
		For my last year of schooling, I managed to get a place at the multinational INDRA as an intern but more about that in the
		Experience section.
	</p>
	<br />
	<p>Now I'm a full stack engineer with {calculateYears()} years of experience and I’m back in France looking for a job.</p>
	<br />
	<p>I’m cheerful, kindhearted, lifelong learner, perfectionist and magnanimous.</p>
</section-svlt>

<style lang="scss">
	section-svlt {
		display: block;
		padding: 5rem;
		max-width: 800px;
		margin: 0 auto;

		border-radius: 20px;

		backdrop-filter: blur(5px);
		background-color: rgba(0, 0, 0, 0.25);
	}

	p {
		font-size: 1.1rem;
	}

	:global(html[screen-size='small']) {
		section-svlt{
      border-radius: 0;
    }
	}
</style>
