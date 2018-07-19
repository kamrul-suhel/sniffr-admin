const state = {
    stories: [],
    mailerStories: [],
    paginate: '',

    currentStories: '',
    currentStoriesAssets: [],

    offeredStories: [],

    purchasedStories: [],
    initStory: false,


};

const getters = {
    getStories(state) {
        return state.stories;
    },

    getMailerStories(state) {
        return state.mailerStories;
    },

    getStoriesPaginateObject(state) {
        return state.paginate;
    },

    getCurrentStory(state) {
        return state.currentStories;
    },

    getCurrentStoryAssets(state) {
        return state.currentStoriesAssets;
    },

    getOfferedStories(state) {
        return state.offeredStories;
    },

    getPurchasedStories(state) {
        return state.purchasedStories;
    },

    getTotalOfferedStories(state) {
        return state.paginate.total;
    },

    getInitStory(state) {
        return state.initStory;
    }
};

const mutations = {
    setStories(state, data) {
        state.stories = data;
    },

    setMailerStories(state, storiesObject) {
        //In feature if we need to do something with stories.
        // all stories with paginate object.
        if (typeof storiesObject.data !== "undefined") {
            state.mailerStories = storiesObject.data;
        }
    },

    setStoriesPaginateObject(state, paginate) {
        state.paginate = paginate;
    },

    setCurrentStory(state, story) {
        state.currentStories = story.story;
    },

    setCurrentStoriesAssets(state, story) {
        state.currentStoriesAssets = [];
        if (story.assets.length > 0) {
            state.currentStoriesAssets = story.assets;
        }
    },

    setResetStories(state) {
        state.stories = [];
        state.mailerStories = [];
        state.paginate = '';
        state.currentStories = '';
        state.currentStoriesAssets = [];
        state.offeredStories = [];
        state.purchasedStories = [];
        state.initStory = false
    },

    setOfferedStories(state, offeredStories) {
        state.offeredStories = [];

        if (typeof offeredStories.data === 'object') {
            offeredStories.data = Object.values(offeredStories.data);
        }
        let allStories = [];
        offeredStories.data.forEach((story) => {
            story[0].story.final_price = story[0].final_price;
            story[0].story.collection_story_id = story[0].id;
            allStories.push(story[0].story);
        });


        state.offeredStories = allStories;
    },

    setPurchasedStories(state, stories) {
        state.offeredStories = [];

        if (typeof stories.data === 'object') {
            stories.data = Object.values(stories.data);
        }
        let allStories = [];
        stories.data.forEach((story) => {
            story[0].story.final_price = story[0].final_price;
            story[0].story.collection_story_id = story[0].id;
            allStories.push(story[0].story);
        });

        state.purchasedStories = allStories;
    },

    setInitStory(state, value) {
        state.initStory = value;
    }
};

const actions = {
    fetchStories({commit}, payload = {}) {
        let url = 'search/stories';

        if (payload.page && payload.page != 0) {
            url = url + '?page=' + payload.page;
        }

        if (payload.search && payload.search != '') {
            url = url + '&search=' + payload.search;
        }

        axios.post(url)
            .then((response) => {
                let data = response.data;
                commit('setStories', data.stories.data);
                commit('setMailerStories', data.mailer_stories);
                commit('setStoriesPaginateObject', data.stories);
            })
            .catch((error) => {
                console.log('Not connect: ' + error);
            });
    },

    fetchCurrentStory({commit}, alpha_id) {
        let url = '/stories/' + alpha_id;

        axios.get(url)
            .then((response) => {
                commit('setCurrentStory', response.data);
                commit('setCurrentStoriesAssets', response.data.story);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    fetchOfferedStories({commit}, payload) {
        axios.get(payload)
            .then((response) => {
                    commit('setOfferedStories', response.data.stories);
                    commit('setStoriesPaginateObject', response.data.stories);
                    commit('setInitStory', true);
                },
                (error) => {
                    console.log(error);
                });
    },

    fetchPurchasedStories({commit}, payload) {
        axios.get(payload)
            .then((response) => {
                    commit('setPurchasedStories', response.data.stories);
                    commit('setStoriesPaginateObject', response.data.stories);
                    commit('setInitStory', true);
                },
                (error) => {
                    console.log(error);
                });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};