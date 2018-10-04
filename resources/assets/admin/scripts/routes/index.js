const MailerComponent = resolve => {
    require.ensure(['../pages/mailer/MailerComponent'], () => {
        resolve(require('../pages/mailer/MailerComponent'))
    })
};

const NotFound = resolve => {
    require.ensure(['../404Component.vue'], () => {
        resolve(require('../404Component.vue'))
    })
};

const Login = resolve => {
    require.ensure(['../pages/login/LoginComponent.vue'], () => {
        resolve(require('../pages/login/LoginComponent.vue'));
    })
};

export const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },

    {
        path: '/admin/mailers/create',
        name: 'admin.mailers.create',
        component: MailerComponent
    },

    {
        path: '*',
        name: 'notfound',
        component: NotFound
    },
];
