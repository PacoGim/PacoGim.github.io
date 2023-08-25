export default function (element: HTMLElement): number {
	let elementHeight = element.scrollHeight
	let elementScroll = element.getClientRects()[0].top

	let absoluteValue = Math.abs(elementScroll / elementHeight)

	const fontSizeMin = 400
	const fontSizeMax = 700

	const fontSize = fontSizeMax + (fontSizeMin - fontSizeMax) * absoluteValue

	return fontSize
}
