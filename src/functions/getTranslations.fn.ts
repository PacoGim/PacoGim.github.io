const full = {
	'Full Stack Engineer': {
		fr: 'Développeur Full Stack'
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
	Experience: {
		fr: 'Expérience'
	},
	'Education': {
		fr: 'Éducation'
	},
	'Bio': {
		fr: 'Bio'
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
