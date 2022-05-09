import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    meta: {
        title: 'Portfolio',
        htmlAttrs: {
            lang: 'en-US',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Web Dev Portfolio' }
        ],
        link: [
            { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
            { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap', as: "style" },
            { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap', as: "style" },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap' },
        ],
    },
    css: [
        '@/assets/sass/main.scss',
    ],
    postcss: {
        // Add plugin names as key and arguments as value
        // Install them before as dependencies with npm or yarn
        plugins: {
            // Disable a plugin by passing false as value
            'postcss-preset-env': {},
            'autoprefixer': {
                grid: "autoplace",
            }
        },
    },
    runtimeConfig: {
        mailEmail: process.env.MAIL_EMAIL,
        refreshToken: process.env.REFRESH_TOKEN,
        cliendId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        mailPass: process.env.MAIL_PASS,
        reCaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
        public: {
            testVar: process.env.TEST_VAR,
            reCaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
        }
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                    @import "@/assets/sass/abstract/_functions.scss";
                    @import "@/assets/sass/abstract/_variables.scss";
                    @import "@/assets/sass/abstract/_mixins.scss";
                    `
                }
            }
        }
    },
    typescript: {
        strict: true
    },
    ssr: true,
})
