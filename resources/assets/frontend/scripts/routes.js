import HomeComponent from './vue-component/pages/home/HomeComponent.vue';
import VideoComponent from './vue-component/pages/videos/VideosComponent.vue';
import VideoDetailComponent from './vue-component/pages/videos/VideoDetailComponent.vue';
import VideoSearchComponent from './vue-component/pages/search/SearchComponent.vue';

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
    }
];