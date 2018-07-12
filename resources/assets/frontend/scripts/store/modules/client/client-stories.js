const state = {
    stories: '',
    currentStory: '',
    mailStories: '',
    client_goback_route_name:'',
    purchased_stories:'',
    offered_stories:''
}

const mutations = {
    setStories(state, stories){
        state.stories = stories.stories;
    },

    setCurrentStory(state, story){
        state.currentStory = story.story;
    },

    setClientGobBckRoute(state, route_name){
        state.client_goback_route_name = route_name;
    }
}

const actions = {

    getMailStories({commit}, mail_obj){
        return new Promise((resolve, reject) => {
            let url = '/client/stories';
            if (mail_obj.page > 0) {
                url += '?page=' + mail_obj.page;
            }

            axios.get(url)
                .then((response) => {
                    let data = response.data;
                    commit('setStories', data);
                    resolve();
                })
                .catch((error) => {
                    reject();
                    console.log(error);
                });

        })
    },

    getCurrentStory({commit}, alpha_id){
        return new Promise((resolve, reject) => {
            let url = '/stories/' + alpha_id;

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

    fetchOfferedStories({commit}, payload){
        return new Promise((resolve, reject) => {
            axios.get(payload)
                .then((response) => {
                        state.offered_stories = response.data.stories;
                        resolve();
                    },
                    (error) => {
                        return reject();
                    });
        })
    },

    fetchPurchasedStories({commit}, payload){
        return new Promise((resolve, reject) => {
            axios.get(payload)
                .then((response) => {
                        state.purchased_stories = response.data.stories;
                        resolve();
                    },
                    (error) => {
                        return reject();
                    });
        })
    }

}

const getters = {
    getMailStories(state){
        return state.stories;
    },

    getCurrentStory(state){
        return state.currentStory;
    },

    getClientGoBackRoute(state){
        return state.client_goback_route_name;
    },

    getOfferedStories(state){
        return state.offered_stories;
    },

    getPurchasedStories(state){
        return state.purchased_stories;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}