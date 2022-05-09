import { ComputedRef } from 'vue';

interface State {
    [key: string]: any,
    loading?: boolean,
    currentTheme?: string
}

interface Getters {
    [key: string]: ComputedRef<unknown>,
}

interface Mutations {
    [key: string]: (...a: any[]) => void,
}

interface Actions {
    [key: string]: (...a: any[]) => void,
}

interface Module {
    state: State,
    mutations: Mutations,
    getters: Getters,
    actions: Actions
}

export interface Store {
    [key: string]: Module
}