export default (logo: any) => {
    const link = (document.querySelector("link[rel*='icon']") as HTMLLinkElement) || document.createElement('link')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href = logo
    document.querySelectorAll('head')[0].append(link)
}
