export const throttle = (handler, time = 1500) => {
    let pTime = 0;
    return (...args) => new Promise(resolve => {
        const cTime = Date.now();
        if (cTime - pTime < time) {
            return;
        }
        pTime = cTime;
        resolve(handler(...args));
    });
};
export const debounce = (handler, delay = 250) => {
    let timer;
    return (...args) => new Promise(resolve => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => resolve(handler(...args)), delay);
    });
};
