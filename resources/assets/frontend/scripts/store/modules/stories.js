const state = {
    stories: null,
    mailer_stories: null,
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
        state.stories = data.stories.data;
    },

    setMailerStoriesData(state, data){
        state.mailer_stories = data;
    },

    setStoriesPaginateObject(state, paginate){
        state.paginate = paginate;
    },
};

const actions = {
    getStoryData({commit}, payload = {}){
        return new Promise(function (resovle, reject) {
            let url = 'search/stories';

            if (payload.page && payload.page != 0) {
                url = url + '?page=' + payload.page;
            }

            if(payload.search && payload.search != ''){
                url = url + '&search='+payload.search;
            }

            axios.get(url)
                .then((response) => {
                    commit('setStoriesData', response.data);
                    commit('setMailerStoriesData', data.mailer_stories.data);
                    commit('setStoriesPaginateObject', response.data.stories);
                    resovle();
                })
                .catch((error) => {
                    console.log('Not connect');
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