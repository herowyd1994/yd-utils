"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = exports.emit = exports.off = exports.once = exports.on = void 0;
var on = function (key, handler) {
    init(key, handler);
    return function () { return (store[key] = store[key].filter(function (fn) { return fn !== handler; })); };
};
exports.on = on;
var once = function (key, handler) {
    init(key, handler);
    handler.once = false;
};
exports.once = once;
var off = function (keys) { return each(keys, function (key) { return delete store[key]; }); };
exports.off = off;
var emit = function (keys) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return each(keys, function (key) {
        if (!store[key]) {
            return;
        }
        store[key].forEach(function (fn) {
            fn.apply(void 0, args);
            fn.hasOwnProperty('once') && (fn.once = true);
        });
        store[key] = store[key].filter(function (fn) { return fn.once !== true; });
    });
};
exports.emit = emit;
var count = function (key) { return (store[key] ? store[key].length : 0); };
exports.count = count;
var store = {};
var init = function (key, handler) {
    !store[key] && (store[key] = []);
    store[key].push(handler);
};
var each = function (keys, handler) {
    keys =
        keys === '*' ? Object.keys(store)
            : typeof keys === 'string' ? [keys]
                : keys;
    keys.forEach(handler);
};
