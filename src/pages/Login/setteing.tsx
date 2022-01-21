import { Button, Select, Tooltip } from '@arco-design/web-react'
import { IconMoonFill, IconSunFill } from '@arco-design/web-react/icon'
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ILocaleContent } from '@/context/globalContext'
import { ThemeEnum } from '@/enums/globalEnums'
import useLocale from '@/hooks/useLocale'
import { ReducerState } from '@/redux'
import styles from './style/index.module.less'

const Setteing = () => {
    // redux
    const theme = useSelector((state: ReducerState) => state.global.theme)
    const dispatch = useDispatch()
    // 切换语言
    const currLocale = localStorage.getItem('locale') || 'zh-CN'
    const locale: ILocaleContent['locale'] = useLocale()
    const toggleLocale = (locale: string) => {
        localStorage.setItem('locale', locale)
        location.reload()
    }
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
                    value={currLocale}
                    onChange={toggleLocale}
                />
            </li>
            <li>
                <Tooltip
                    content={
                        theme === ThemeEnum.LIGHT
                            ? locale!['settings.navbar.theme.toDark']
                            : locale!['settings.navbar.theme.toLight']
                    }
                >
                    <Button
                        type="text"
                        icon={theme === ThemeEnum.LIGHT ? <IconMoonFill /> : <IconSunFill />}
                        onClick={() =>
                            dispatch({
                                type: 'toggle-theme',
                                payload: { theme: theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT }
                            })
                        }
                        style={{ fontSize: 20 }}
                    />
                </Tooltip>
            </li>
        </ul>
    )
}

export default Setteing
