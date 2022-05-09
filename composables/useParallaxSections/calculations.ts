export const scrollToSection = (el: HTMLElement, scrollEl: Element, section: 'next' | 'prev' | number | undefined = undefined): void => {
    const distanceFromTop: number | undefined = scrollEl.scrollTop;
    let scrollTo: number = el.getBoundingClientRect().top + distanceFromTop - scrollEl.getBoundingClientRect().top;
    if (section === 'next') {
        scrollTo = scrollTo + el.offsetHeight;
    }
    else if (section === 'prev') {
        scrollTo = scrollTo - el.offsetHeight;
    }
    else if (typeof section === "number") {
        scrollTo = scrollTo + (scrollEl as HTMLElement).offsetHeight * section;
    }    

    scrollEl.scrollTo({ top: scrollTo });
}

// Percentage of a div seen in viewport
export const percentageSeen = (el: HTMLElement): number => {
    // Get the relevant measurements and positions
    const viewportHeight = window.innerHeight;
    const elementOffsetTop = el.getBoundingClientRect().top;
    const elementHeight = el.offsetHeight;

    // Calculate percentage of the element that's been seen
    const distance = elementOffsetTop + elementHeight - viewportHeight;
    const percentage = 100 - (distance / viewportHeight) * 100;

    // Restrict the range to between 0 and 100
    return Math.min(100, Math.max(0, percentage));
};

export const maxTranslatePercentage = (el: HTMLElement, childEl: HTMLElement): number => {
    return (el && childEl && Math.max(0, (el?.offsetHeight - childEl.offsetHeight - 300) * 100 / (2 * (childEl.offsetHeight)))) ?? 0;
}