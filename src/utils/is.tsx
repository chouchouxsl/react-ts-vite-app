export const isArray = (val: any): boolean => Object.prototype.toString.call(val) === '[object Array]'

export const isObject = (val: any): boolean => Object.prototype.toString.call(val) === '[object Object]'

export const isString = (val: any): boolean => Object.prototype.toString.call(val) === '[object String]'
