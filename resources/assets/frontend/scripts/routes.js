import HomeComponent from './vue-component/pages/home/HomeComponent.vue';
import LoginComponent from './vue-component/pages/login/LoginComponent.vue';
import VideoComponent from './vue-component/pages/videos/VideosComponent.vue';
import VideoDetailComponent from './vue-component/pages/videos/VideoDetailComponent.vue';
import UploadVideoComponent from './vue-component/pages/upload/UploadVideoComponent.vue';
import PasswordResetTokenComponent from './vue-component/pages/loging/PasswordResetTokenComponent.vue';
import PasswordSetTokenComponent from './vue-component/pages/loging/PasswordSetTokenComponent.vue';
import VideoMoreDetail from './vue-component/pages/submission/VideomoredetailComponent.vue';
import VideoSubmissionComponent from './vue-component/forms/VideoSubmissionComponent.vue';
import UnsubscribeComponent from './vue-component/pages/unsubscribe/UnsubscribeComponent.vue';
import TermsConditionsComponent from './vue-component/pages/termscondition/TermsConditionComponent';
import ContractComponent from './vue-component/pages/contract/ContractComponent';
import Notfound from './vue-component/pages/404Component.vue';
import StoriesComponent from './vue-component/pages/stories/StoriesComponent';
import ClientComponent from './vue-component/pages/clients/ClientComponent';
import ClientStoriesComponent from './vue-component/pages/clients/stories/ClientStoriesComponent';
import ClientStoryDetailComponent from './vue-component/pages/clients/stories/ClientStoryDetailComponent';
import ClientVideosComponent from './vue-component/pages/clients/videos/ClientVideosComponent';
import ClientVideoDetailComponent from './vue-component/pages/clients/videos/ClientVideoDetailComponent';
import ClientPurchasedAssetsComponent from './vue-component/pages/clients/purchased/ClientPurchasedAssetsComponent';
import ClientOfferedAssetsComponent from './vue-component/pages/clients/offered/ClientOfferedAssetsComponent';
import ClientCollectionComponent from './vue-component/pages/collections/CollectionsComponent'


export const routes = [
    {
        path: '',
        name: 'home',
        components: {
            default: HomeComponent,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginComponent
    },

    {
        path: '/videos',
        name: 'videos',
        component: VideoComponent
    },

    {
        path: '/stories',
        name: 'stories',
        component: StoriesComponent
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
        path: '/password/set/:token/:email',
        name: 'set_password',
        component: PasswordSetTokenComponent
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
        children: [
            {
                path: '',
                name: 'client',
                component: ClientVideosComponent
            },

            {
                path: 'stories',
                name: 'client_stories',
                component: ClientStoriesComponent
            },

            {
                path: 'collections/accept_price/:collection_video_id',
                name: 'accept_quote',
                component: ClientPurchasedAssetsComponent
            },

            {
                path: 'stories/:alpha_id',
                name: 'client_story_detail',
                component: ClientStoryDetailComponent
            },

            {
                path: 'videos',
                name: 'client_videos',
                component: ClientVideosComponent,
            },

            {
                path: 'videos/:alpha_id',
                name: 'client_video_detail',
                component: ClientVideoDetailComponent
            },

            {
                path: 'purchased',
                name: 'client_purchased_assets',
                component: ClientPurchasedAssetsComponent,
            },

            {
                path: 'offered',
                name: 'client_offered_assets',
                component: ClientOfferedAssetsComponent,
            },

            {
                path: 'collections',
                name: 'client_collections',
                component: ClientCollectionComponent,
            },

        ],
    },

    {
        path: '*',
        name: 'notfound',
        component: Notfound
    },
];
