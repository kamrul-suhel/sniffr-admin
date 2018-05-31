import HomeComponent from './vue-component/pages/home/HomeComponent.vue';
import VideoComponent from './vue-component/pages/videos/VideosComponent.vue';
import VideoDetailComponent from './vue-component/pages/videos/VideoDetailComponent.vue';
import VideoSearchComponent from './vue-component/pages/search/SearchComponent.vue';
import VideoTagComponent from './vue-component/pages/search/TagsComponent.vue';
import UploadVideoComponent from './vue-component/pages/upload/UploadVideoComponent.vue';
import PasswordResetTokenComponent from './vue-component/pages/loging/PasswordResetTokenComponent.vue';
import VideoMoreDetail from './vue-component/pages/submission/VideomoredetailComponent.vue';
import VideoSubmissionComponent from './vue-component/forms/VideoSubmissionComponent.vue';
import UnsubscribeComponent from './vue-component/pages/unsubscribe/UnsubscribeComponent.vue';
import TermsConditionsComponent from './vue-component/pages/termscondition/TermsConditionComponent';
import ContractComponent from './vue-component/pages/contract/ContractComponent';
import Notfound from './vue-component/pages/404Component.vue';
import ClientComponent from './vue-component/pages/clients/ClientComponent';
import ClientVideosComponent from './vue-component/pages/clients/ClientVideosComponent';
import ClientVideoDetailComponent from './vue-component/pages/clients/ClientVideoDetailComponent';
import ClientVideoDownloadComponent from './vue-component/pages/clients/ClientVideoDownloadComponent';
import ClientStoriesComponent from './vue-component/pages/clients/ClientStoriesComponent';
import ClientStoryDetailComponent from './vue-component/pages/clients/ClientStoryDetailComponent';
import ClientDownloadedStoriesComponent from './vue-component/pages/clients/ClientDownloadedStoriesComponent.vue';


export const routes = [
    {
        path: '',
        name: 'home',
        components: {
            default: HomeComponent,
        }
    },

    {
        path: '/videos',
        name: 'videos',
        component: VideoComponent
    },

    {
        path: '/videos/:id',
        name: 'videos_detail',
        component: VideoDetailComponent
    },

    {
        path: '/contract/:token/accept',
        name: 'contract_accept',
        component: ContractComponent
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
        path: '/details/:code',
        name: 'video_more_details_code',
        component: VideoMoreDetail
    },

    {
        path: '/submission/form',
        name: 'iframe_video_submission',
        component: VideoSubmissionComponent
    },

    {
        path: '/upload/form',
        name: 'iframe_video_upload',
        component: UploadVideoComponent
    },

    {
        path: '/details',
        name: 'video_more_details',
        component: VideoMoreDetail
    },

    {
        path: '/password/reset',
        name: 'reset_password',
        component: PasswordResetTokenComponent
    },

    {
        path: '/password/reset/:token',
        name: 'password_reset_token',
        component: PasswordResetTokenComponent
    },

    {
        path: '/unsubscribe/:email',
        name: 'unsubscribe_user',
        component: UnsubscribeComponent
    },
    {
      path: '/terms',
      name: 'termsconditions',
      component: TermsConditionsComponent
    },

    {
        path: '/client',
        component: ClientComponent,
        children:[
            {
                path: '',
                name: 'client',
                component:ClientVideosComponent
            },

            {
                path: 'video/:detail',
                name: 'client_video_detail',
                component: ClientVideoDetailComponent
            },

            {
                path: 'stories',
                name: 'client_stories',
                component: ClientStoriesComponent
            },

            {
                path: 'stories/downloaded',
                name: 'client_downloaded_stories',
                component: ClientDownloadedStoriesComponent
            },

            {
                path: 'story/show/:alpha_id',
                name: 'client_story_detail',
                component: ClientStoryDetailComponent
            },

            {
                path: 'downloads',
                name: 'client_video_download',
                component: ClientVideoDownloadComponent
            },

        ],
    },

    {
        path: '*',
        name: 'notfound',
        component: Notfound
    },
];
