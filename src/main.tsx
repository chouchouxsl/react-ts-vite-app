import React, { useEffect, useState, Suspense, useMemo } from 'react'
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

const Index: React.FC = () => {
    /* 国际化 */
    const localName = localStorage.getItem('locale') || 'zh-CN'
    const [locale, setLocale] = useState<Record<string, string>>({})
    const context = useMemo(() => ({ locale }), [locale])

    if (!localStorage.getItem('locale')) {
        localStorage.setItem('locale', localName)
    }

    const getLocal = () => {
        switch (localName) {
            case 'zh-CN':
                return zhCN
            case 'en-US':
                return enUS
            default:
                return zhCN
        }
    }

    const getPath = (localName: string) => {
        const path = `./locale/${localName}.ts`
        const modules = import.meta.globEager('./locale/*.ts')
        return modules[path].default
    }

    const fetchLocale = async () => {
        const locale = getPath(localName)
        setLocale(locale)
    }

    useEffect(() => {
        fetchLocale()
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
                        <GlobalContext.Provider value={context}>
                            <Switch>
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
