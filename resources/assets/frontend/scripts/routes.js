import HomeComponent from './vue-component/pages/home/HomeComponent.vue';
import VideoComponent from './vue-component/pages/videos/VideosComponent.vue';

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
    }
];