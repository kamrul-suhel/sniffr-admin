const state = {
    clientVideos: '',
    clientCurrentVideo: '',
    mailClientVideos: '',
    clientMailerId:'',
    purchased_videos:''
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

    fetchPurchasedVideos({commit}, payload){
        return new Promise((resolve, reject) => {

            axios.get(payload)
                .then((response) => {
                        state.purchased_videos = response.data.videos;
                        resolve();
                    },
                    (error) => {s
                        return reject();
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
    },

    getPurchasedVideos(state){
        return state.purchased_videos;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}