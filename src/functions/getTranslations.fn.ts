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
	Education: {
		fr: 'Éducation'
	},
	Bio: {
		fr: 'Bio'
	},
	'Jahmin is my main project, which I have been passionately and independently working on full time for the past 3 years.': {
		fr: 'Jahmin est mon projet principal sur lequel je travaille avec passion et indépendance à plein temps depuis les 3 dernières années.'
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
