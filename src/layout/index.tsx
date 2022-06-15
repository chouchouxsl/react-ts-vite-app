import React, { useMemo, useState, lazy, useEffect, useRef } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Menu } from '@arco-design/web-react'
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon'
import qs from 'query-string'
import { ReducerState } from '@/redux'
import { isArray } from '@/utils/is'
import { IRoutes, useRoutes, history } from '@/route'
import useLocale from '@/hooks/useLocale'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import darkTheme from '@/utils/systemTheme'
// 样式
import styles from './style/layout.module.less'
import { setPageTitle } from '@/utils/set-page-title'
import { Roles, ThemeEnum } from '@/enums/globalEnums'

// 布局组件
const Sider = Layout.Sider
const Content = Layout.Content

// 菜单组件
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

/**
 * @description: 路由表格式化
 * @return {*}  newRoutes 格式化后的路由
 */
function getFlattenRoutes(routes: IRoutes[]) {
    //  vite 动态引入 需要维护一个 动态表
    const modules = import.meta.glob('../pages/**/[a-z[]*.tsx')
    const newRoutes: IRoutes[] = []

    const recursion = (_routes: IRoutes[]) => {
        _routes.forEach((route: IRoutes) => {
            if (route.key) {
                const url = `../pages/${route.key}.tsx`
                if (modules[url]) {
                    route.component = lazy(modules[url] as any)
                }
                newRoutes.push(route)
            }
            if (isArray(route.children) && (route.children as IRoutes[]).length) {
                recursion(route.children as IRoutes[])
            }
        })
    }

    recursion(routes)

    return newRoutes
}

/**
 * @description: layout页面
 * @return {*} layout页面完整布局
 */
