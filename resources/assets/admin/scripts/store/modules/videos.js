const state = {
    selectedVideos: [],
    videos: {}
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
    },

    setVideoData(state, videos){
        state.videos = videos;
    }

}

const actions = {
    getMailerVideos({commit, state}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(payload)
                .then((videos) => {
                        state.videos = videos.data.videos;
                        resolve();
                    },
                    (error) => {
                        return reject();
                    });
        })
    }
}

const getters = {
    getAllSelectedVideos(state) {
        return state.selectedVideos;
    },

    getVideos(state) {
        return state.videos;
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}