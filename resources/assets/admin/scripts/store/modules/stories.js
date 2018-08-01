const state = {
    selectedStories: [],
    stories: {}
};

const mutations = {
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
    getMailerStories({commit, state}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(payload)
                .then((stories) => {
                        state.mailerStories = stories.data.mailer_stories;
                        resolve();
                    },
                    (error) => {
                        return reject();
                    });
        })
    }
};

const getters = {
    getAllSelectedStories(state) {
        return state.selectedStories;
    },

    getStories(state) {
        return state.stories;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};