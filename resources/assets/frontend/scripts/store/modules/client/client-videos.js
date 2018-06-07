const state = {
    clientVideos: '',
    clientCurrentVideo: '',
    mailClientVideos: '',
    clientMailerId:'',
}

const mutations = {
    setclientVideos(state, clientVideos){
        state.clientVideos = clientVideos.client_videos;
    },

    setCurrentVideo(state, video){
        state.clientCurrentVideo = story.video;
    },

}

const actions = {

    getMailClientVideos({commit}, mail_obj){
        return new Promise((resolve, reject) => {
            let url = '/client/client_videos/mail/' + mail_obj.user.id;
            if (mail_obj.page > 0) {
                url += '?page=' + mail_obj.page;
            }

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
    },

    getClientCurrentVideo({commit}, alpha_id){
        return new Promise((resolve, reject) => {
            let url = '/client/story/show/' + alpha_id;

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
    getMailclient_videos(state){
        return state.client_videos;
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