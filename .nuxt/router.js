import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _f6237f3c = () => import('../resources/nuxt/pages/videos/index.vue' /* webpackChunkName: "pages/videos/index" */).then(m => m.default || m)
const _36398d9f = () => import('../resources/nuxt/pages/stories/index.vue' /* webpackChunkName: "pages/stories/index" */).then(m => m.default || m)
const _d5f157dc = () => import('../resources/nuxt/pages/client.vue' /* webpackChunkName: "pages/client" */).then(m => m.default || m)
const _df89f86e = () => import('../resources/nuxt/pages/client/purchased/index.vue' /* webpackChunkName: "pages/client/purchased/index" */).then(m => m.default || m)
const _24471dfe = () => import('../resources/nuxt/pages/client/offered/index.vue' /* webpackChunkName: "pages/client/offered/index" */).then(m => m.default || m)
const _4416392f = () => import('../resources/nuxt/pages/client/profile/index.vue' /* webpackChunkName: "pages/client/profile/index" */).then(m => m.default || m)
const _d99e7126 = () => import('../resources/nuxt/pages/client/video/_alpha_id/index.vue' /* webpackChunkName: "pages/client/video/_alpha_id/index" */).then(m => m.default || m)
const _43143885 = () => import('../resources/nuxt/pages/client/stories/_alpha_id/index.vue' /* webpackChunkName: "pages/client/stories/_alpha_id/index" */).then(m => m.default || m)
const _ffd87104 = () => import('../resources/nuxt/pages/client/profile/_slug/users/create/index.vue' /* webpackChunkName: "pages/client/profile/_slug/users/create/index" */).then(m => m.default || m)
const _58c09c54 = () => import('../resources/nuxt/pages/client/profile/_slug/users/_userid/edit/index.vue' /* webpackChunkName: "pages/client/profile/_slug/users/_userid/edit/index" */).then(m => m.default || m)
const _d4e4fd16 = () => import('../resources/nuxt/pages/login/index.vue' /* webpackChunkName: "pages/login/index" */).then(m => m.default || m)
const _534b53cb = () => import('../resources/nuxt/pages/upload/index.vue' /* webpackChunkName: "pages/upload/index" */).then(m => m.default || m)
const _4ec363da = () => import('../resources/nuxt/pages/terms/index.vue' /* webpackChunkName: "pages/terms/index" */).then(m => m.default || m)
const _c759361a = () => import('../resources/nuxt/pages/submission/form/index.vue' /* webpackChunkName: "pages/submission/form/index" */).then(m => m.default || m)
const _2331521e = () => import('../resources/nuxt/pages/upload/form/index.vue' /* webpackChunkName: "pages/upload/form/index" */).then(m => m.default || m)
const _7c2ce27a = () => import('../resources/nuxt/pages/password/reset/_token/index.vue' /* webpackChunkName: "pages/password/reset/_token/index" */).then(m => m.default || m)
const _f513278a = () => import('../resources/nuxt/pages/password/set/_token/_email/index.vue' /* webpackChunkName: "pages/password/set/_token/_email/index" */).then(m => m.default || m)
const _841d8364 = () => import('../resources/nuxt/pages/videos/_alpha_id/index.vue' /* webpackChunkName: "pages/videos/_alpha_id/index" */).then(m => m.default || m)
const _c97efb6a = () => import('../resources/nuxt/pages/details/_code/index.vue' /* webpackChunkName: "pages/details/_code/index" */).then(m => m.default || m)
const _10c3e665 = () => import('../resources/nuxt/pages/unsubscribe/_email/index.vue' /* webpackChunkName: "pages/unsubscribe/_email/index" */).then(m => m.default || m)
const _5c82396a = () => import('../resources/nuxt/pages/stories/_alpha_id/index.vue' /* webpackChunkName: "pages/stories/_alpha_id/index" */).then(m => m.default || m)
const _367b0e8a = () => import('../resources/nuxt/pages/contract/_token/accept/index.vue' /* webpackChunkName: "pages/contract/_token/accept/index" */).then(m => m.default || m)
const _6f64f55b = () => import('../resources/nuxt/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/videos",
			component: _f6237f3c,
			name: "videos"
		},
		{
			path: "/stories",
			component: _36398d9f,
			name: "stories"
		},
		{
			path: "/client",
			component: _d5f157dc,
			name: "client",
			children: [
				{
					path: "purchased",
					component: _df89f86e,
					name: "client-purchased"
				},
				{
					path: "offered",
					component: _24471dfe,
					name: "client-offered"
				},
				{
					path: "profile",
					component: _4416392f,
					name: "client-profile"
				},
				{
					path: "video/:alpha_id",
					component: _d99e7126,
					name: "client-video-alpha_id"
				},
				{
					path: "stories/:alpha_id",
					component: _43143885,
					name: "client-stories-alpha_id"
				},
				{
					path: "profile/:slug/users/create",
					component: _ffd87104,
					name: "client-profile-slug-users-create"
				},
				{
					path: "profile/:slug/users/:userid/edit",
					component: _58c09c54,
					name: "client-profile-slug-users-userid-edit"
				}
			]
		},
		{
			path: "/login",
			component: _d4e4fd16,
			name: "login"
		},
		{
			path: "/upload",
			component: _534b53cb,
			name: "upload"
		},
		{
			path: "/terms",
			component: _4ec363da,
			name: "terms"
		},
		{
			path: "/submission/form",
			component: _c759361a,
			name: "submission-form"
		},
		{
			path: "/upload/form",
			component: _2331521e,
			name: "upload-form"
		},
		{
			path: "/password/reset/:token?",
			component: _7c2ce27a,
			name: "password-reset-token"
		},
		{
			path: "/password/set/:token?/:email?",
			component: _f513278a,
			name: "password-set-token-email"
		},
		{
			path: "/videos/:alpha_id",
			component: _841d8364,
			name: "videos-alpha_id"
		},
		{
			path: "/details/:code?",
			component: _c97efb6a,
			name: "details-code"
		},
		{
			path: "/unsubscribe/:email?",
			component: _10c3e665,
			name: "unsubscribe-email"
		},
		{
			path: "/stories/:alpha_id",
			component: _5c82396a,
			name: "stories-alpha_id"
		},
		{
			path: "/contract/:token?/accept",
			component: _367b0e8a,
			name: "contract-token-accept"
		},
		{
			path: "/",
			component: _6f64f55b,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
