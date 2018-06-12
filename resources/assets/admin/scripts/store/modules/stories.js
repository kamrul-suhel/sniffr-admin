const state = {
    selectedStories:[],
}

const mutations = {
    setStory(state, curStory){
        if(state.selectedStories.length <=0){
            state.selectedStories.push(curStory);
            return;
        }

        let foundStory = false;
        state.selectedStories.forEach((story)=>{
            if(story.id === curStory.id){
                foundStory = true;
            }
        })

        if(!foundStory){
            state.selectedStories.push(curStory);
        }
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