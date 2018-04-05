import HomeComponent from './vue-component/pages/home/HomeComponent.vue';
import VideoComponent from './vue-component/pages/videos/VideosComponent.vue';
import VideoDetailComponent from './vue-component/pages/videos/VideoDetailComponent.vue';
import VideoSearchComponent from './vue-component/pages/search/SearchComponent.vue';
import VideoTagComponent from './vue-component/pages/search/TagsComponent.vue';
import UploadVideoComponent from './vue-component/pages/upload/UploadVideoComponent.vue';
import PasswordResetComponent from './vue-component/pages/loging/PasswordResetComponent.vue';
import PasswordResetTokenComponent from './vue-component/pages/loging/PasswordResetTokenComponent.vue';


export const routes = [
    {
        path: '',
        name: 'home',
        component: HomeComponent
    },

    {
        path:'/videos',
        name: 'videos',
        component: VideoComponent
    },

    {
        path: '/videos/:id',
        name: 'videos_detail',
        component: VideoDetailComponent
    },

    {
        path: '/search',
        name: 'videos_search',
        component: VideoSearchComponent
    },

    {
        path: '/videos/tag/:value',
        name: 'videos_tag',
        component: VideoTagComponent
    },

    {
        path: '/upload',
        name: 'upload_video',
        component: UploadVideoComponent
    },

    {
        path: 'password/reset',
        name: 'reset_password',
        component: PasswordResetComponent
    },

    {
        path: 'password/reset/:token',
        name: 'password_reset_token',
        component: PasswordResetTokenComponent
    }
];