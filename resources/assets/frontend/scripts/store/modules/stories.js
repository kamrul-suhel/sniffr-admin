const state = {
    stories: [],
    mailerStories: [],
    paginate: '',

    currentStories: '',

    offeredStories: [],

    purchasedStories: [],
    initStory: false,

    currentStoryAssets: [],
    currentSelectedStoryAsset: {},
    currentStoryAssetHasNextAsset: false,
    currentStoryAssetHasPreviousAsset: false,
    storyAssetDialogBox : false,
    assetSelectedId : null,

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
        return state.currentStoryAssets;
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
    },

    getStoryAssetDialogBox(state){
        return state.storyAssetDialogBox;
    },

    getAssetSelectedId(state){
        return state.assetSelectedId;
    },

    getCurrentSelectedStoryAsset(state){
        return state.currentSelectedStoryAsset;
    },

    getStoryAssetHasNextAsset(state){
        return state.currentStoryAssetHasNextAsset;
    },

    getStoryAssetHasPreviousAsset(state){
        return state.currentStoryAssetHasPreviousAsset;
    }
};

const mutations = {
    setStories(state, data) {
        state.stories = data;
    },

    setMailerStories(state, storiesObject) {
        if (typeof storiesObject !== "undefined") {
            state.mailerStories = storiesObject;
        }
    },

    setStoriesPaginateObject(state, paginate) {
        state.paginate = paginate;
    },

    setCurrentStory(state, story) {
        state.currentStories = story.story;
    },

    setcurrentStoryAssets(state, story) {
        state.currentStoryAssets = [];
        if (story.assets.length > 0) {
            state.currentStoryAssets = story.assets;
        }
    },

    setResetStories(state) {
        state.stories = [];
        state.mailerStories = [];
        state.paginate = '';
        state.currentStories = '';
        state.currentStoryAssets = [];
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
            story[0].story.platform = story[0].platform;
            story[0].story.type = story[0].type;
            story[0].story.length = story[0].length;
            story[0].story.collection_story_id = story[0].id;
            story[0].story.collection_status = story[0].status;
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
            story[0].story.platform = story[0].platform;
            story[0].story.type = story[0].type;
            story[0].story.length = story[0].length;
            story[0].story.license_ends_at = story[0].license_ends_at;
            story[0].story.collection_story_id = story[0].id;
            story[0].story.collection_status = story[0].status;
            allStories.push(story[0].story);
        });

        state.purchasedStories = allStories;
    },

    setInitStory(state, value) {
        state.initStory = value;
    },

    setStoryAssetDialogBox(state, payload){
        state.currentStoryAssetHasNextAsset = false;
        state.currentStoryAssetHasPreviousAsset = false;

        state.currentStoryAssets.forEach((asset, index) => {
            if (asset.id === payload.id) {
                state.currentSelectedStoryAsset = asset;
                let nextImgObj = state.currentStoryAssets[index + 1];
                let previousImgObj = state.currentStoryAssets[index - 1];

                if (!nextImgObj) {
                    state.currentStoryAssetHasNextAsset = false;
                    state.currentStoryAssetHasPreviousAsset = true;
                }

                else if (!previousImgObj) {
                    state.currentStoryAssetHasNextAsset = true;
                    state.currentStoryAssetHasPreviousAsset = false;
                }

                else {
                    state.currentStoryAssetHasNextAsset = true;
                    state.currentStoryAssetHasPreviousAsset = true;
                }
            }
        })

        state.storyAssetDialogBox = payload.open;
        state.assetSelectedId = payload.id;
    },

    closeStoryAssetDialogBox(state){
        state.storyAssetDialogBox = false;
    },

    setAssetSelectedId(state, assetSelectedId){
        state.assetSelectedId = assetSelectedId;
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
                commit('setMailerStories', data.mailerStories);
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
                commit('setcurrentStoryAssets', response.data.story);
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
