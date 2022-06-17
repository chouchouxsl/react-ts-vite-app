import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Dropdown, Menu, Typography } from '@arco-design/web-react'
import { ReducerState } from '@/redux'
import styles from './style/index.module.less'
import useLocale from '@/hooks/useLocale'
import { history } from '@/route'
import setPageIcon from '@/utils/set-page-icon'
import Setteing from './setteing'

interface INavBar {
    className: string
}

const Navbar: React.FC<INavBar> = ({ className }) => {
    // redux
    const userInfo = useSelector((state: ReducerState) => state.userInfo.userInfo)
    const settings = useSelector((state: ReducerState) => state.global.settings)
    const dispatch = useDispatch()
    // 切换语言
    const t = useLocale()

    const Logo = new URL(`../../assets/icons/${settings!.logo}.svg`, import.meta.url).href

    setPageIcon(Logo)

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
                    <div className={styles.logo}>
                        <img src={Logo} />
                    </div>
                    <div className={styles.title}>{settings?.title}</div>
                </div>
                <div className={styles.right}>
                    <Setteing />
                    {userInfo && (
                        <div className={styles.user}>
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
