"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToLetterMulti = exports.getRandom = exports.getCookie = exports.strParse = exports.stripHtml = exports.toMillennials = exports.toDiscount = exports.toBoundary = exports.toFixed = exports.getDistance = exports.copyText = exports.colorToRGBA = exports.preFix = exports.transformCountDown = exports.getBJTime = exports.isNone = exports.filterNone = exports.serializeUrlParams = exports.transformUrlParams = exports.deepClone = exports.getType = exports.sleep = void 0;
__exportStar(require("./lib"), exports);
__exportStar(require("./cloud"), exports);
var sleep = function (delay) {
    if (delay === void 0) { delay = 0; }
    return new Promise(function (resolve) { return setTimeout(resolve, delay); });
};
exports.sleep = sleep;
var getType = function (target) {
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
};
exports.getType = getType;
var deepClone = function (target, deps) {
    if (deps === void 0) { deps = new WeakMap(); }
    var type = (0, exports.getType)(target);
    if (type !== 'array' && type !== 'object') {
        return target;
    }
    if (deps.has(target)) {
        return deps.get(target);
    }
    var copy = Array.isArray(target) ? [] : {};
    deps.set(target, copy);
    return Object.entries(target).reduce(function (obj, _a) {
        var key = _a[0], value = _a[1];
        obj[key] = (0, exports.deepClone)(value, deps);
        return obj;
    }, copy);
};
exports.deepClone = deepClone;
var transformUrlParams = function (params, symbol) {
    if (symbol === void 0) { symbol = '?'; }
    var res = (0, exports.filterNone)(params);
    if ((0, exports.isNone)(res)) {
        return symbol;
    }
    return Object.entries(res)
        .reduce(function (str, _a) {
        var key = _a[0], value = _a[1];
        return "".concat(str).concat(Array.isArray(value) ?
            joinArrayUrlParams(value, key)
            : "".concat(key, "=").concat(typeof value === 'object' ? JSON.stringify(value) : value, "&"));
    }, symbol)
        .slice(0, -1);
};
exports.transformUrlParams = transformUrlParams;
var joinArrayUrlParams = function (params, key) {
    return params.reduce(function (str, item) { return "".concat(str).concat(key, "=").concat(typeof item === 'object' ? JSON.stringify(item) : item, "&"); }, '');
};
var serializeUrlParams = function (url, symbol) {
    if (symbol === void 0) { symbol = '?'; }
    return url
        .slice(url.indexOf(symbol) + 1)
        .split('&')
        .reduce(function (obj, arr) {
        var _a = arr.split('='), key = _a[0], value = _a[1];
        if (obj[key]) {
            !Array.isArray(obj[key]) && (obj[key] = [obj[key]]);
            obj[key].push(value);
        }
        else {
            obj[key] = value;
        }
        return obj;
    }, {});
};
exports.serializeUrlParams = serializeUrlParams;
var filterNone = function (target, filter) {
    if (filter === void 0) { filter = ['/', '-', '.']; }
    var type = (0, exports.getType)(target);
    if (type !== 'array' && type !== 'object') {
        return filter.includes(target) ? null : target;
    }
    return Object.entries(target).reduce(function (obj, _a) {
        var key = _a[0], value = _a[1];
        var res = (0, exports.filterNone)(value);
        !(0, exports.isNone)(res) && (Array.isArray(obj) ? obj.push(res) : (obj[key] = res));
        return obj;
    }, (Array.isArray(target) ? [] : {}));
};
exports.filterNone = filterNone;
var isNone = function (target) {
    return target == undefined ||
        target === '' ||
        target === '[]' ||
        target === '{}' ||
        typeof target === 'function' ||
        (typeof target === 'object' && !Object.keys(target).length);
};
exports.isNone = isNone;
var getBJTime = function () {
    var time = new Date();
    var cTime = new Date();
    var hours = cTime.getHours();
    var timeZone = -time.getTimezoneOffset() / 60;
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
exports.getBJTime = getBJTime;
var transformCountDown = function (time, symbol) {
    if (symbol === void 0) { symbol = ':'; }
    var s = 0;
    var m = 0;
    var h = 0;
    if (time > 0) {
        s = Math.trunc(time % 60);
        m = Math.trunc((time / 60) % 60);
        h = Math.trunc(time / 60 / 60);
    }
    return "".concat((0, exports.preFix)(h)).concat(symbol).concat((0, exports.preFix)(m)).concat(symbol).concat((0, exports.preFix)(s));
};
exports.transformCountDown = transformCountDown;
var preFix = function (target, fix) {
    if (fix === void 0) { fix = 0; }
    return parseFloat("".concat(target)) < 10 ? "".concat(fix).concat(target) : "".concat(target);
};
exports.preFix = preFix;
var colorToRGBA = function (color, opacity) {
    if (opacity === void 0) { opacity = 1; }
    return "rgba(".concat(color
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (_, r, g, b) { return "#".concat(r).concat(r).concat(g).concat(g).concat(b).concat(b); })
        .substring(1)
        .match(/.{2}/g)
        .map(function (x) { return parseInt(x, 16); })
        .join(','), ",").concat(opacity, ")");
};
exports.colorToRGBA = colorToRGBA;
var copyText = function (text) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
    }
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.value = text;
    textarea.select();
    document.execCommand('copy', true);
    document.body.removeChild(textarea);
};
exports.copyText = copyText;
var getDistance = function (lat1, lng1, lat2, lng2) {
    var rad1 = (lat1 * Math.PI) / 180.0;
    var rad2 = (lat2 * Math.PI) / 180.0;
    var a = rad1 - rad2;
    var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
    var r = 6378137;
    return (r *
        2 *
        Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2))));
};
exports.getDistance = getDistance;
var toFixed = function (target, digits, unit) {
    if (digits === void 0) { digits = 2; }
    if (unit === void 0) { unit = '￥'; }
    target = Number(target);
    target = isNaN(target) ? 0 : target;
    return "".concat(unit).concat(target.toFixed(digits));
};
exports.toFixed = toFixed;
var toBoundary = function (target, digits) {
    if (digits === void 0) { digits = 2; }
    var boundary = '9'.repeat(digits);
    return target > boundary ? "".concat(boundary, "+") : String(target);
};
exports.toBoundary = toBoundary;
var toDiscount = function (t1, t2, unit) {
    if (unit === void 0) { unit = '折'; }
    return "".concat((0, exports.toFixed)((t1 / t2) * 10, 1).replace(/\.0$/, '')).concat(unit);
};
exports.toDiscount = toDiscount;
var toMillennials = function (target, symbol) {
    if (symbol === void 0) { symbol = ','; }
    return String(target).replace(/\B(?=(?:\d{3})+$)/g, symbol);
};
exports.toMillennials = toMillennials;
var stripHtml = function (html) {
    return new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
};
exports.stripHtml = stripHtml;
var strParse = function (target) {
    return JSON.parse(target.replace(/(\w+)\s*:/g, function (_, p1) { return "\"".concat(p1, "\":"); }).replace(/'/g, '"'));
};
exports.strParse = strParse;
var getCookie = function () {
    return document.cookie
        .split(';')
        .map(function (item) { return item.split('='); })
        .reduce(function (acc, _a) {
        var k = _a[0], v = _a[1];
        return (acc[k.trim().replace('"', '')] = v) && acc;
    }, {});
};
exports.getCookie = getCookie;
var getRandom = function (max, min) {
    if (min === void 0) { min = 0; }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.getRandom = getRandom;
var numberToLetterMulti = function (num, symbol, toUpper) {
    if (symbol === void 0) { symbol = ''; }
    if (toUpper === void 0) { toUpper = true; }
    num = Number(num);
    var str = '';
    if (num > 26) {
        str = "".concat(Array(Math.trunc(num / 26))
            .fill(toUpper ? 'Z' : 'z')
            .join(symbol));
        num %= 26;
    }
    num && (str += "".concat(str ? symbol : '').concat(String.fromCharCode((toUpper ? 64 : 96) + num)));
    return str;
};
exports.numberToLetterMulti = numberToLetterMulti;
