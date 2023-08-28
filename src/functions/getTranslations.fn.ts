const full = {
	'Software Engineer': {
		fr: 'Ingénieur Logiciel'
	}
}

export default function (key: string, lang: 'en' | 'fr'): string {
	if (lang === 'en') {
		return key
	} else {
		return full?.[key]?.[lang]
	}
}
