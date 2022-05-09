import store from '@/store';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            store: store
        }
    }
})  