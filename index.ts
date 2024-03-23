/** @format */

export * from './lib/event';
export * from './lib/file';
/**
 * 睡眠
 * @param {number} delay
 * @returns {Promise<unknown>}
 */
export const sleep = (delay: number = 0) => new Promise((resolve) => setTimeout(resolve, delay));
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
    if (
        typeof target !== 'object' ||
        target === null ||
        target instanceof RegExp ||
        target instanceof Date
    ) {
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
export const transformUrlParams = (params: Record<string, any>, symbol: string = '?') =>
    Object.entries(filterNone(params))
        .reduce(
            (str, [key, value]) =>
                str + `${key}=${typeof value === 'object' ? JSON.stringify(value) : value}&`,
            symbol
        )
        .slice(0, -1);
/**
 * 序列化Url参数
 * @param {string} url
 * @param {string} symbol
 */
export const serializeUrlParams = (url: string, symbol: string = '?') =>
    url
        .slice(url.indexOf(symbol) + 1)
        .split('&')
        .reduce((obj, arr) => {
            const [key, value] = arr.split('=');
            return { ...obj, [key]: value };
        }, {});
/**
 * 过滤空值
 * @param target
 * @param {any[]} filter
 * @returns {any}
 */
export const filterNone = (target: any, filter: any[] = ['/', '-']) => {
    if (typeof target !== 'object' || target == null) {
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
 * 添加前缀
 * @param {number | string} target
 * @param {number} fix
 * @returns {string}
 */
export const preFix = (target: number | string, fix = 0) =>
    parseFloat(`${target}`) < 10 ? `${fix}${target}` : `${target}`;
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
 * 16进制转rgba
 * @param {string} color
 * @param {number} opacity
 * @returns {string}
 */
export const colorToRGBA = (color: string, opacity: number = 1) => {
    color = color.slice(1);
    if (color.length !== 6 && color.length === 3) {
        color = color.split('').reduce((a, b) => a + b + b, '');
    }
    let str = '';
    for (let i = 0; i < color.length; i += 2) {
        str += `${parseInt(`${color[i]}${color[i + 1]}`, 16)},`;
    }
    return `rgba(${str}${opacity})`;
};
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
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
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
 * @returns {string}
 */
export const toFixed = (target: string | number, digits: number = 2) => {
    target = Number(target);
    target = isNaN(target) ? 0 : target;
    return target.toFixed(
        digits < 0 ? 0
        : digits > 10 ? 10
        : digits
    );
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
 * 折扣
 * @param {number} t1
 * @param {number} t2
 * @param {string} unit
 * @returns {string}
 */
export const toDiscount = (t1: number, t2: number, unit: string = '折') =>
    `${toFixed((t1 / t2) * 10, 1).replace('.0', '')}${unit}`;
