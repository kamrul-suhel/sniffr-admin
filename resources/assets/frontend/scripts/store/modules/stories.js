const state = {
    stories: null,
    paginate: {
        last_page :0,
        per_page : 0,
        total:0,
        current_page:0,
    }
}

const getters = {
    getStoriesData(state){
        return state.stories;
    },

    getStoriesPaginateData(state){
        return state.paginate;
    }
}

const mutations = {
    setStoriesData(state, data){
        state.stories = data.stories.data;
    },

    setStoriesPaginateData(state, stories){
        state.paginate.last_page = stories.last_page;
        state.paginate.per_page = stories.per_page;
        state.paginate.total = stories.total;
        state.paginate.current_page = stories.current_page;
    },

    resetStoriesStoreObject(state){
        state.stories = '';
        state.paginate = '';
    }
}

const actions = {
    getStoriesDataAsync({commit}, payload = {}){
        return new Promise(function (resovle, reject) {
            let url = 'stories';

            if (payload.page && payload.page != 0) {
                url = url + '?page=' + payload.page;
            }

            if(payload.search && payload.search != ''){
                url = url + '&search='+payload.search;
            }
            axios.get(url)
                .then((response) => {
                    commit('setStoriesData', response.data);
                    commit('setStoriesPaginateData', response.data.stories);
                    resovle();
                })
                .catch((error) => {
                    console.log('Not connect');
                    reject();
                });
        });
    }

}

export default {
    state,
    getters,
    mutations,
    actions
};