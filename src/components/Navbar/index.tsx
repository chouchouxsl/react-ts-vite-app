import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Dropdown, Menu, Select, Space, Tooltip, Typography } from '@arco-design/web-react'
import { IconMoonFill, IconSunFill } from '@arco-design/web-react/icon'
import { ReducerState } from '@/redux'
import styles from './style/index.module.less'
import useLocale from '@/hooks/useLocale'
import { history } from '@/route'
import { ThemeEnum } from '@/enums/globalEnums'
import { GlobalContext } from '@/context/globalContext'

interface INavBar {
    className: string
}

const Navbar: React.FC<INavBar> = ({ className }) => {
    // redux
    const userInfo = useSelector((state: ReducerState) => state.userInfo.userInfo)
    const settings = useSelector((state: ReducerState) => state.global.settings)
    const dispatch = useDispatch()
    // 切换语言
    const { setLang, lang, theme, setTheme } = useContext(GlobalContext)
    const t = useLocale()

    const changeTheme = () => setTheme && setTheme(theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT)

    // 登出
    const onMenuItemClick = (key: string) => {
        if (key === 'logout') {
            dispatch({
                type: 'remove-token'
            })
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
                    {userInfo && (
                        <li>
                            <Dropdown
                                trigger="click"
                                position="bottom"
                                droplist={
                                    <Menu onClickMenuItem={onMenuItemClick}>
                                        <Menu.Item key="logout">{t['settings.navbar.logout']}</Menu.Item>
                                    </Menu>
                                }
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar size={24} style={{ marginRight: 8 }}>
                                        <img alt="avatar" src={userInfo.avatar} />
                                    </Avatar>
                                    <Typography.Text className={styles.username}>{userInfo.username}</Typography.Text>
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
