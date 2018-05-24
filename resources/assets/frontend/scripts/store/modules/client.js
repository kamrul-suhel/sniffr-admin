const state = {
    stories:'',
    mailStories:''
}

const mutations = {
    setStories(state, stories){
        state.stories = stories.stories;
    }
}

const actions = {

    getMailStories({commit}, user){
        return new Promise((resolve, reject) => {
            let url = '/client/stories/mail/'+ user.id;
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
    }

}

const getters = {
    getMailStories(state){
        return state.stories;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}