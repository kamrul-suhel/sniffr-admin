const state = {
    selectedVideos: [],
}

const mutations = {
    addVideo(state, currVideo) {
        if (state.selectedVideos.length <= 0) {
            state.selectedVideos.push(currVideo);
            return;
        }

        let foundVideo = false;
        state.selectedVideos.forEach((story) => {
            if (story.id === currVideo.id) {
                foundVideo = true;
            }
        })

        if (!foundVideo) {
            state.selectedVideos.push(currVideo);
        }
    },

    removeVideo(state, currVideo) {
        state.selectedVideos.forEach((video, index) => {
            if (currVideo.id === video.id) {
                state.selectedVideos.splice(index, 1);
            }
        })
    }
}

const actions = {}

const getters = {
    getAllSelectedVideos(state) {
        return state.selectedVideos;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}