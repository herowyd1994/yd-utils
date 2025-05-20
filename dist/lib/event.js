"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.throttle = void 0;
var throttle = function (handler, time) {
    if (time === void 0) { time = 1500; }
    var pTime = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve) {
            var cTime = Date.now();
            if (cTime - pTime < time) {
                return;
            }
            pTime = cTime;
            resolve(handler.apply(void 0, args));
        });
    };
};
exports.throttle = throttle;
var debounce = function (handler, delay) {
    if (delay === void 0) { delay = 250; }
    var timer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve) {
            timer && clearTimeout(timer);
            timer = setTimeout(function () { return resolve(handler.apply(void 0, args)); }, delay);
        });
    };
};
exports.debounce = debounce;
