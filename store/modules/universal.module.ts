import { reactive, computed } from 'vue';

const state = reactive({
    loading: true,
})

const getters = {
    getLoading: computed<boolean>(() => {
        return state.loading;
    })
}

const mutations = {
    toggleLoading: (): void => {
        state.loading = !state.loading;
    },
    startLoading: (): void => {
        state.loading = true;
    },
    stopLoading: (): void => {
        state.loading = false;
    }
}

const actions = {

}

const universal = {
    state,
    getters,
    mutations,
    actions
};

export default universal;