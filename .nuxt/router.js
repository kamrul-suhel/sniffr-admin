import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _6d1b3b28 = () => import('../resources/nuxt/pages/videos/index.vue' /* webpackChunkName: "pages/videos/index" */).then(m => m.default || m)
const _993c004a = () => import('../resources/nuxt/pages/client/index.vue' /* webpackChunkName: "pages/client/index" */).then(m => m.default || m)
const _0123e28d = () => import('../resources/nuxt/pages/terms/index.vue' /* webpackChunkName: "pages/terms/index" */).then(m => m.default || m)
const _53abeb99 = () => import('../resources/nuxt/pages/stories/index.vue' /* webpackChunkName: "pages/stories/index" */).then(m => m.default || m)
const _83d9d422 = () => import('../resources/nuxt/pages/login/index.vue' /* webpackChunkName: "pages/login/index" */).then(m => m.default || m)
const _63f02318 = () => import('../resources/nuxt/pages/upload/form/index.vue' /* webpackChunkName: "pages/upload/form/index" */).then(m => m.default || m)
const _6225ae26 = () => import('../resources/nuxt/pages/submission/form/index.vue' /* webpackChunkName: "pages/submission/form/index" */).then(m => m.default || m)
const _7cd1e416 = () => import('../resources/nuxt/pages/client/profile/index.vue' /* webpackChunkName: "pages/client/profile/index" */).then(m => m.default || m)
const _c0037a18 = () => import('../resources/nuxt/pages/password/reset/_token/index.vue' /* webpackChunkName: "pages/password/reset/_token/index" */).then(m => m.default || m)
const _6d7e4dcb = () => import('../resources/nuxt/pages/client/stories/_alpha_id/index.vue' /* webpackChunkName: "pages/client/stories/_alpha_id/index" */).then(m => m.default || m)
const _3f4640f8 = () => import('../resources/nuxt/pages/client/profile/_slug/users/create/index.vue' /* webpackChunkName: "pages/client/profile/_slug/users/create/index" */).then(m => m.default || m)
const _25e8b060 = () => import('../resources/nuxt/pages/client/profile/_slug/users/_userid/edit/index.vue' /* webpackChunkName: "pages/client/profile/_slug/users/_userid/edit/index" */).then(m => m.default || m)
const _849f6ffe = () => import('../resources/nuxt/pages/password/set/_token/_email/index.vue' /* webpackChunkName: "pages/password/set/_token/_email/index" */).then(m => m.default || m)
const _b0e20676 = () => import('../resources/nuxt/pages/details/_code/index.vue' /* webpackChunkName: "pages/details/_code/index" */).then(m => m.default || m)
const _f6be2faa = () => import('../resources/nuxt/pages/unsubscribe/_email/index.vue' /* webpackChunkName: "pages/unsubscribe/_email/index" */).then(m => m.default || m)
const _7610de76 = () => import('../resources/nuxt/pages/stories/_alpha_id/index.vue' /* webpackChunkName: "pages/stories/_alpha_id/index" */).then(m => m.default || m)
const _42e00cd8 = () => import('../resources/nuxt/pages/videos/_alpha_id/index.vue' /* webpackChunkName: "pages/videos/_alpha_id/index" */).then(m => m.default || m)
const _e6548560 = () => import('../resources/nuxt/pages/contract/_token/accept/index.vue' /* webpackChunkName: "pages/contract/_token/accept/index" */).then(m => m.default || m)
const _412442c8 = () => import('../resources/nuxt/pages/upload_videos/index.vue' /* webpackChunkName: "pages/upload_videos/index" */).then(m => m.default || m)
const _7ee9ed55 = () => import('../resources/nuxt/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



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
			component: _6d1b3b28,
			name: "videos"
		},
		{
			path: "/client",
			component: _993c004a,
			name: "client"
		},
		{
			path: "/terms",
			component: _0123e28d,
			name: "terms"
		},
		{
			path: "/stories",
			component: _53abeb99,
			name: "stories"
		},
		{
			path: "/login",
			component: _83d9d422,
			name: "login"
		},
		{
			path: "/upload/form",
			component: _63f02318,
			name: "upload-form"
		},
		{
			path: "/submission/form",
			component: _6225ae26,
			name: "submission-form"
		},
		{
			path: "/client/profile",
			component: _7cd1e416,
			name: "client-profile"
		},
		{
			path: "/password/reset/:token?",
			component: _c0037a18,
			name: "password-reset-token"
		},
		{
			path: "/client/stories/:alpha_id?",
			component: _6d7e4dcb,
			name: "client-stories-alpha_id"
		},
		{
			path: "/client/profile/:slug/users/create",
			component: _3f4640f8,
			name: "client-profile-slug-users-create"
		},
		{
			path: "/client/profile/:slug/users/:userid?/edit",
			component: _25e8b060,
			name: "client-profile-slug-users-userid-edit"
		},
		{
			path: "/password/set/:token?/:email?",
			component: _849f6ffe,
			name: "password-set-token-email"
		},
		{
			path: "/details/:code?",
			component: _b0e20676,
			name: "details-code"
		},
		{
			path: "/unsubscribe/:email?",
			component: _f6be2faa,
			name: "unsubscribe-email"
		},
		{
			path: "/stories/:alpha_id",
			component: _7610de76,
			name: "stories-alpha_id"
		},
		{
			path: "/videos/:alpha_id",
			component: _42e00cd8,
			name: "videos-alpha_id"
		},
		{
			path: "/contract/:token?/accept",
			component: _e6548560,
			name: "contract-token-accept"
		},
		{
			path: "/upload:videos",
			component: _412442c8,
			name: "uploadvideos"
		},
		{
			path: "/",
			component: _7ee9ed55,
			name: "index"
		},
		{
			path: "/__laravel_nuxt__",
			component: _7ee9ed55,
			name: "__laravel_nuxt__"
		}
    ],
    
    
    fallback: false
  })
}
