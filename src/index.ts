/** @format */

export * from './lib';
export * from './cloud';
/**
 * 睡眠
 * @param {number} delay
 * @returns {Promise<unknown>}
 */
export const sleep = (delay: number = 0) => new Promise(resolve => setTimeout(resolve, delay));
/**
 * 获取数据类型
 * @param target
 * @returns {string}
 */
export const getType = (target: any) =>
    Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
/**
 * 深克隆
 * @param target
 * @param {WeakMap<Record<string, any>, Record<string, any>>} deps
 * @returns {any}
 */
export const deepClone = (
    target: any,
    deps: WeakMap<Record<string, any>, Record<string, any>> = new WeakMap()
) => {
    const type = getType(target);
    if (type !== 'array' && type !== 'object') {
        return target;
    }
    if (deps.has(target)) {
        return deps.get(target);
    }
    const copy = Array.isArray(target) ? [] : {};
    deps.set(target, copy);
    return Object.entries(target).reduce((obj, [key, value]) => {
        obj[key] = deepClone(value, deps);
        return obj;
    }, copy as any);
};
/**
 * 转换为Url参数
 * @param {Record<string, any>} params
 * @param {string} symbol
 * @returns {string}
 */
export const transformUrlParams = (params: Record<string, any>, symbol: string = '?') => {
    const res = filterNone(params);
    if (isNone(res)) {
        return symbol;
    }
    return Object.entries(res)
        .reduce(
            (str, [key, value]) =>
                `${str}${
                    Array.isArray(value) ?
                        joinArrayUrlParams(value, key)
                    :   `${key}=${typeof value === 'object' ? JSON.stringify(value) : value}&`
                }`,
            symbol
        )
        .slice(0, -1);
};
/**
 * 拼接数组url参数
 * @param {any[]} params
 * @param {string} key
 * @returns {any}
 */
const joinArrayUrlParams = (params: any[], key: string) =>
    params.reduce(
        (str, item) => `${str}${key}=${typeof item === 'object' ? JSON.stringify(item) : item}&`,
        ''
    );
/**
 * 序列化Url参数
 * @param {string} url
 * @param {string} symbol
 */
export const serializeUrlParams = (url: string, symbol: string = '?') =>
    url
        .slice(url.indexOf(symbol) + 1)
        .split('&')
        .reduce(
            (obj, arr) => {
                const [key, value] = arr.split('=');
                if (obj[key]) {
                    !Array.isArray(obj[key]) && (obj[key] = [obj[key]]);
                    obj[key].push(value);
                } else {
                    obj[key] = value;
                }
                return obj;
            },
            {} as Record<string, any>
        );
/**
 * 过滤空值
 * @param target
 * @param {any[]} filter
 * @returns {any}
 */
export const filterNone = (target: any, filter: any[] = ['/', '-', '.']) => {
    const type = getType(target);
    if (type !== 'array' && type !== 'object') {
        return filter.includes(target) ? null : target;
    }
    return Object.entries(target).reduce(
        (obj, [key, value]) => {
            const res = filterNone(value);
            !isNone(res) && (Array.isArray(obj) ? obj.push(res) : (obj[key] = res));
            return obj;
        },
        (Array.isArray(target) ? [] : {}) as any
    );
};
/**
 * 判断是否为空值
 * @param target
 * @returns {boolean}
 */
export const isNone = (target: any) =>
    target == undefined ||
    target === '' ||
    target === '[]' ||
    target === '{}' ||
    typeof target === 'function' ||
    (typeof target === 'object' && !Object.keys(target).length);
/**
 * 获取北京时间
 * @returns {Date}
 */
export const getBJTime = () => {
    const time = new Date();
    const cTime = new Date();
    const hours = cTime.getHours();
    let timeZone = -time.getTimezoneOffset() / 60;
    if (timeZone < 0) {
        timeZone = Math.abs(timeZone) + 8;
        cTime.setHours(hours + timeZone);
    } else {
        timeZone -= 8;
        cTime.setHours(hours - timeZone);
    }
    return cTime;
};
/**
 * 转换倒计时格式
 * @param {number} time
 * @param {string} symbol
 * @returns {string}
 */
