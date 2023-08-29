export default function (element: HTMLElement): number {
	let elementHeight = element.scrollHeight
	let elementScroll = element.getClientRects()[0].top

	let absoluteValue = Math.abs(elementScroll / elementHeight)

	const fontSizeMin = 100
	const fontSizeMax = 800

	const fontSize = Math.trunc(fontSizeMax + (fontSizeMin - fontSizeMax) * absoluteValue)

	return fontSize
}
