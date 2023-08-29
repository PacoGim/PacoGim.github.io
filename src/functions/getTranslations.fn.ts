const full = {
	'Software Engineer': {
		fr: 'Ingénieur Logiciel'
	},
	Home: {
		fr: 'Acceuil'
	},
	Project: {
		fr: 'Projet'
	},
	Skills: {
		fr: 'Compétences'
	},
	About: {
		fr: 'À Propos'
	},
	'How do I work?': {
		fr: 'Comment je travail?'
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
