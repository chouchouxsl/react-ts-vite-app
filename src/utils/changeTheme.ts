import { ThemeEnum } from '@/enums/globalEnums'

function changeTheme(theme: string) {
    if (theme === ThemeEnum.DARK) {
        document.body.setAttribute('arco-theme', ThemeEnum.DARK)
    } else {
        document.body.removeAttribute('arco-theme')
    }
}

export default changeTheme
