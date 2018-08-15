import HomeComponent from './pages/home/HomeComponent.vue';
import VideoComponent from './pages/videos/VideosComponent.vue';
import VideoDetailComponent from './pages/videos/VideoDetailComponent.vue';
import UploadVideoComponent from './pages/upload/UploadVideoComponent.vue';
import PasswordResetTokenComponent from './pages/login/PasswordResetTokenComponent.vue';
import PasswordSetTokenComponent from './pages/login/PasswordSetTokenComponent.vue';
import VideoMoreDetail from './pages/submission/VideomoredetailComponent.vue';
import VideoSubmissionComponent from './component/forms/VideoSubmissionComponent.vue';
import UnsubscribeComponent from './pages/unsubscribe/UnsubscribeComponent.vue';
import TermsConditionsComponent from './pages/termscondition/TermsConditionComponent';
import ContractComponent from './pages/contract/ContractComponent';
import Notfound from './pages/404Component.vue';
import StoriesComponent from './pages/stories/StoriesComponent';
import StoryDetailComponent from './pages/stories/StoryDetailComponent.vue';
import ClientComponent from './pages/clients/ClientComponent';
import ClientStoryDetailComponent from './pages/clients/stories/ClientStoryDetailComponent';
import ClientVideoDetailComponent from './pages/clients/videos/ClientVideoDetailComponent';

import ClientProfileComponent from './pages/clients/ProfileComponent';
import ClientUserComponent from './pages/clients/CreateUserComponent';
import ClientEditUserComponent from './pages/clients/EditUserComponent';

import ClientCollectionComponent from './pages/collections/CollectionsComponent'

import ClientPurchaseOfferedComponent from './pages/clients/PurchasedOfferedComponent'


const Login = resolve => {
    require.ensure(['./pages/login/LoginComponent.vue'], () => {
        resolve(require('./pages/login/LoginComponent.vue'));
    })
};
// import LoginComponent from './pages/login/LoginComponent.vue';

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
        component: Login
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
        path: '/videos/:alpha_id',
        name: 'videos_detail',
        component: VideoDetailComponent
    },

    {
        path: '/stories/:alpha_id',
        name: 'stories_detail',
        component: StoryDetailComponent
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
                path: 'profile',
                name: 'client_profile',
                component: ClientProfileComponent,
            },

            {
                path: 'profile/:slug/users/create',
                name: 'client_create_user',
                component: ClientUserComponent
            },

            {
                path: '/client/profile/:slug/users/:userid/edit',
                name: 'client_edit_create_user',
                component: ClientEditUserComponent
            },

            {
                path: 'stories/:alpha_id',
                name: 'client_story_detail',
                component: ClientStoryDetailComponent
            },

            {
                path: 'videos/:alpha_id',
                name: 'client_video_detail',
                component: ClientVideoDetailComponent
            },
            {
                path: 'purchased',
                name: 'client_purchased_assets',
                component: ClientPurchaseOfferedComponent,
            },

            {
                path: 'offered',
                name: 'client_offered_assets',
                component: ClientPurchaseOfferedComponent,
                // component: ClientOfferedAssetsComponent,
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
