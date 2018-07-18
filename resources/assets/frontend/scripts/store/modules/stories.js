const state = {
    stories: [],
    mailerStories: [],
    paginate: '',

    currentStories:'',
    currentStoriesAssets:[]
};

const getters = {
    getStories(state){
        return state.stories;
    },

    getMailerStories(state){
        return state.mailerStories;
    },

    getStoriesPaginateObject(state){
        return state.paginate;
    },

    getCurrentStory(state){
        return state.currentStories;
    },

    getCurrentStoryAssets(state){
        return state.currentStoriesAssets;
    }
};

const mutations = {
    setStories(state, data){
        state.stories = data;
    },

    setMailerStories(state, storiesObject){
        //In feature if we need to do something with stories.
        // all stories with paginate object.
        if(typeof storiesObject.data !== "undefined"){
            state.mailerStories = storiesObject.data;
        }
    },

    setStoriesPaginateObject(state, paginate){
        state.paginate = paginate;
    },

    setCurrentStoriesAssets(state, assets){
        state.currentStoriesAssets = [];
        if(assets.length > 0){
            state.currentStoriesAssets = assets;
        }
    },

    setResetStories(state){
        state.stories = [],
        state.mailerStories= [],
        state.paginate= '',
        state.currentStories= '',
        state.currentStoriesAssets= []
    }
};

const actions = {
    fetchStories({commit}, payload = {}){
            let url = 'search/stories';

            if (payload.page && payload.page != 0) {
                url = url + '?page=' + payload.page;
            }

            if(payload.search && payload.search != ''){
                url = url + '&search='+payload.search;
            }

            axios.post(url)
                .then((response) => {
                    let data = response.data;
                    commit('setStories', data.stories.data);
                    commit('setMailerStories', data.mailer_stories);
                    commit('setStoriesPaginateObject', data.stories);
                })
                .catch((error) => {
                    console.log('Not connect: '+error);
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};