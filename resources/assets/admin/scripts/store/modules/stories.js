const state = {
    selectedStories:[],
}

const mutations = {
    setStory(state, story){
        state.selectedStories.push(story);
    },

    removeStory(state, currStory){
        state.selectedStories.forEach((story, index)=>{
            if(currStory.id === story.id){
                state.selectedStories.splice(index, 1);
            }
        })
    }
}

const actions = {

}

const getters = {
    getAllSelectedStories(state){
        return state.selectedStories;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}