import { writable, type Writable } from 'svelte/store'

export let currentScreenSize: Writable<'small' | 'medium' | 'big'> = writable('big')

export let langStore: Writable<'en' | 'fr'> = writable((localStorage.getItem('lang') as 'en' | 'fr') || getUserLanguage())

langStore.subscribe(value => {
	localStorage.setItem('lang', value)
})

function getUserLanguage(): 'en' | 'fr' {
	let lang = navigator.language

	if (lang.indexOf('fr') !== -1) {
		return 'fr'
	} else {
		return 'en'
	}
}
