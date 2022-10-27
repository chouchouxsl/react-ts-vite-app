import { title } from '../settings.json'

export function setPageTitle(pageTitle: string) {
    let str = ''
    if (pageTitle) {
        str = `${pageTitle} - ${title}`
    } else {
        str = `${title}`
    }
    document.title = str
}
