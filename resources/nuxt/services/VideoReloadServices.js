export default class VideoReloadServices {
    reloadAll(){
        this.reloadFacebook();
        this.reloadInstagrm();
        this.reloadTwitter();
        this.reloadVideoJs();
    }

    reloadFacebook() {
        if (!document.getElementById('facebook-jssdk')) {
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.11&appId=151068855526504";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

        } else {
            setTimeout(() => {
                window.FB.XFBML.parse();
            }, 100);

        }
    }

    reloadTwitter(){
        TwitterWidgetsLoader.load(function (twttr) {
            var tweets = jQuery(".tweet");

            $(tweets).each(function (t, tweet) {
                var id = jQuery(this).attr('id');
                twttr.widgets.createVideo(id, tweet).then(function (el) {
                    widget_type = video
                });
            });
        });
    }

    reloadVideoJs() {

        let videojs1 = document.createElement('script');
        videojs1.type = "text/javascript";
        videojs1.src = "/assets/scripts/video.js";

        let vimeo = document.createElement('script');
        vimeo.type = "text/javascript";
        vimeo.src = "/assets/scripts/videojs-vimeo.js";
        $('body').append(videojs1);
        $('body').append(vimeo);

    }

    reloadInstagrm() {
        var src = '//platform.instagram.com/en_US/embeds.js';
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = src;
        s.async = true;

        setTimeout(function () {
            if (typeof window.instgrm !== 'undefined') {
                $('body').append(s);
                window.instgrm.Embeds.process();
            }else{
                $('body').append(s);
            }
        }, 500);
    }
}
