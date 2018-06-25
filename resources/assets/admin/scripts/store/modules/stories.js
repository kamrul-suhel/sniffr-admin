const state = {
    selectedStories: [],
    stories: {},
    queryObject: {}
}

const mutations = {
    setStory(state, curStory) {
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
    },

    setQueryObject(state, queryObject) {
        state.queryObject = queryObject;
    }
}

const actions = {
    getMailerStories({commit, state}, payload) {
        return new Promise((resolve, reject) => {
            axios.get(payload)
                .then((stories) => {
                        state.stories = stories.data.stories;
                        resolve();
                    },
                    (error) => {
                        return reject();
                    });
        })
    }
}

const getters = {
    getAllSelectedStories(state) {
        return state.selectedStories;
    },

    getStories(state) {
        return state.stories;
    },

    getQueryObject(state) {
        return state.queryObject;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}