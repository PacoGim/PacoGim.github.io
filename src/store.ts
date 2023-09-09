import { writable, type Writable } from 'svelte/store'

export let currentScreenSize: Writable<'small' | 'medium' | 'big'> = writable('big')

export let langStore: Writable<'en' | 'fr'> = writable((localStorage.getItem('lang') as 'en' | 'fr') || 'en')

langStore.subscribe(value => {
	localStorage.setItem('lang', value)
})
