const state = {
    stories: null,
    mailer_stories: [],
    paginate: ''
};

const getters = {
    getStoriesData(state){
        return state.stories;
    },

    getMailerStoriesData(state){
        return state.mailer_stories;
    },

    getStoriesPaginateObject(state){
        return state.paginate;
    },
};

const mutations = {
    setStoriesData(state, data){
        state.stories = data;
    },

    setMailerStoriesData(state, data){
        if(typeof data !== "undefined"){
            state.mailer_stories = data;
        }
    },

    setStoriesPaginateObject(state, paginate){
        state.paginate = paginate;
    },
};

const actions = {
    getStoryData({commit}, payload = {}){
        return new Promise(function (resolve, reject) {
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
                    commit('setStoriesData', data.stories.data);
                    commit('setMailerStoriesData', data.mailer_stories.data);
                    commit('setStoriesPaginateObject', data.stories);
                    resolve();
                })
                .catch((error) => {
                    console.log('Not connect: '+error);
                    reject();
                });
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};