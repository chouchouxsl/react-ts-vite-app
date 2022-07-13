// https://github.com/feross/clipboard-copy/blob/master/index.js

export default function clipboard(text: string) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text).catch(err => {
            throw err !== undefined ? err : new DOMException('The request is not allowed', 'NotAllowedError')
        })
    }

    const span = document.createElement('span')
    span.textContent = text

    span.style.whiteSpace = 'pre'

    document.body.append(span)

    const selection = window.getSelection()
    const range = window.document.createRange()
    selection!.removeAllRanges()
    range.selectNode(span)
    selection!.addRange(range)

    let success = false
    try {
        success = window.document.execCommand('copy')
    } catch (err) {
        console.log('error', err)
    }

    selection!.removeAllRanges()
    span.remove()

    return success
        ? Promise.resolve()
        : Promise.reject(new DOMException('The request is not allowed', 'NotAllowedError'))
}
