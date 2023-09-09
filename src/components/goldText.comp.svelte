<script lang="ts">
	export let text = ''
	export let style = ''
</script>

<div class="gold-container" {style}>
	<div class="gold-text highlight" data-text={text}>{text}</div>
</div>

<style>
	.gold-container {
		position: relative;
		display: flex;
		align-items: center;
		font-family: Belovedays;
	}

	.gold-text {
		max-height: 45px;
		display: inline-block;
		color: transparent;
		background-color: #e8a95b;
		background-image: radial-gradient(
				ellipse farthest-corner at right bottom,
				#efe1d2 0%,
				#f0bb7a 20%,
				#e8a95b 60%,
				transparent 80%
			),
			radial-gradient(ellipse farthest-corner at left top, #efe1d2 0%, #f0bb7a 50%, #de9945 75%, #e8a95b 100%);
		background-size: 100% 100%;
		background-clip: text;
		-webkit-background-clip: text;
	}

	.highlight {
		display: inline-block;
		position: relative;
		z-index: 1;
	}

	.highlight:after {
		content: attr(data-text);
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 5;
		background-image: linear-gradient(
			100deg,
			transparent 0%,
			transparent 6rem,
			#efe1d2 11rem,
			transparent 11.15rem,
			transparent 15rem,
			rgba(255, 255, 255, 0.3) 20rem,
			transparent 25rem,
			transparent 27rem,
			rgba(255, 255, 255, 0.6) 32rem,
			#efe1d2 33rem,
			rgba(255, 255, 255, 0.3) 33.15rem,
			transparent 38rem,
			transparent 40rem,
			rgba(255, 255, 255, 0.3) 45rem,
			transparent 50rem,
			transparent 100%
		);
		background-clip: text;
		background-size: 60rem 100%;
		background-repeat: no-repeat;
		-webkit-background-clip: text;
		-webkit-animation-name: shine;
		animation-name: shine;
		-webkit-animation-direction: alternate;
		animation-direction: alternate;
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
		-webkit-animation-duration: 4s;
		animation-duration: 4s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		-webkit-animation-timing-function: linear;
		animation-timing-function: linear;
	}

	.highlight:before {
		content: attr(data-text);
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		color: transparent;
		background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, transparent 35%, transparent 75%, #de9945 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-animation-name: flash;
		animation-name: flash;
		-webkit-animation-direction: alternate;
		animation-direction: alternate;
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
		-webkit-animation-duration: 4s;
		animation-duration: 4s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		-webkit-animation-timing-function: linear;
		animation-timing-function: linear;
	}
/*
	@-webkit-keyframes shine {
		0% {
			background-position: -50rem 0;
		}
		25% {
			background-position: -50rem 0;
		}
		100% {
			background-position: 30rem 0;
		}
	}
	@keyframes shine {
		0% {
			background-position: -50rem 0;
		}
		25% {
			background-position: -50rem 0;
		}
		100% {
			background-position: 30rem 0;
		}
	}
	@-webkit-keyframes flash {
		0% {
			opacity: 1;
		}
		10% {
			opacity: 0;
		}
		30% {
			opacity: 0;
		}
		40% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		90% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes flash {
		0% {
			opacity: 1;
		}
		10% {
			opacity: 0;
		}
		30% {
			opacity: 0;
		}
		40% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		90% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	} */
</style>
