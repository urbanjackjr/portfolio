export function debounce(func: () => unknown, timeout: number = 50) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: []) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}