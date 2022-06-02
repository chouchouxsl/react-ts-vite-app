import { Button, Select, Tooltip } from '@arco-design/web-react'
import { IconMoonFill, IconSunFill } from '@arco-design/web-react/icon'
import React, { useContext } from 'react'
import { ThemeEnum } from '@/enums/globalEnums'
import useLocale from '@/hooks/useLocale'
import styles from './style/index.module.less'
import { GlobalContext } from '@/context/globalContext'

const Setteing = () => {
    // 切换语言
    const { setLang, lang, theme, setTheme } = useContext(GlobalContext)

    const t = useLocale()

    const changeTheme = () => setTheme && setTheme(theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT)

    return (
        <ul className={styles['app-setteing']}>
            <li>
                <Select
                    options={[
                        { label: '中文', value: 'zh-CN' },
                        { label: 'English', value: 'en-US' }
                    ]}
                    triggerProps={{
                        autoAlignPopupWidth: false,
                        autoAlignPopupMinWidth: true,
                        position: 'bl'
                    }}
                    bordered={false}
                    value={lang}
                    onChange={setLang}
                />
            </li>
            <li>
                <Tooltip
                    content={
                        theme === ThemeEnum.LIGHT
                            ? t['settings.navbar.theme.toDark']
                            : t['settings.navbar.theme.toLight']
                    }
                >
                    <Button
                        type="text"
                        icon={theme === ThemeEnum.LIGHT ? <IconMoonFill /> : <IconSunFill />}
                        onClick={changeTheme}
                        style={{ fontSize: 20 }}
                    />
                </Tooltip>
            </li>
        </ul>
    )
}

export default Setteing
