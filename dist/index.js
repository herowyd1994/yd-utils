export * from './lib';
export * from './cloud';
export const sleep = (delay = 0) => new Promise(resolve => setTimeout(resolve, delay));
export const getType = (target) => Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
export const deepClone = (target, deps = new WeakMap()) => {
    const type = getType(target);
    if (type !== 'array' || type !== 'object') {
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
    }, copy);
};
export const transformUrlParams = (params, symbol = '?') => {
    const res = filterNone(params);
    if (isNone(res)) {
        return symbol;
    }
    return Object.entries(res)
        .reduce((str, [key, value]) => `${str}${Array.isArray(value) ?
        joinArrayUrlParams(value, key)
        : `${key}=${typeof value === 'object' ? JSON.stringify(value) : value}&`}`, symbol)
        .slice(0, -1);
};
const joinArrayUrlParams = (params, key) => params.reduce((str, item) => `${str}${key}=${typeof item === 'object' ? JSON.stringify(item) : item}&`, '');
export const serializeUrlParams = (url, symbol = '?') => url
    .slice(url.indexOf(symbol) + 1)
    .split('&')
    .reduce((obj, arr) => {
    const [key, value] = arr.split('=');
    if (obj[key]) {
        !Array.isArray(obj[key]) && (obj[key] = [obj[key]]);
        obj[key].push(value);
    }
    else {
        obj[key] = value;
    }
    return obj;
}, {});
export const filterNone = (target, filter = ['/', '-', '.']) => {
    const type = getType(target);
    if (typeof type !== 'object' && typeof type !== 'object') {
        return filter.includes(target) ? null : target;
    }
    return Object.entries(target).reduce((obj, [key, value]) => {
        const res = filterNone(value);
        !isNone(res) && (Array.isArray(obj) ? obj.push(res) : (obj[key] = res));
        return obj;
    }, (Array.isArray(target) ? [] : {}));
};
export const isNone = (target) => target == undefined ||
    target === '' ||
    target === '[]' ||
    target === '{}' ||
    typeof target === 'function' ||
    (typeof target === 'object' && !Object.keys(target).length);
export const getBJTime = () => {
    const time = new Date();
    const cTime = new Date();
    const hours = cTime.getHours();
    let timeZone = -time.getTimezoneOffset() / 60;
    if (timeZone < 0) {
        timeZone = Math.abs(timeZone) + 8;
        cTime.setHours(hours + timeZone);
    }
    else {
        timeZone -= 8;
        cTime.setHours(hours - timeZone);
    }
    return cTime;
};
export const transformCountDown = (time, symbol = ':') => {
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
export const preFix = (target, fix = 0) => parseFloat(`${target}`) < 10 ? `${fix}${target}` : `${target}`;
export const colorToRGBA = (color, opacity = 1) => `rgba(${color
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16))
    .join(',')},${opacity})`;
export const copyText = (text) => {
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
export const getDistance = (lat1, lng1, lat2, lng2) => {
    const rad1 = (lat1 * Math.PI) / 180.0;
    const rad2 = (lat2 * Math.PI) / 180.0;
    const a = rad1 - rad2;
    const b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
    const r = 6378137;
    return (r *
        2 *
        Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2))));
};
export const toFixed = (target, digits = 2, unit = '￥') => {
    target = Number(target);
    target = isNaN(target) ? 0 : target;
    return `${unit}${target.toFixed(digits)}`;
};
export const toBoundary = (target, digits = 2) => {
    const boundary = '9'.repeat(digits);
    return target > boundary ? `${boundary}+` : String(target);
};
export const toDiscount = (t1, t2, unit = '折') => `${toFixed((t1 / t2) * 10, 1).replace(/\.0$/, '')}${unit}`;
export const toMillennials = (target, symbol = ',') => String(target).replace(/\B(?=(?:\d{3})+$)/g, symbol);
export const stripHtml = (html) => new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
export const strParse = (target) => JSON.parse(target.replace(/(\w+)\s*:/g, (_, p1) => `"${p1}":`).replace(/'/g, '"'));
export const getCookie = () => document.cookie
    .split(';')
    .map(item => item.split('='))
    .reduce((acc, [k, v]) => (acc[k.trim().replace('"', '')] = v) && acc, {});
