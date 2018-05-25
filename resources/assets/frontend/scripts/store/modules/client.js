const state = {
    stories:'',
    currentStory:'',
    mailStories:''
}

const mutations = {
    setStories(state, stories){
        state.stories = stories.stories;
    },

    setCurrentStory(state, story){
        state.currentStory = story.story;
    }
}

const actions = {

    getMailStories({commit}, user){
        return new Promise((resolve, reject) => {
            let url = '/client/stories/mail/'+ user.id;
            console.log(url);
            axios.get(url)
                .then((response) => {
                let data = response.data;
                commit('setStories', data);
                resolve();
            })
                .catch((error)=>{
                    reject();
                    console.log(error);
                });

        })
    },

    getCurrentStory({commit}, alpha_id){
        return new Promise((resolve, reject) => {
            let url = '/client/story/show/'+alpha_id;

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
    }

}

const getters = {
    getMailStories(state){
        return state.stories;
    },

    getCurrentStory(state){
        return state.currentStory;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}