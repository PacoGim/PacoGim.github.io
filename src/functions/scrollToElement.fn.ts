export default function (query: string) {
	let element = document.querySelector(query)
	if (element) {
		element.scrollIntoView({
			behavior: 'smooth'
		})
	}
}
