export const vue_fb = {}
vue_fb.install = function install(Vue, options) {
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {return}
        js = d.createElement(s)
        js.id = id
        js.src = "//connect.facebook.net/en_US/sdk.js"
        fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = function onSDKInit() {
        FB.init(options)
        FB.AppEvents.logPageView()
        Vue.FB = FB
        window.dispatchEvent(new Event('fb-sdk-ready'))
    }
    Vue.FB = undefined
}