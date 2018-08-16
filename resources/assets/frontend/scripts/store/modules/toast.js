const state = {
    toastActive: false,
    toastMessage: '',
    toastDuration: 2000,
    toastColor: 'dark',
    verticalAlign: 'top', // options: top, bottom
    horizontalAlign: 'right' // options : left, right
}

const getters = {
    getToastData(state) {
        return {
            active: state.toastActive,
            message: state.toastMessage,
            duration: state.toastDuration,
            color: state.toastColor,
            vertical: state.verticalAlign,
            horizontal: state.horizontalAlign
        };
    },

    getToastState(state) {
        return state.toastActive;
    }
}

const mutations = {
    setToast(state, payload) {
        state.toastActive = payload.active;
        state.toastMessage = payload.message;

        if (payload.duration) {
            state.toastDuration = payload.duration;
        }

        if (payload.color) {
            state.toastColor = payload.color;
        }

        if (payload.verticalAlign) {
            state.verticalAlign = payload.verticalAlign
        }

        if (payload.horizontalAlign) {
            state.horizontalAlign = payload.horizontalAlign;
        }
    }
}

export default {
    state,
    getters,
    mutations
}
