import { useCookie } from 'h3'

export const useThemeCookie = () => useState<any>('themeCookie', (): string => defaultTheme())

export const defaultTheme = (): string => {
    let cookieValue: string | undefined;
    if (process.server) {
        const nuxtApp = useNuxtApp();
        cookieValue = useCookie(nuxtApp.ssrContext?.req, 'theme');
    }
    return cookieValue ? cookieValue : 'gotham';
}