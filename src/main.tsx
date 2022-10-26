import React, { Suspense, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import 'virtual:svg-icons-register'
import './style/index.less'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import { ConfigProvider, Spin } from '@arco-design/web-react'
import Particles from 'react-tsparticles'
import zhCN from '@arco-design/web-react/es/locale/zh-CN'
import enUS from '@arco-design/web-react/es/locale/en-US'
import { AuthRoute, history } from '@/route'
import store from '@/redux'
import PageLayout from '@/layout'
import { GlobalContext } from '@/context/globalContext'
import Login from './pages/login'
import useStorage from './hooks/useStorage'
import changeTheme from './utils/changeTheme'
import { LocaleEnum, ThemeEnum } from './enums/globalEnums'

const Index: React.FC = () => {
    /* 国际化 */
    const [lang, setLang] = useStorage('locale', LocaleEnum.enUS)
    /* 主题 */
    const [theme, setTheme] = useStorage('theme', ThemeEnum.LIGHT)

    const getLocal = () => {
        switch (lang) {
            case 'zh-CN':
                return zhCN
            case 'en-US':
                return enUS
            default:
                return zhCN
        }
    }

    const contextValue = useMemo(() => ({ lang, setLang, theme, setTheme }), [lang, theme])

    useEffect(() => {
        changeTheme(theme)
    }, [theme])

    return (
        <Router history={history}>
            <Suspense
                fallback={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100vh'
                        }}
                    >
                        <Spin dot tip="加载中..." />
                    </div>
                }
            >
                <ConfigProvider locale={getLocal()}>
                    <Provider store={store}>
                        <GlobalContext.Provider value={contextValue}>
                            <Particles
                                options={{
                                    backgroundMode: {
                                        enable: true,
                                        zIndex: 0
                                    },
                                    fpsLimit: 60,
                                    interactivity: {
                                        detectsOn: 'canvas',
                                        events: {
                                            onClick: { enable: true, mode: 'repulse' },
                                            onHover: {
                                                enable: true,
                                                mode: 'bubble',
                                                parallax: { enable: false, force: 2, smooth: 10 }
                                            },
                                            resize: true
                                        },
                                        modes: {
                                            bubble: {
                                                distance: 400,
                                                duration: 0.3,
                                                opacity: 1,
                                                size: 4
                                            },
                                            grab: { distance: 400, line_linked: { opacity: 0.5 } },
                                            push: { particles_nb: 4 },
                                            remove: { particles_nb: 2 },
                                            repulse: { distance: 200, duration: 0.4 }
                                        }
                                    },
                                    particles: {
                                        color: { value: theme === ThemeEnum.LIGHT ? '#000' : '#fff' },
                                        move: {
                                            attract: { enable: false, rotateX: 600, rotateY: 1200 },
                                            direction: 'bottom-left',
                                            enable: true,
                                            outMode: 'out',
                                            random: false,
                                            size: true,
                                            speed: 1,
                                            straight: false
                                        },
                                        number: { density: { enable: true, area: 800 }, value: 400 },
                                        opacity: {
                                            random: true,
                                            value: 0.5
                                        },
                                        shape: {
                                            type: 'star'
                                        },
                                        size: {
                                            random: true,
                                            value: 10
                                        }
                                    },
                                    detectRetina: true
                                }}
                            />
                            <Switch>
                                <Route path="/login" component={Login} />
                                <AuthRoute path="/" component={PageLayout} />
                            </Switch>
                        </GlobalContext.Provider>
                    </Provider>
                </ConfigProvider>
            </Suspense>
        </Router>
    )
}

ReactDOM.render(<Index />, document.querySelector('#root'))
