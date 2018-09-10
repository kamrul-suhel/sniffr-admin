const state = {
    toastActive: false,
    toastMessage: '',
    toastDuration: 2000,
    toastColor: '',
    verticalAlign: 'top', // options: top, bottom
    horizontalAlign: '' // options : left, right
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
        state.toastActive = true;
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
    },

    resetToast(state, payload){
        state.toastActive = false;
        state.toastMessage = payload.message;
        state.toastDuration = payload.duration;
        state.toastColor = payload.color;
        state.verticalAlign = payload.verticalAlign
        state.horizontalAlign = payload.horizontalAlign;
    }
}

export default {
    state,
    getters,
    mutations
}
