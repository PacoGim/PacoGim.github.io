import { currentScreenSize } from '../store'

let htmlElement = selectHTMLElement()

export default function () {
	let smallScreenMQ = window.matchMedia('only screen and (min-width: 360px) and (max-width: 640px')

	smallScreenMQ.addEventListener('change', evt => {
		if (evt.matches === true) {
			setHTMLAttribute('small')
		}
	})

	let mediumScreenMQ = window.matchMedia('only screen and (min-width: 641px) and (max-width: 1007px)')

	mediumScreenMQ.addEventListener('change', evt => {
		if (evt.matches === true) {
			setHTMLAttribute('medium')
		}
	})

	let bigScreenMQ = window.matchMedia('only screen and (min-width: 1008px)')

	bigScreenMQ.addEventListener('change', evt => {
		if (evt.matches === true) {
			setHTMLAttribute('big')
		}
	})

	if (smallScreenMQ.matches) {
		setHTMLAttribute('small')
	} else if (mediumScreenMQ.matches) {
		setHTMLAttribute('medium')
	} else if (bigScreenMQ.matches) {
		setHTMLAttribute('big')
	}
}

function setHTMLAttribute(size: 'small' | 'medium' | 'big') {
	htmlElement.setAttribute('screen-size', size)
	currentScreenSize.set(size)
}

function selectHTMLElement() {
	return document.querySelector('html')
}
