import HomeComponent from './pages/home/HomeComponent.vue';

const VideoComponent = resolve => {
    require.ensure('./pages/videos/VideosComponent.vue', () => {
        resolve(require('./pages/videos/VideosComponent.vue'))
    })
}

const VideoDetailComponent = resolve => {
    require.ensure('./pages/videos/VideoDetailComponent.vue', () => {
        resolve(require('./pages/videos/VideoDetailComponent.vue'))
    })
}

const VideoMoreDetail = resolve => {
    require.ensure(['./pages/submission/VideomoredetailComponent.vue'], () => {
        resolve(require('./pages/submission/VideomoredetailComponent.vue'))
    })
}

const VideoSubmissionComponent = resolve => {
    require.ensure(['./component/forms/VideoSubmissionComponent.vue'], () => {
        resolve(require('./component/forms/VideoSubmissionComponent.vue'))
    })
}

const UnsubscribeComponent = resolve => {
    require.ensure(['./pages/unsubscribe/UnsubscribeComponent.vue'], () => {
        resolve(require('./pages/unsubscribe/UnsubscribeComponent.vue'))
    })
}

const TermsConditionsComponent = resolve => {
    require.ensure(['./pages/termscondition/TermsConditionComponent'], () => {
        resolve(require('./pages/termscondition/TermsConditionComponent'))
    })
}

const ContractComponent = resolve => {
    require.ensure(['./pages/contract/ContractComponent'], () => {
        resolve(require('./pages/contract/ContractComponent'))
    })
}
const NotFound = resolve => {
    require.ensure(['./pages/404Component.vue'], () => {
        resolve(require('./pages/404Component.vue'))
    })
}

const StoryDetailComponent = resolve => {
    require.ensure(['./pages/stories/StoryDetailComponent.vue'], () => {
        resolve(require('./pages/stories/StoryDetailComponent.vue'))
    })
}

const ClientComponent = resolve => {
    require.ensure(['./pages/clients/ClientComponent'], () => {
        resolve(require('./pages/clients/ClientComponent'))
    })
}

const ClientStoryDetailComponent = resolve => {
    require.ensure(['./pages/clients/stories/ClientStoryDetailComponent'], () => {
        resolve(require('./pages/clients/stories/ClientStoryDetailComponent'))
    })
}

const ClientVideoDetailComponent = resolve => {
    require.ensure(['./pages/clients/videos/ClientVideoDetailComponent'], () => {
        resolve(require('./pages/clients/videos/ClientVideoDetailComponent'))
    })
}

const ClientProfileComponent = resolve => {
    require.ensure(['./pages/clients/ProfileComponent'], () => {
        resolve(require('./pages/clients/ProfileComponent'))
    })
}

const ClientEditUserComponent = resolve => {
    require.ensure(['./pages/clients/EditUserComponent'], () => {
        resolve(require('./pages/clients/EditUserComponent'))
    })
}

const ClientCollectionComponent = resolve => {
    require.ensure(['./pages/collections/CollectionsComponent'], () => {
        resolve(require('./pages/collections/CollectionsComponent'))
    })
}

const ClientPurchaseOfferedComponent = resolve => {
    require.ensure(['./pages/clients/PurchasedOfferedComponent'], () => {
        resolve(require('./pages/clients/PurchasedOfferedComponent'))
    })
}


const UploadVideoComponent = resolve => {
    require.ensure(['./pages/upload/UploadVideoComponent.vue'], () => {
        resolve(require('./pages/upload/UploadVideoComponent.vue'))
    })
}

const Login = resolve => {
    require.ensure(['./pages/login/LoginComponent.vue'], () => {
        resolve(require('./pages/login/LoginComponent.vue'));
    })
};

const PasswordResetTokenComponent = resolve => {
    require.ensure(['./pages/login/PasswordResetTokenComponent.vue'], () => {
        resolve(require('./pages/login/PasswordResetTokenComponent.vue'))
    })
}

const PasswordSetTokenComponent = resolve => {
    require.ensure(['./pages/login/PasswordSetTokenComponent.vue'], () => {
        resolve(require('./pages/login/PasswordSetTokenComponent.vue'))
    })
}

const ClientUserComponent = resolve => {
    require.ensure(['./pages/clients/CreateUserComponent'], () => {
        resolve(require('./pages/clients/CreateUserComponent'))
    })
}

const StoriesComponent = resolve => {
    require.ensure(['./pages/stories/StoriesComponent.vue'], () => {
        resolve(require('./pages/stories/StoriesComponent.vue'));
    })
}

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
        component: NotFound
    },
];