export const transformCountDown = (time: number, symbol: string = ':') => {
    let s = 0;
    let m = 0;
    let h = 0;
    if (time > 0) {
        s = Math.trunc(time % 60);
        m = Math.trunc((time / 60) % 60);
        h = Math.trunc(time / 60 / 60);
    }
    return `${preFix(h)}${symbol}${preFix(m)}${symbol}${preFix(s)}`;
};
/**
 * 添加前缀
 * @param {number | string} target
 * @param {number | string} fix
 * @returns {string}
 */
export const preFix = (target: number | string, fix: number | string = 0) =>
    parseFloat(`${target}`) < 10 ? `${fix}${target}` : `${target}`;
/**
 * 16进制转rgba
 * @param {string} color
 * @param {number} opacity
 * @returns {string}
 */
export const colorToRGBA = (color: string, opacity: number = 1) =>
    `rgba(${color
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
        .substring(1)
        .match(/.{2}/g)!
        .map(x => parseInt(x, 16))
        .join(',')},${opacity})`;
/**
 * 复制文字
 * @param {string} text
 */
export const copyText = (text: string) => {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
    }
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.value = text;
    textarea.select();
    document.execCommand('copy', true);
    document.body.removeChild(textarea);
};
/**
 * 获取坐标间的距离
 * @param {number} lat1
 * @param {number} lng1
 * @param {number} lat2
 * @param {number} lng2
 * @returns {number}
 */
export const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const rad1 = (lat1 * Math.PI) / 180.0;
    const rad2 = (lat2 * Math.PI) / 180.0;
    const a = rad1 - rad2;
    const b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
    const r = 6378137;
    return (
        r *
        2 *
        Math.asin(
            Math.sqrt(
                Math.pow(Math.sin(a / 2), 2) +
                    Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)
            )
        )
    );
};
/**
 * 保留小数位
 * @param {string | number} target
 * @param {number} digits
 * @param {string} unit
 * @returns {string}
 */
export const toFixed = (target: string | number, digits: number = 2, unit: string = '￥') => {
    target = Number(target);
    target = isNaN(target) ? 0 : target;
    return `${unit}${target.toFixed(digits)}`;
};
/**
 * 数值边界
 * @param {string | number} target
 * @param {number} digits
 * @returns {string}
 */
export const toBoundary = (target: string | number, digits: number = 2) => {
    const boundary = '9'.repeat(digits);
    return target > boundary ? `${boundary}+` : String(target);
};
/**
 * 计算折扣
 * @param {number} t1
 * @param {number} t2
 * @param {string} unit
 * @returns {string}
 */
export const toDiscount = (t1: number, t2: number, unit: string = '折') =>
    `${toFixed((t1 / t2) * 10, 1).replace(/\.0$/, '')}${unit}`;
/**
 * 金额千分位
 * @param {string | number} target
 * @param {string} symbol
 * @returns {string}
 */
export const toMillennials = (target: string | number, symbol: string = ',') =>
    String(target).replace(/\B(?=(?:\d{3})+$)/g, symbol);
/**
 * 去除文本中去除HTML
 * @param {string} html
 * @returns {string}
 */
export const stripHtml = (html: string) =>
    new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
/**
 * 字符串转对象
 * @param {string} target
 * @returns {any}
 */
export const strParse = (target: string) =>
    JSON.parse(target.replace(/(\w+)\s*:/g, (_, p1) => `"${p1}":`).replace(/'/g, '"'));
/**
 * 获取cookie
 * @returns {object}
 */
export const getCookie = () =>
    document.cookie
        .split(';')
        .map(item => item.split('='))
        .reduce((acc, [k, v]) => (acc[k.trim().replace('"', '')] = v) && acc, {});
/**
 * 获取随机数
 * @param {number} max
 * @param {number} min
 * @returns {number}
 */
export const getRandom = (max: number, min: number = 0) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
