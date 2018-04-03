import HomeComponent from './vue-component/pages/home/HomeComponent.vue';
import VideoComponent from './vue-component/pages/videos/VideosComponent.vue';
import VideoDetailComponent from './vue-component/pages/videos/VideoDetailComponent.vue';

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
        path:'/videos:page',
        name: 'videos_page',
        component: VideoComponent
    },

    {
        path: '/videos/:id',
        name: 'videos_detail',
        component: VideoDetailComponent
    }
];