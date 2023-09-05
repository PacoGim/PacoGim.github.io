let htmlElement = selectHTMLElement()

export default function () {
	let smallScreenMQ = window.matchMedia('only screen and (min-width: 360px) and (max-width: 640px')

	smallScreenMQ.addEventListener('change', evt => {
		if (evt.matches === true) {
			htmlElement.setAttribute('screen-size', 'small')
		}
	})

	let mediumScreenMQ = window.matchMedia('only screen and (min-width: 641px) and (max-width: 1007px)')

	mediumScreenMQ.addEventListener('change', evt => {
		if (evt.matches === true) {
			htmlElement.setAttribute('screen-size', 'medium')
		}
	})

	let bigScreenMQ = window.matchMedia('only screen and (min-width: 1008px)')

	bigScreenMQ.addEventListener('change', evt => {
		if (evt.matches === true) {
			htmlElement.setAttribute('screen-size', 'big')
		}
	})

	if (smallScreenMQ.matches) {
		htmlElement.setAttribute('screen-size', 'small')
	} else if (mediumScreenMQ.matches) {
		htmlElement.setAttribute('screen-size', 'medium')
	} else if (bigScreenMQ.matches) {
		htmlElement.setAttribute('screen-size', 'big')
	}
}

function selectHTMLElement() {
	return document.querySelector('html')
}
