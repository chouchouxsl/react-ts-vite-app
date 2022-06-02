import React, { useEffect, Suspense, useMemo } from 'react'
import ReactDOM from 'react-dom'
import './style/index.less'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { ConfigProvider, Spin } from '@arco-design/web-react'
import zhCN from '@arco-design/web-react/es/locale/zh-CN'
import enUS from '@arco-design/web-react/es/locale/en-US'
import { history } from '@/route'
import store from '@/redux'
import PageLayout from '@/layout'
import { GlobalContext } from '@/context/globalContext'
import { LocaleType } from '#/config'
import Login from './pages/Login'
import checkLogin from './utils/checkLogin'
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

    useEffect(() => {
        if (!checkLogin()) {
            history.push('/login')
        }
    }, [])

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
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/" component={PageLayout} />
                            </Switch>
                        </GlobalContext.Provider>
                    </Provider>
                </ConfigProvider>
            </Suspense>
        </Router>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'))
