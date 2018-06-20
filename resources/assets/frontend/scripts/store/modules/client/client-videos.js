const state = {
    clientVideos: '',
    clientCurrentVideo: '',
    mailClientVideos: '',
    clientMailerId:'',
}

const mutations = {
    setClientVideos(state, clientVideos){
        state.clientVideos = clientVideos.videos;
    },

    setClientCurrentVideo(state, video){
        state.clientCurrentVideo = story.video;
    },

}

const actions = {

    getClientMailVideos({commit}, mail_obj){
        return new Promise((resolve, reject) => {
            let url = '/client/videos';
            if (mail_obj.page > 0) {
                url += '?page=' + mail_obj.page;
            }

            axios.get(url)
                .then((response) => {
                    let data = response.data;
                    commit('setClientVideos', data);
                    resolve();
                })
                .catch((error) => {
                    reject();
                    console.log(error);
                });

        })
    },

    getClientCurrentVideo({commit}, alpha_id){
        return new Promise((resolve, reject) => {
            let url = '/client/videos/' + alpha_id;

            axios.get(url)
                .then((response) => {
                    commit('setCurrentStory', response.data);
                    resolve();
                })
                .catch((error) => {
                    reject();
                    console.log(error);
                });
        })
    },

    getClientDownloadedVideos({commit}, downloaded_obj){
        return new Promise((resolve, reject) => {
            let url = '/client/client_videos/downloaded';
            if (downloaded_obj.page > 0) {
                url += '?page=' + downloaded_obj.page;
            }
            console.log(url);

            axios.get(url)
                .then((response) => {
                    let data = response.data;
                    commit('setclient_videos', data);
                    resolve();
                })
                .catch((error) => {
                    reject();
                    console.log(error);
                });

        })
    }

}

const getters = {
    getClientMailVideos(state){
        return state.clientVideos;
    },

    getClientCurrentVideo(state){
        return state.currentStory;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}