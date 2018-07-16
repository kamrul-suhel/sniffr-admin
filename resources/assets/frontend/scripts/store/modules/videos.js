const state = {
    videos: null,
    mailer_videos: null,
    paginate: '',


    /**
     * Video Dialog box property
     */

    video_dialog_current_alpha_id: '',
    video_dialog_current_video: '',
    video_dialog_next_alpha_id: '',
    video_dialog_prev_alpha_id: '',

    currentVideoTags: [],

    current_route_obj: '',


    /**
     * Video detail page property
     */

    video_detail: {},
    tags: [],
};

const getters = {
    getVideoData(state) {
        return state.videos;
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
        return state.current_route_obj.fullPath;
    },

    getCurrentVideoTags(state){
        return state.currentVideoTags;
    },

    getVideoDialogBox(state) {
        return state.video_dialog_box;
    },

    getCurrentVideoForDialog(state) {
        return state.video_dialog_current_video;
    },

    getCurrentRecommendedForDialog(state) {
        return state.video_dialog_current_video;
    },

    getCurrentMailerVideoForDialog(state) {
        return state.video_dialog_current_video;
    },

    getCurrentVideoAlphaId() {
        return state.video_dialog_current_alpha_id;
    },

    getNextVideoAlphaId() {
        return state.video_dialog_next_alpha_id;
    },

    getPrevVideoAlphaId() {
        return state.video_dialog_prev_alpha_id;
    },


    /**
     * Video detail getters
     */

    getVideoDetailData(state) {
        return state.video_detail;
    },

    getVideoDetailTags(state) {
        return state.tags;
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

    setVideoDialogBox(state, data) {
        state.video_dialog_box = true;
        state.video_dialog_current_alpha_id = data.current_video.alpha_id;
        state.video_dialog_current_video = data.current_video;
        state.video_dialog_next_alpha_id = data.next_video_alpha_id;
        state.video_dialog_prev_alpha_id = data.prev_video_alpha_id;
    },

    setCurrentVideoTags(state, data){
        if (data.current_video.tags.length > 0) {
            state.tags.push(...data.current_video.tags);
        } else {
            this.tags = [];
        }
    },

    setRouteObject(state, route) {
        state.current_route_obj = route;
    },

    setResetVideoDialogObject(state) {
        state.video_dialog_current_alpha_id = '';
        state.video_dialog_current_video = '';
        state.video_dialog_next_alpha_id = '';
        state.video_dialog_prev_alpha_id = '';

        state.current_route_obj = ''
    },



    /**
     * Video detail page setters
     */

    setVideoDetailData(state, data) {
        state.video_detail = data.video;
        state.video_detail.iframe = data.iframe;
    },

    setVideoDetailTags(state, data) {
        if (data.video.tags.length > 0) {
            state.tags.push(...data.video.tags);
        }
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
        let data = {};
        let request_url = state.current_route_obj.name;


        if(request_url === 'videos'){
            data = {'alpha_id': payload.alpha_id};
        }

        if(state.current_route_obj.query.search){
            data = {
                'alpha_id': payload.alpha_id,
                'search' : state.current_route_obj.query.search
            }
        }

        if(state.current_route_obj.query.tag){
            data = {
                'alpha_id': payload.alpha_id,
                'tag' : state.current_route_obj.query.tag
            }
        }

        //Featured videos
        if (request_url === 'home') {
            data = {'featured':'true', 'alpha_id': payload.alpha_id};
        }

        //Search video url
        if (request_url === 'videos_search') {
            data = {'value':state.current_route_obj.query.value}
        }

        axios.post('/search/videos', data)
            .then((response) => {
                commit('setVideoDialogBox', response.data);
                commit('setCurrentVideoTags', response.data);


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
                commit('setVideoDetailTags', response.data);
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