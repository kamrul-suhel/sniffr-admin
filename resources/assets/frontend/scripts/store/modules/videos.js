import AssetVideoServices from '../../services/VideoServices'
const state = {
    //Dialog box
    videoDialogBox: false,
    videoLoading:false,

    videos: [],
    mailerVideos: [],
    mailerVideoCurrentIndex: '',
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
    purchasedVideos: [],
    offeredVideos:[],
    assetOfferedCurrentIndex: '',
    initVideo:false,
};

const getters = {
    getVideoDialogBox(state){
        return state.videoDialogBox;
    },

    getTotalOfferedVideos(state){
        return state.paginate.total;
    },

    getVideos(state) {
        return state.videos;
    },

    getCurrentVideoTags(state){
        return state.currentVideoTags;
    },

    getMailerVideoData(state) {
        return state.mailerVideos;
    },

    getMailerVideoCurrentIndex(state){
        return state.mailerVideoCurrentIndex
    },

    getVideoPaginateObject(state) {
        return state.paginate;
    },


    /**
     * Video dialogs box property
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

    getAssetOfferedCurrentIndex(state) {
        return state.assetOfferedCurrentIndex;
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
    },

    /**
     * ***************************************
     * Offered video
     * ***************************************
     */
    getOfferedVideos(state){
        return state.offeredVideos;
    },

    /**
     * ***************************************
     * Purchased vides
     * ***************************************
     */
    getPurchasedVideos(state){
        return state.purchasedVideos;
    },

    getinitVideo(state){
        return state.initVideo;
    }
};

const mutations = {

    setVideoData(state, data) {
        state.videos = data;
    },

    setMailerVideoData(state, data) {
        state.mailerVideos = data;
    },

    setMailerVideoCurrentIndex(state, value){
        state.mailerVideoCurrentIndex = value;
    },

    setVideoPaginationObject(state, paginate) {
        state.paginate = paginate;
    },




    /**
     * Video dialogs box setter
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

    setAssetOfferedCurrentIndex(state, value) {
        state.assetOfferedCurrentIndex = value;
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

    setEnterRouteObject(state, route) {
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

    setResetVideos(state){
        state.currentVideoAlphaId = '';
        state.currentVideo = '';
        state.videoDialogBox = false;
        state.current_route_obj = ''
        state.previewRouteObject = '';
        state.videoLoading =false;
        state.videos= []
        state.mailerVideos = []
        state.paginate = ''
        state.currentVideoTags= []
        state.nextVideoAlphaId = ''
        state.previousVideoAlphaId= ''
        state.video_detail = {}
        state.purchasedVideos = []
        state.offeredVideos = []
        state.initVideo = false
    },

    /**
     * Video detail page setters
     */

    setVideoDetailData(state, data) {
        state.video_detail = data.video;
        state.video_detail.iframe = data.iframe;
    },


    /**
     * ***************************************
     * Offered video
     * ***************************************
     */
    setOfferedVideos(state, videos){

        let allVideos = AssetVideoServices.processVideoData(videos);
        state.offeredVideos = allVideos;
    },


    /**
     * ***************************************
     * Purchased video
     * ***************************************
     */
    setPurchasedVideos(state, videos){
        let allVideos = AssetVideoServices.processVideoData(videos)
        state.purchasedVideos = allVideos
    },

    setInitVideo(state, value){
        state.initVideo = value;
    },

    setSuggestNextPrevious(state) {
        let currIndex = state.mailerVideoCurrentIndex;
        let allVideos = state.mailerVideos;
        let currentAlphaId = '';
        let currentVideo = '';
        let previousAlphaId = '';
        let nextAlphaId = '';
        let currentVideoPosition = currIndex;
        let totalVideos = allVideos.length - 1;
        let hasNextPage = state.paginate.last_page;

        if (allVideos[Object.keys(allVideos)[currIndex]]) {
            currentAlphaId = allVideos[Object.keys(allVideos)[currIndex]].alpha_id;
            currentVideo = allVideos[Object.keys(allVideos)[currIndex]];
        }

        if (allVideos[Object.keys(allVideos)[currIndex - 1]]) {
            previousAlphaId = allVideos[Object.keys(allVideos)[currIndex - 1]].alpha_id;
        }

        if (allVideos[Object.keys(allVideos)[currIndex + 1]]) {
            nextAlphaId = allVideos[Object.keys(allVideos)[currIndex + 1]].alpha_id;
        }

        state.previousVideoAlphaId = previousAlphaId;
        state.currentVideoAlphaId = currentAlphaId;
        state.nextVideoAlphaId = nextAlphaId;

        state.currentVideo = currentVideo;
        state.videoLoading =  false;

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
                commit('setMailerVideoData', data.mailerVideos);
                commit('setVideoPaginationObject', data.videos);
            })
            .catch((error) => {
                console.log('Not connect: ' + error);
            });
    },

    /**
     * Video dialogs box action
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
            data.value = state.current_route_obj.query.value
        }

        if (state.current_route_obj.query.type != 'undefined' && state.current_route_obj.query.type === 'offered') {
            data.offered = true;
        }
        let url = '/search/videos';

        axios.post(url, data)
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
                commit('setVideoDetailData', response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },


    /**
     * ***************************************
     * Offered video
     * ***************************************
     */
    fetchOfferedVideos({commit}, payload){
        axios.get(payload)
            .then((response) => {
                commit('setOfferedVideos', response.data.videos);
                commit('setVideoPaginationObject', response.data.videos);
                commit('setInitVideo', true);
            },
            (error) => {
                console.log(error);
            });
    },


    /**
     * ***************************************
     * Purchased video
     * ***************************************
     */

    fetchPurchasedVideos({commit}, payload){

        axios.get(payload)
            .then((response) => {
                    commit('setPurchasedVideos', response.data.videos);
                    commit('setVideoPaginationObject', response.data.videos);
                },
                (error) => {
                });
    },

    fetchOfferedDialogNextPrevious({commit, state}) {
        let currIndex = state.assetOfferedCurrentIndex;
        let allVideos = state.offeredVideos;
        let currentAlphaId = '';
        let previousAlphaId = '';
        let nextAlphaId = '';
        let currentVideoPosition = currIndex;
        let totalVideos = allVideos.length - 1;
        let hasNextPage = state.paginate.last_page;

        if (allVideos[Object.keys(allVideos)[currIndex]]) {
            currentAlphaId = allVideos[Object.keys(allVideos)[currIndex]].alpha_id;
        }

        if (allVideos[Object.keys(allVideos)[currIndex - 1]]) {
            previousAlphaId = allVideos[Object.keys(allVideos)[currIndex - 1]].alpha_id;
        }

        if (allVideos[Object.keys(allVideos)[currIndex + 1]]) {
            nextAlphaId = allVideos[Object.keys(allVideos)[currIndex + 1]].alpha_id;
        }

        if (currentVideoPosition === totalVideos && hasNextPage) {
            // if has next page, do next page fetch the data
        }

        state.previousVideoAlphaId = previousAlphaId;
        state.currentVideoAlphaId = currentAlphaId;
        state.nextVideoAlphaId = nextAlphaId;

        // now fetch the data form server
        let data = {alpha_id: currentAlphaId};
        let url = '/search/videos';

        axios.post(url, data)
            .then((response) => {
                let currVideo = response.data.current_video;
                commit('setCurrentVideo', currVideo)
                commit('setVideoLoading', false)
            });

    }


};

export default {
    state,
    getters,
    mutations,
    actions
};
