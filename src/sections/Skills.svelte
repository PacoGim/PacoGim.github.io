<script lang="ts"></script>

<section-svlt id="skills-section">
	<h1>Skills</h1>
	<h3>Web</h3>
	<br />
	<div class="skills-container">
		<span class="skill-pill">Svelte</span>
		<span class="skill-pill">TypeScript</span>
		<span class="skill-pill">Node.js</span>
		<span class="skill-pill">Electron</span>
	</div>
	<br />
	<h3>Low Level / Unix</h3>
	<div class="skills-container">
		<span class="skill-pill">C</span>
		<span class="skill-pill">Unix</span>
		<span class="skill-pill">Docker</span>
		<span class="skill-pill">SQL</span>
		<span class="skill-pill">Git</span>
		<span class="skill-pill">REST APIs</span>
	</div>
	<br />
	<h3>Tools</h3>
	<div class="skills-container">
		<span class="skill-pill">Docker</span>
		<span class="skill-pill">SQL</span>
		<span class="skill-pill">Git</span>
		<span class="skill-pill">REST APIs</span>
	</div>
</section-svlt>

<style lang="scss">
	h1 {
		text-align: center;
	}

	li {
		list-style: none;
		text-align: center;
	}

	.skills-container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-top: 10px;
	}

	.skill-pill {
		display: inline-block;
		padding: 6px 12px;
		background-color: #f0f0f0;
		color: #333;
		border-radius: 999px;
		font-size: 14px;
		font-weight: 500;
		transition: all 0.2s;
		cursor: default;
	}

	.skill-pill:hover {
		background-color: #0070f3;
		color: white;
	}
</style>
