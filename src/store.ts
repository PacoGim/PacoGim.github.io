import { writable, type Writable } from 'svelte/store'

export let windowScrollValueStore: Writable<number> = writable(0)
export let windowScrollStoppedStore: Writable<boolean> = writable(true)

export let skillsSectionFontWeight: Writable<number> = writable(400)
export let homeSectionFontWeight: Writable<number> = writable(400)
export let experienceSectionFontWeight: Writable<number> = writable(400)
export let educationSectionFontWeight: Writable<number> = writable(400)
export let bioSectionFontWeight: Writable<number> = writable(400)
export let jahminSectionFontWeight: Writable<number> = writable(400)

export let langStore: Writable<'en' | 'fr'> = writable((localStorage.getItem('lang') as 'en' | 'fr') || 'en')

langStore.subscribe(value => {
	localStorage.setItem('lang', value)
})
