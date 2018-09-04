
const state = {
    stories: [],
    mailerStories: [],
    paginate: '',

    offeredStories: [],

    purchasedStories: [],
    initStory: false,

    currentStory: {},

    currentStoryAssets: [],
    currentSelectedStoryAsset: {},
    currentStoryHasNextAsset: false,
    currentStoryNextAssetId: null,
    currentStoryHasPreviousAsset: false,
    currentStoryPreviousAssetId: null,
    storyAssetDialogBox: false,
    assetSelectedId: null,


    //admin
    selectedStories: [],
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
        return state.currentStory;
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

    getStoryAssetDialogBox(state) {
        return state.storyAssetDialogBox;
    },

    getAssetSelectedId(state) {
        return state.assetSelectedId;
    },

    getCurrentSelectedStoryAsset(state) {
        return state.currentSelectedStoryAsset;
    },

    getStoryAssetHasNextAsset(state) {
        return state.currentStoryHasNextAsset;
    },

    getCurrentStoryPreviousAssetId(state) {
        return state.currentStoryPreviousAssetId;
    },

    getStoryAssetHasPreviousAsset(state) {
        return state.currentStoryHasPreviousAsset;
    },

    getCurrentStoryNextAssetId(state) {
        return state.currentStoryNextAssetId;
    },


    /*
    ***********************************
        Admin Getters
    ***********************************
     */

    getAllSelectedStories(state) {
        return state.selectedStories;
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
        state.currentStory = story.story;
    },

    setCurrentStoryAssets(state, story) {
        state.currentStoryAssets = [];
        if (story.assets.length > 0) {
            state.currentStoryAssets = story.assets;
        }
    },

    setResetStories(state) {
        state.stories = [];
        state.mailerStories = [];
        state.paginate = '';
        state.currentStory = '';
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

    setStoryAssetDialogBox(state, payload) {
        state.currentStoryHasNextAsset = false;
        state.currentStoryHasPreviousAsset = false;

        state.currentStoryAssets.forEach((asset, index) => {
            if (asset.id === payload.id) {
                state.currentSelectedStoryAsset = asset;
                let nextImgObj = state.currentStoryAssets[index + 1];
                let previousImgObj = state.currentStoryAssets[index - 1];

                if (!nextImgObj) {
                    state.currentStoryHasNextAsset = false;
                    state.currentStoryHasPreviousAsset = true;

                    state.currentStoryNextAssetId = null;
                    state.currentStoryPreviousAssetId = previousImgObj.id;
                }

                else if (!previousImgObj) {
                    state.currentStoryHasNextAsset = true;
                    state.currentStoryHasPreviousAsset = false;

                    state.currentStoryNextAssetId = nextImgObj.id;
                    state.currentStoryPreviousAssetId = null;
                }

                else {
                    state.currentStoryHasNextAsset = true;
                    state.currentStoryHasPreviousAsset = true;

                    state.currentStoryNextAssetId = nextImgObj.id;
                    state.currentStoryPreviousAssetId = previousImgObj.id;
                }
            }
        })

        state.storyAssetDialogBox = payload.open;
        state.assetSelectedId = payload.id;
    },

    closeStoryAssetDialogBox(state) {
        state.storyAssetDialogBox = false;
    },

    setAssetSelectedId(state, assetSelectedId) {
        state.assetSelectedId = assetSelectedId;
    },

    setCurrentStoryPreviousAssetId(state, assetId) {
        state.currentStoryPreviousAssetId = assetId;
    },

    setCurrentStoryNextAssetId(state, assetId) {
        state.currentStoryNextAssetId = assetId;
    },


    /*
    ***********************************
        Admin Mutation
    ***********************************
     */

    addStory(state, curStory) {
        if (state.selectedStories.length <= 0) {
            state.selectedStories.push(curStory);
            return;
        }

        let foundStory = false;
        state.selectedStories.forEach((story) => {
            if (story.id === curStory.id) {
                foundStory = true;
            }
        })

        if (!foundStory) {
            state.selectedStories.push(curStory);
        }
    },

    removeStory(state, currStory) {
        state.selectedStories.forEach((story, index) => {
            if (currStory.id === story.id) {
                state.selectedStories.splice(index, 1);
            }
        })
    }
};

const actions = {
    fetchStories({commit}, payload = {}) {
        let url = '/search/stories';
        if (payload.page && payload.page != 0) {
            url = url + '?page=' + payload.page;
        }

        if (payload.search && payload.search != '') {
            url = url + '&search=' + payload.search;
        }

        this.$axios.$post(url)
            .then((response) => {
                let data = response;
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
        this.$axios.setHeader('X-Requested-With', 'XMLHttpRequest');
        this.$axios.$get(url)
            .then((response) => {
                commit('setCurrentStory', response);
                commit('setCurrentStoryAssets', response.story);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    fetchOfferedStories({commit}, payload) {
        this.$axios.setHeader('X-Requested-With', 'XMLHttpRequest');
        this.$axios.$get(payload)
            .then((response) => {
                    commit('setOfferedStories', response.stories);
                    commit('setStoriesPaginateObject', response.stories);
                    commit('setInitStory', true);
                },
                (error) => {
                    console.log(error);
                });
    },

    fetchPurchasedStories({commit}, payload) {
        this.$axios.setHeader('X-Requested-With', 'XMLHttpRequest');
        this.$axios.$get(payload)
            .then((response) => {
                    commit('setPurchasedStories', response.stories);
                    commit('setStoriesPaginateObject', response.stories);
                    commit('setInitStory', true);
                },
                (error) => {
                    console.log(error);
                });
    },


    /*
    ***********************************
        Admin Action
    ***********************************
     */
    getMailerStories({commit, state}, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.$post(payload)
                .then((stories) => {
                        state.stories = stories.stories;
                        resolve();
                    },
                    (error) => {
                        return reject();
                    });
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
