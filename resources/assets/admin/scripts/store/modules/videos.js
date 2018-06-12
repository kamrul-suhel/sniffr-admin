const state = {
    selectedVideos:[],
}

const mutations = {
    addVideo(state, video){
        state.selectedVideos.push(video);
        console.log('videos is added');
        console.log(state.selectedVideos);
    },

    removeVideo(state, currVideo){
        state.selectedVideos.forEach((video, index)=>{
            if(currVideo.id === video.id){
                state.selectedVideos.splice(index, 1);
            }
        })
    }
}

const actions = {

}

const getters = {
    getAllSelectedVideos(state){
        return state.selectedVideos;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}