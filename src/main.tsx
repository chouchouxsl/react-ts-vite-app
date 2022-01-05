import React, { useEffect, useState, Suspense } from 'react'
import ReactDOM from 'react-dom'
import Nprogress from '@/components/Nprogress'
import './style/index.less'
import PageLayout from '@/layout'
import store from '@/redux'
import { Provider } from 'react-redux'
import { history } from '@/route'
import { Router, Switch, Route } from 'react-router-dom'
import { ConfigProvider } from '@arco-design/web-react'
import zhCN from '@arco-design/web-react/es/locale/zh-CN'
import enUS from '@arco-design/web-react/es/locale/en-US'
import { GlobalContext } from '@/hooks/useLocale'

const Index: React.FC = () => {
    /* 国际化 */
    const localName = localStorage.getItem('locale') || 'zh-CN'
    const [locale, setLocale] = useState<Record<string, string>>({})

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
            <Suspense fallback={<Nprogress />}>
                <ConfigProvider locale={getLocal()}>
                    <Provider store={store}>
                        <GlobalContext.Provider value={{ locale }}>
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
