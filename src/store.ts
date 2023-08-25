import { writable, type Writable } from 'svelte/store'

export let windowScrollValueStore: Writable<number> = writable(0)

export let projectsSectionFontWeight: Writable<number> = writable(400)
export let homeSectionFontWeight: Writable<number> = writable(400)
export let bioSectionFontWeight: Writable<number> = writable(400)
export let skillsSectionFontWeight: Writable<number> = writable(400)
export let aboutSectionFontWeight: Writable<number> = writable(400)
