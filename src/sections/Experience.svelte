<script lang="ts">
	import getTranslationsFn from '../functions/getTranslations.fn'
	import { langStore } from '../store'
</script>

<section-svlt id="experience-section">
	<h1>{getTranslationsFn('Experience', $langStore)}</h1>
	<br />
	<p>
		{getTranslationsFn(
			'I combine low-level systems programming with full-stack development. Early in my career, I interned at INDRA working on banking systems running on COBOL mainframes, where I learned discipline, precision, and working in high-stakes environments.',
			$langStore
		)}
	</p>
	<br />
	<p>
		{getTranslationsFn(
			'I then joined 42 Paris, a highly selective, project-based software engineering school focused on autonomy and peer-driven learning. There, I built projects ranging from low-level C libraries and Unix shells to multithreaded programs, raycasting engines, Dockerized infrastructures, and full-stack web applications.',
			$langStore
		)}
	</p>
</section-svlt>

<style lang="scss">

</style>
