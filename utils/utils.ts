export const debounce = (func: () => unknown, timeout: number = 50) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: []) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export const scrollToTop = (scrollElement: HTMLElement) => {
    scrollElement.scrollTo({top: 0});
}