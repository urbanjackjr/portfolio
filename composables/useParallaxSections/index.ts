import { scrollToSection, percentageSeen, maxTranslatePercentage } from "./calculations";
import { debounce } from "~~/utils/utils";

import type { Ref } from "vue";

export const useParallaxSections = (el: Ref<HTMLElement | null>, scrollEl: Ref<HTMLElement | null>, childEl: Ref<HTMLElement | null>) => {
    let resizeObserver: ResizeObserver;

    const isAlreadyScrolled = ref<boolean>(false);

    const onScrollTranslations = ref<boolean>(true);

    const parallaxScrollListenerCallback = (): void => {
        // scroll to element if its not already scrolled and intersects for more than 10%
        if (!isAlreadyScrolled.value && (el.value && percentageSeen(el.value) > 10)) {
            isAlreadyScrolled.value = true;
            scrollToSection(el.value, scrollEl.value as HTMLElement);
        }

        // Enable auto-scrolling if scrolled to Top or element intersects for less or equal than 10%
        else if (scrollEl.value?.scrollTop === 0 || (el.value && percentageSeen(el.value) <= 10)) {
            isAlreadyScrolled.value = false;
        }
    }

    const parallaxScrollListener = (): void => {
        // debounce to avoid problems with navigation
        scrollEl.value?.addEventListener('scroll', debounce(parallaxScrollListenerCallback, 50));
        scrollEl.value?.addEventListener('scroll', childEl && translateBasedOnScroll);
    }

    // Turn off translations if project element extends over viewport height, otherwise keep the animations
    const resizeListener = (): void => {
        resizeObserver = new ResizeObserver(() => {
            const maxPercentage = el.value && childEl.value && maxTranslatePercentage(el.value, childEl.value);
            if (maxPercentage) {
                onScrollTranslations.value = true;
                translateBasedOnScroll();
            } else {
                onScrollTranslations.value = false;
                childEl.value && (childEl.value.style.transform = 'translateY(0)');
            }
        })

        scrollEl.value && resizeObserver.observe(scrollEl.value);
    }

    const translateBasedOnScroll = (): void => {
        const intersetionPercentage: number = el.value && childEl.value ? Math.max(100 - maxTranslatePercentage(el.value, childEl.value), percentageSeen(el.value)) : 0;

        childEl.value && (childEl.value.style.transform = 'translateY(calc(-100% + ' + intersetionPercentage.toString() + '%))');
    }

    onMounted(() => {
        scrollEl.value = el.value && el.value.parentElement && el.value.parentElement.parentElement;
        parallaxScrollListener();
        resizeListener();
        // Height polling because NOTHING ELSE WORKS, NOT NUXT HOOKS NOR ONMOUNTED, NOR NEXTTICK AND ITS MAKING ME CRAZY. I think it has something to do with nuxt page transitions.
        const checkForHeight = setInterval((): void => {
            if (childEl.value?.offsetHeight) {
                translateBasedOnScroll();
                clearInterval(checkForHeight);
            }
        }, 10)
    })

    onUnmounted(() => {
        scrollEl.value && resizeObserver.unobserve(scrollEl.value);
        scrollEl.value?.removeEventListener('scroll', parallaxScrollListenerCallback);
    })

    return { onScrollTranslations, scrollToSection };
}