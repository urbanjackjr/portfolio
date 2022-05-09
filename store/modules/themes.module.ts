import { reactive, computed } from 'vue';
import { setThemeColors } from '~~/utils/themes';
import themeData from '@/assets/data/themes.json';

const state = reactive({
    currentTheme: 'gotham',
})

const getters = {
    getCurrentTheme: computed<string>(() => {
        return state.currentTheme;
    })
}

const mutations = {
    changeTheme: (theme: string) => {
        state.currentTheme = theme;
    }
}

const actions = {
    themeHandler: (themeName: keyof typeof themeData) => {
        mutations.changeTheme(themeName);
        setThemeColors(themeName);
    }
}

const themes = {
    state,
    getters,
    mutations,
    actions
};

export default themes;