const state = {
    //Dialog box
    videoDialogBox: false,
    videoLoading:false,


    videos: null,
    mailer_videos: null,
    paginate: '',


    /**
     * Video Dialog box property
     */

    currentVideoAlphaId:'',
    currentVideo:'',
    currentVideoTags: [],
    nextVideoAlphaId : '',
    previousVideoAlphaId: '',

    current_route_obj: '',
    previewRouteObject:'',


    /**
     * Video detail page property
     */
    video_detail: {},
};

const getters = {
    getVideoDialogBox(state){
        return state.videoDialogBox;
    },

    getVideos(state) {
        return state.videos;
    },

    getCurrentVideoTags(state){
        return state.currentVideoTags;
    },

    getCurrentVideo(state){
        return state.currentVideo;
    },

    getMailerVideoData(state) {
        return state.mailer_videos;
    },

    getVideoPaginateObject(state) {
        return state.paginate;
    },


    /**
     * Video dialog box property
      */

    getEnterStateUrl(state) {
        return state.previewRouteObject.fullPath;
    },

    getCurrentStateUrl(state){
        return state.current_route_obj.fullPath;
    },

    getVideoLoading(state){
        return state.videoLoading;
    },




    getCurrentVideo(state) {
        return state.currentVideo;
    },

    getCurrentVideoAlphaId() {
        return state.currentVideoAlphaId;
    },

    getNextVideoAlphaId() {
        return state.nextVideoAlphaId;
    },

    getPreviousVideoAlphaId() {
        return state.previousVideoAlphaId;
    },


    /**
     * Video detail getters
     */

    getVideoDetailData(state) {
        return state.video_detail;
    },


    getCurrentRouteObject(state){
        return state.current_route_obj;
    }
};

const mutations = {

    setVideoData(state, data) {
        state.videos = data;
    },

    setMailerVideoData(state, data) {
        state.mailer_videos = data;
    },

    setVideoPaginationObject(state, paginate) {
        state.paginate = paginate;
    },




    /**
     * Video dialog box setter
     */

    setVideoDialogBox(state, value){
        state.videoDialogBox = value;
    },

    setVideoLoading(state, value){
        state.videoLoading = value;
    },

    setCurrentVideo(state, currentVideo){
        state.currentVideo = currentVideo;
    },

    setCurrentVideoAlphaId(state, alphaId){
        state.currentVideoAlphaId = alphaId;
    },

    setNextVideoAlphaId(state, alphaId){
        state.nextVideoAlphaId = alphaId;
    },

    setPreviousVideoAlphaId(state, alphaId){
        state.previousVideoAlphaId = alphaId
    },

    setCurrentVideoTags(state, data){
        state.currentVideoTags = [];
        if (data.current_video.tags.length > 0) {
            state.currentVideoTags.push(...data.current_video.tags);
        } else {
            this.currentVideoTags = [];
        }
    },

    setCurrentRouteObject(state, route) {
        state.current_route_obj = route;
    },

    setEntereRouteObject(state, route) {
        state.previewRouteObject = route;
    },

    setResetVideoDialogObject(state) {
        state.currentVideoAlphaId = '';
        state.currentVideo = '';
        state.videoNextAlphaId = '';
        state.videoPreviousAlphaId = '';
        state.videoDialogBox = false;
        state.current_route_obj = ''
        state.previewRouteObject = '';
    },



    /**
     * Video detail page setters
     */

    setVideoDetailData(state, data) {
        state.video_detail = data.video;
        state.video_detail.iframe = data.iframe;
    }
};

const actions = {
    getVideoData({commit}, payload = {}) {
        let url = '/search/videos';

        if (payload.page && payload.page != 0) {
            url = url + '?page=' + payload.page;
        }

        if (payload.search && payload.search != '') {
            url = url + '&search=' + payload.search;
        }

        if (payload.tag && payload.tag != '') {
            url = url + '&tag=' + payload.tag;
        }

        axios.post(url)
            .then((response) => {
                let data = response.data;
                commit('setVideoData', data.videos.data);
                commit('setMailerVideoData', data.mailer_videos);
                commit('setVideoPaginationObject', data.videos);
            })
            .catch((error) => {
                console.log('Not connect: ' + error);
            });
    },



    /**
     * Video dialog box action
     */

    getVideoNextAndPrevLink({commit, state}, payload) {
        let data = {
            'alpha_id': payload.alpha_id
        };
        let request_url = state.current_route_obj.name;


        if(state.current_route_obj.query.search){
            data.search = state.current_route_obj.query.search
        }

        if(state.current_route_obj.query.tag){
            data.tag = state.current_route_obj.query.tag
        }

        //Featured videos
        if (request_url === 'home') {
            data.featured = true;
        }

        //Search video url
        if (request_url === 'videos_search') {
            data.value = current_route_obj.query.value
        }

        axios.post('/search/videos', data)
            .then((response) => {
                commit('setCurrentVideo', response.data.current_video);
                commit('setCurrentVideoTags', response.data);
                commit('setNextVideoAlphaId', response.data.next_video_alpha_id);
                commit('setPreviousVideoAlphaId', response.data.prev_video_alpha_id);
                commit('setVideoLoading', false);
            })
            .catch((error) => {
                console.log(error);
            });
    },


    /**
     * Video detail page action
     */
    getVideoDetailData({commit}, payload = {}) {
        let url = '/videos';
        if (payload.alpha_id && payload.alpha_id != 0) {
            url = url + '/' + payload.alpha_id;
        }
        axios.get(url)
            .then((response) => {
                commit('');
                commit('setVideoDetailData', response.data);
            })
            .catch((error) => {
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