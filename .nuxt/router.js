import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _6d1b3b28 = () => import('../resources/nuxt/pages/videos/index.vue' /* webpackChunkName: "pages/videos/index" */).then(m => m.default || m)
const _53abeb99 = () => import('../resources/nuxt/pages/stories/index.vue' /* webpackChunkName: "pages/stories/index" */).then(m => m.default || m)
const _83d9d422 = () => import('../resources/nuxt/pages/login/index.vue' /* webpackChunkName: "pages/login/index" */).then(m => m.default || m)
const _6225ae26 = () => import('../resources/nuxt/pages/submission/form/index.vue' /* webpackChunkName: "pages/submission/form/index" */).then(m => m.default || m)
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
			path: "/submission/form",
			component: _6225ae26,
			name: "submission-form"
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
