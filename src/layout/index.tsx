import LoadingBar from '@/components/LoadingBar'
import Navbar from '@/components/Navbar'
import { routes, IRoutes, defaultRoute } from '@/route'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { isArray } from '@/utils/is'
import { Layout, Menu } from '@arco-design/web-react'
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon'
import React, { useMemo, useRef, useState } from 'react'
import styles from './style/layout.module.less'
//  vite 动态引入 需要维护一个 动态表
const modules = import.meta.glob('../pages/*/index.tsx')
import loadable from '@loadable/component'
import useLocale from '@/hooks/useLocale'
import { useSelector } from 'react-redux'
import { ReducerState } from '@/redux'
import Footer from '@/components/Footer'

console.log('modules :>> ', modules)

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
function getFlattenRoutes() {
    const newRoutes: IRoutes[] = []

    const recursion = (_routes: IRoutes[]) => {
        _routes.forEach((route: IRoutes) => {
            if (route.componentKey) {
                route.component = loadable(modules[`../pages/${route.componentKey}/index.tsx`] as any)
                newRoutes.push(route)
            } else if (isArray(route.children) && (route.children as IRoutes[]).length) {
                recursion(route.children as IRoutes[])
            }
        })
    }

    recursion(routes)

    return newRoutes
}

/**
 * @description: 根据路由表 生成侧边栏
 * @param {any} local // 国际化
 * @return {any[]} //sideNodes
 */
function renderRoutes(locale: any) {
    const sideNodes: any[] = []

    function recursion(_routes: IRoutes[], level: number) {
        return _routes.map(route => {
            // 路由内容Dom
            const contentDom = (
                <>
                    {route.icon} {locale[route.name]}
                </>
            )

            // 判断是不是没有children的菜单 直接使用MenuItem组件
            if (route.component && (!isArray(route.children) || (isArray(route.children) && !route.children?.length))) {
                // 不是一级菜单的 直接返回
                if (level > 1) {
                    return <MenuItem key={route.key}> {contentDom}</MenuItem>
                }
                // 如果是第一级 push到容器里
                sideNodes.push(
                    <MenuItem key={route.key}>
                        <Link to={route.path}>{contentDom}</Link>
                    </MenuItem>
                )
            }

            // 如果存在childrem 需要使用SubMenu组件包裹
            if (route.component && isArray(route.children) && route.children?.length) {
                // 不是一级菜单的 直接返回
                if (level > 1) {
                    return (
                        <SubMenu key={route.key} title={contentDom}>
                            {recursion(route.children, level + 1)}
                        </SubMenu>
                    )
                }
                // 如果是第一级 push到容器里
                sideNodes.push(
                    <SubMenu key={route.key} title={contentDom}>
                        {recursion(route.children, level + 1)}
                    </SubMenu>
                )
            }
        })
    }

    recursion(routes, 1)

    return sideNodes
}

/**
 * @description: layout页面
 * @return {*} layout页面完整布局
 */
function PageLayout() {
    // 国际化
    const locale = useLocale()
    console.log('locale :>> ', locale)

    // 格式化路由 使用useMemo进行缓存 只会调用一次getFlattenRoutes
    const flattenRoutes = useMemo(() => getFlattenRoutes(), [])
    // 侧边栏按钮 是否伸缩collapsed
    const [collapsed, setCollapsed] = useState<boolean>(false)
    // 切换侧边栏
    const toggleCollapse = () => {
        setCollapsed(collapsed => !collapsed)
    }
    // 初始下
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

    // 默认展开项
    const defaultSelectedKeys = [defaultRoute]
    const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultSelectedKeys)

    // 状态条
    const loadingBarRef = useRef(null)

    // 点击菜单的回调
    function onClickMenuItem() {}

    return (
        <Layout className={styles.layout}>
            <LoadingBar ref={loadingBarRef} />
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
                                {renderRoutes(locale)}
                            </Menu>
                        </div>
                        <div className={styles.collapseBtn} onClick={toggleCollapse}>
                            {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
                        </div>
                    </Sider>
                )}
                <Layout className={styles.layoutContent} style={paddingStyle}>
                    <Content>
                        <Switch>
                            {flattenRoutes.map(route => {
                                console.log('route :>> ', route)
                                return <Route key={route.key} path={`${route.path}`} component={route.component} />
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
