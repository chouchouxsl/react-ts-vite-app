# 基于 react ts vite arcoDesign 的中后台模板

## Description

此项目是本人为了方便开发创建的模板, 也是为了自己巩固技术, 如果你喜欢, 欢迎 Star~

## Project Structure

```
react-ts-vite-app
├─ .husky // git 钩子配置文件
│  ├─ _
│  │  ├─ .gitignore
│  │  └─ husky.sh
│  ├─ commit-msg
│  └─ pre-commit
├─ config // 项目配置
│  └─ vite-plugins // vite 插件配置
│     ├─ eslint.ts
│     ├─ html.ts
│     ├─ index.ts
│     ├─ mock.ts
│     ├─ styleImport.ts
│     └─ svg.ts
├─ src // 源码
│  ├─ api // 接口
│  │  ├─ index.ts
│  │  ├─ list.ts
│  │  ├─ login.ts
│  │  └─ user.ts
│  ├─ assets // 静态资源
│  │  ├─ icons
│  │  │  ├─ bingkuai.svg
│  │  │  ├─ bingtanghulu.svg
│  │  │  ├─ cha.svg
│  │  │  ├─ danta.svg
│  │  │  ├─ dark.svg
│  │  │  ├─ hanbao.svg
│  │  │  ├─ hebaodan.svg
│  │  │  ├─ jiaozi.svg
│  │  │  ├─ kafei.svg
│  │  │  ├─ kele.svg
│  │  │  ├─ light.svg
│  │  │  ├─ like.svg
│  │  │  ├─ logo.svg
│  │  │  ├─ meishikafei.svg
│  │  │  ├─ nailao.svg
│  │  │  ├─ paobing.svg
│  │  │  ├─ qishui.svg
│  │  │  ├─ relian.svg
│  │  │  ├─ search.svg
│  │  │  ├─ shizi.svg
│  │  │  ├─ shutiao.svg
│  │  │  ├─ tiantong.svg
│  │  │  ├─ xuegao.svg
│  │  │  └─ zhenzhunaicha.svg
│  │  └─ imgs
│  │     ├─ avatar.jpeg
│  │     ├─ bg.png
│  │     ├─ img-loading.gif
│  │     ├─ login-banner.jpg
│  │     ├─ login-banner.png
│  │     ├─ wallhaven-1kd35g.jpg
│  │     ├─ wallhaven-dgomxo.jpg
│  │     └─ workplace.png
│  ├─ components // 组件
│  │  ├─ AuthWarp
│  │  │  └─ index.tsx
│  │  ├─ Breadcrumb
│  │  │  └─ index.tsx
│  │  ├─ Footer
│  │  │  ├─ index.tsx
│  │  │  └─ style
│  │  │     └─ index.module.less
│  │  ├─ LazyImg
│  │  │  └─ index.tsx
│  │  ├─ Navbar
│  │  │  ├─ index.tsx
│  │  │  ├─ setteing.tsx
│  │  │  └─ style
│  │  │     └─ index.module.less
│  │  ├─ OperationHead
│  │  │  └─ index.tsx
│  │  └─ SvgIcon
│  │     ├─ index.tsx
│  │     └─ style
│  │        └─ index.module.less
│  ├─ context // 配置react上下文
│  │  └─ globalContext.ts
│  ├─ enums // 定义枚举
│  │  ├─ globalEnums.ts
│  │  └─ requsetEnums.ts
│  ├─ hooks // 自定义钩子
│  │  ├─ useLocale.ts
│  │  ├─ useStorage.ts
│  │  └─ useUpdate.ts
│  ├─ layout // 项目布局
│  │  ├─ index.tsx
│  │  └─ style
│  │     └─ layout.module.less
│  ├─ locale // 多语言
│  │  ├─ en-US
│  │  │  ├─ index.ts
│  │  │  ├─ list.ts
│  │  │  ├─ login.ts
│  │  │  ├─ menu.ts
│  │  │  └─ settings.ts
│  │  ├─ index.ts
│  │  └─ zh-CN
│  │     ├─ index.ts
│  │     ├─ list.ts
│  │     ├─ login.ts
│  │     ├─ menu.ts
│  │     └─ settings.ts
│  ├─ main.tsx // 主文件
│  ├─ mock // mock数据
│  │  └─ index.ts
│  ├─ pages // 页面
│  │  ├─ home
│  │  │  ├─ index.tsx
│  │  │  └─ style
│  │  │     └─ index.module.less
│  │  ├─ list
│  │  │  ├─ detail.tsx
│  │  │  ├─ index.tsx
│  │  │  └─ style
│  │  │     ├─ detail.module.less
│  │  │     └─ index.module.less
│  │  └─ login
│  │     ├─ form.tsx
│  │     ├─ index.tsx
│  │     └─ style
│  │        └─ index.module.less
│  ├─ redux // 状态管理
│  │  ├─ index.ts
│  │  └─ reducers
│  │     ├─ global.ts
│  │     └─ userInfo.ts
│  ├─ route // 路由
│  │  ├─ authRoute.tsx
│  │  ├─ history.ts
│  │  ├─ index.tsx
│  │  └─ routes.tsx
│  ├─ settings.json // 基础配置
│  ├─ style // 样式
│  │  ├─ index.less
│  │  ├─ reset.less
│  │  └─ var.less
│  ├─ typings // 声明文件
│  │  ├─ business.d.ts
│  │  ├─ config.d.ts
│  │  ├─ global.d.ts
│  │  ├─ module.d.ts
│  │  └─ vite-env.d.ts
│  └─ utils // 工具
│     ├─ authentication.ts
│     ├─ changeTheme.ts
│     ├─ checkLogin.ts
│     ├─ clipboard.ts
│     ├─ fetchErrorStatus.ts
│     ├─ get-url-params.ts
│     ├─ is.ts
│     ├─ request.ts
│     ├─ set-page-icon.ts
│     ├─ set-page-title.ts
│     └─ systemTheme.ts
├─ .commitlintrc.js // 提交规范配置
├─ .env.development // 开发环境变量
├─ .env.production // 生产环境变量
├─ .eslintrc // eslint 配置
├─ .gitignore // git忽略文件
├─ .npmrc // npm配置
├─ .prettierignore // 格式化忽略文件
├─ .prettierrc // 格式化配置
├─ .stylelintignore // 样式检查忽略文件
├─ .stylelintrc.js // 样式检查配置
├─ README.md
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js // postcss 配置
├─ tsconfig.json // ts配置
└─ vite.config.ts // vite配置
```

## Quick Start

```json
{
    "dev": "vite", // 开发环境
    "build": "vite build", // 项目打包
    "preview": "vite preview",
    "lint:fix": "eslint --ext .js,.ts,.vue,.json,.md --fix .", // eslint 检查并修复
    "lint:style": "stylelint  \"src/**/*.(less|css)\" --fix --custom-syntax postcss-less", // 样式检查并修复
    "style-check": "stylelint-config-prettier-check", // 样式检查
    "prepare": "husky install" // 初始化git钩子
}
```