function PageLayout() {
    const role = useSelector((state: ReducerState) => state.userInfo.userInfo.role)
    const [routes, defaultRoute] = useRoutes(role as Roles)
    // 国际化
    const t = useLocale()
    // 格式化路由 使用useMemo进行缓存 只会调用一次getFlattenRoutes
    const flattenRoutes = useMemo(() => getFlattenRoutes(routes), [])
    // 侧边栏按钮 是否伸缩collapsed
    const [collapsed, setCollapsed] = useState<boolean>(false)
    // 切换侧边栏
    const toggleCollapse = () => {
        setCollapsed(collapsed => !collapsed)
    }
    // 初始下设置
    const settings = useSelector((state: ReducerState) => state.global.settings)
    const defaultNavBarHeight = 60
    const defaultSiderWidth = 48
    const menuWidth = collapsed ? defaultSiderWidth : settings?.menuWidth
    const showNavbar = settings?.navbar || true
    const showMenu = settings?.menu || true
    const showFooter = settings?.footer || false
    const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {}
    const paddingTop = showNavbar ? { paddingTop: defaultNavBarHeight } : {}
    const paddingStyle = { ...paddingLeft, ...paddingTop }

    // 自动设置监听系统主题变化
    if (settings?.isSystemTheme) {
        const dispatch = useDispatch()
        darkTheme.addListener(e => {
            dispatch({
                type: 'toggle-theme',
                payload: { theme: e.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT }
            })
        })
    }

    // 默认选中菜单
    const pathname = history.location.pathname
    const currentComponent = qs.parseUrl(pathname).url.slice(1)
    const defaultSelectedKeys = [currentComponent || defaultRoute]
    const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultSelectedKeys)
    const currRoute = getCurrRoute(defaultSelectedKeys[0])
    currRoute && setPageTitle(t[currRoute.name] || currRoute.name)

    /* 
      路由map表 处理面包屑
     */
    const [breadcrumb, setBreadCrumb] = useState<IRoutes[]>([])
    const routeMap = useRef<Map<string, IRoutes[]>>(new Map())

    useEffect(() => {
        const key = conversionRouteKey(Array.from(routeMap.current.keys()), pathname)
        setBreadCrumb((routeMap.current.get(key) as IRoutes[]) || [])
    }, [pathname])

    // 解决 点击返回 前进 刷新 侧边栏不变问题
    useEffect(() => {
        setSelectedKeys(defaultSelectedKeys)
    }, [currentComponent])

    // 转换path
    function conversionRouteKey(arr: any[], str: string) {
        let rc = ''
        arr.forEach(key => {
            const reg = RegExp(`^${key}`)
            if (reg.test(str)) {
                if (key.length > rc?.length) {
                    rc = key
                }
            }
        })
        return rc
    }

    // 获取当前路由
    function getCurrRoute(key: string) {
        key = conversionRouteKey(
            flattenRoutes.map(t => t.key),
            key
        )
        return flattenRoutes.find(route => route.key === key)
    }

    // 点击菜单的回调 跳路由
    function onClickMenuItem(key: string) {
        const currRoute = getCurrRoute(key) as IRoutes
        setPageTitle(t[currRoute?.name])
        history.replace(currRoute?.key ? `/${currRoute.key}` : `/${key}`)
    }

    /**
     * @description: 根据路由表 生成侧边栏
     * @param {string[]} t // 国际化
     * @return {any[]} //sideNodes
     */
    function renderRoutes(t: string[]) {
        routeMap.current.clear()
        return function recursion(_routes: IRoutes[], level = 1, parentRoute: IRoutes[] = []) {
            return _routes.map(route => {
                const { breadcrumb = true, hidden } = route
                /* 将路由存取成一个映射关系 */
                routeMap.current.set(`/${route.key}`, breadcrumb ? [...parentRoute, route] : [])
                // 路由内容Dom
                const contentDom = (
                    <>
                        {route.icon || <div className={styles['icon-empty']} />} {t[route.name] || route.name}
                    </>
                )

                const visibleChildren: IRoutes[] = (route.children || []).filter(child => {
                    const { hidden, breadcrumb = true } = child

                    if (hidden || route.hidden) {
                        routeMap.current.set(`/${child.key}`, breadcrumb ? [...parentRoute, route, child] : [])
                    }

                    return !hidden
                })

                /* 设置hidden的 不生成菜单 */
                if (hidden) return ''

                if (visibleChildren.length) {
                    return (
                        <SubMenu key={route.key} title={contentDom}>
                            {recursion(route.children as IRoutes[], level + 1, [...parentRoute, route])}
                        </SubMenu>
                    )
                }

                return <MenuItem key={route.key}> {contentDom}</MenuItem>
            })
        }
    }

    return (
        <Layout className={styles.layout}>
            {showNavbar && <Navbar className={styles.layoutNavbar} />}
            <Layout>
                {showMenu && (
                    <Sider
                        className={styles.layoutSider}
                        width={menuWidth}
                        collapsed={collapsed}
                        onCollapse={setCollapsed}
                        trigger={null}
                        collapsible
                        breakpoint="xl"
                        style={paddingTop}
                    >
                        <div className={styles.menuWrapper}>
                            <Menu
                                collapse={collapsed}
                                onClickMenuItem={onClickMenuItem}
                                selectedKeys={selectedKeys}
                                autoOpen
                            >
                                {renderRoutes(t)(routes)}
                            </Menu>
                        </div>
                        <div className={styles.collapseBtn} onClick={toggleCollapse}>
                            {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
                        </div>
                    </Sider>
                )}
                <Layout className={styles.layoutContent} style={paddingStyle}>
                    <Content>
                        {breadcrumb.length > 0 && (
                            <div className={styles.layoutBreadcrumbWap}>
                                <Breadcrumb breadcrumb={breadcrumb} />
                            </div>
                        )}
                        <Switch>
                            {flattenRoutes.map(route => {
                                let params = ''
                                if (route.params?.length) {
                                    route.params?.forEach(p => {
                                        params += `/:${p}`
                                    })
                                }
                                return (
                                    route.component && (
                                        <Route
                                            key={route.key}
                                            path={`/${route.key}${params}`}
                                            component={route.component}
                                        />
                                    )
                                )
                            })}
                            <Redirect push to={`/${defaultRoute}`} />
                        </Switch>
                    </Content>
                    {showFooter && <Footer />}
                </Layout>
            </Layout>
        </Layout>
    )
}

export default PageLayout
