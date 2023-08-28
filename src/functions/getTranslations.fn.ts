const full = {
	'Software Engineer': {
		fr: 'Ingénieur Logiciel'
	},
	Home: {
		fr: 'Acceuil'
	},
	Projects: {
		fr: 'Projets'
	},
	Skills: {
		fr: 'Compétences'
	},
	About: {
		fr: 'À Propos'
	}
}

export default function (key: string, lang: 'en' | 'fr'): string {
	if (lang === 'en') {
		return key
	} else {
		if (full?.[key]?.[lang] === undefined) {
			console.log('Missing tranlation for: ', key, ' in ', lang, ' lang')
			return 'null'
		} else {
			return full?.[key]?.[lang]
		}
	}
}
