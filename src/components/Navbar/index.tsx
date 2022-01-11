import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Dropdown, Menu, Select, Space, Tooltip, Typography } from '@arco-design/web-react'
import { IconMoonFill, IconSunFill } from '@arco-design/web-react/icon'
import { ReducerState } from '@/redux'
import styles from './style/index.module.less'
import useLocale from '@/hooks/useLocale'
import { history } from '@/route'
import { ILocaleContent } from '@/context/globalContext'
import { ThemeEnum } from '@/enums/globalEnums'

interface INavBar {
    className: string
}

const Navbar: React.FC<INavBar> = ({ className }) => {
    // redux
    const theme = useSelector((state: ReducerState) => state.global.theme)
    const userInfo = useSelector((state: ReducerState) => state.global.userInfo)
    const settings = useSelector((state: ReducerState) => state.global.settings)
    const dispatch = useDispatch()
    // 切换语言
    const currLocale = localStorage.getItem('locale') || 'zh-CN'
    const locale: ILocaleContent['locale'] = useLocale()
    const toggleLocale = (locale: string) => {
        localStorage.setItem('locale', locale)
        location.reload()
    }
    // 登出
    const onMenuItemClick = (key: string) => {
        if (key === 'logout') {
            localStorage.setItem('userStatus', 'logout')
            history.push('/login')
        }
    }

    return (
        <div className={className}>
            <div className={styles.warp}>
                <div className={styles.left}>
                    <Space size={8}>
                        <Typography.Title style={{ margin: 0, fontSize: 18 }} heading={5}>
                            {settings?.title}
                        </Typography.Title>
                    </Space>
                </div>
                <ul className={styles.right}>
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
                    {userInfo && (
                        <li>
                            <Dropdown
                                trigger="click"
                                droplist={
                                    <Menu onClickMenuItem={onMenuItemClick}>
                                        <Menu.Item key="logout">{locale!['settings.navbar.logout']}</Menu.Item>
                                    </Menu>
                                }
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar size={24} style={{ marginRight: 8 }}>
                                        <img alt="avatar" src={userInfo.avatar} />
                                    </Avatar>
                                    <Typography.Text className={styles.username}>{userInfo.name}</Typography.Text>
                                </div>
                            </Dropdown>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
