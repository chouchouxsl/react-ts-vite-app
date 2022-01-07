module.exports = {
    extends: [
        // stylelint的推荐基础配置
        'stylelint-config-standard',
        // 支持css-module
        'stylelint-config-css-modules',
        // 关闭和格式化风格冲突的规则
        'stylelint-config-prettier'
    ],
    plugins: ['stylelint-order'], // 指定css属性的排列顺序
    /* 
        stylelint规则
        https://stylelint.docschina.org/user-guide/rules/
    */
    rules: {
        // 关闭对calc写法的校验
        /* 
            class 类名的风格
            短横线命名(kebab-case): ^([a-z][a-z0-9]*)(-[a-z0-9]+)*$
            小驼峰命名(lowerCamelCase): ^[a-z][a-zA-Z0-9]+$
            蛇形命名(snake_case): ^([a-z][a-z0-9]*)(_[a-z0-9]+)*$
            大驼峰命名(UpperCamelCase): ^[A-Z][a-zA-Z0-9]+$ 
        */
        // 小驼峰
        'selector-class-pattern': [
            // 支持短横线命名 或者 小驼峰命名
            '(^[a-z][a-zA-Z0-9]+$)|(^([a-z][a-z0-9]*)(-[a-z0-9]+)*$)',
            {
                message: 'Naming problem'
            }
        ],
        // 兼容rgba写法
        'color-function-notation': 'legacy',
        // 颜色指定大写
        'color-hex-case': null,
        // 禁止空块
        'block-no-empty': true,
        // 颜色6位长度
        'color-hex-length': 'long',
        // 兼容自定义标签名
        'selector-type-no-unknown': [
            true,
            {
                ignoreTypes: []
            }
        ],
        // 忽略伪元素选择器 ::v-deep
        'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: ['v-deep']
            }
        ],
        // 忽略禁止未知的伪类选择器。:global
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global']
            }
        ],
        // 禁止低优先级的选择器出现在高优先级的选择器之后。
        'no-descending-specificity': null,
        // 禁止声明重复的属性
        'declaration-block-no-duplicate-properties': true,
        // 不验证@未知的名字，为了兼容scss的函数
        'at-rule-no-unknown': null,
        // 禁止空注释
        'comment-no-empty': true,
        // 禁止简写属性的冗余值
        'shorthand-property-no-redundant-values': true,
        // 禁止值的浏览器引擎前缀
        'value-no-vendor-prefix': true,
        // property-no-vendor-prefix
        'property-no-vendor-prefix': true,
        // 禁止小于 1 的小数有一个前导零
        'number-leading-zero': null,
        // 禁止空第一行
        'no-empty-first-line': null,
        // 属性的排序
        'order/properties-order': [
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
            'display',
            'justify-content',
            'align-items',
            'float',
            'clear',
            'overflow',
            'overflow-x',
            'overflow-y',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'border',
            'border-style',
            'border-width',
            'border-color',
            'border-top',
            'border-top-style',
            'border-top-width',
            'border-top-color',
            'border-right',
            'border-right-style',
            'border-right-width',
            'border-right-color',
            'border-bottom',
            'border-bottom-style',
            'border-bottom-width',
            'border-bottom-color',
            'border-left',
            'border-left-style',
            'border-left-width',
            'border-left-color',
            'border-radius',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'font-size',
            'font-family',
            'font-weight',
            'text-align',
            'text-justify',
            'text-indent',
            'text-overflow',
            'text-decoration',
            'white-space',
            'color',
            'background',
            'background-position',
            'background-repeat',
            'background-size',
            'background-color',
            'background-clip',
            'opacity',
            'filter',
            'list-style',
            'outline',
            'visibility',
            'box-shadow',
            'text-shadow',
            'resize',
            'transition'
        ]
    }
}
