<script src="/assets/admin/js/video.js"></script>
<script src="/assets/admin/js/videojs-vimeo.js"></script>

<script type="text/javascript">
    $(document).ready(function(){
        $('.favorite').click(function(){
            if($(this).data('authenticated')){
                $.post('/favorite', { video_id : $(this).data('videoid'), _token: '<?= csrf_token(); ?>' }, function(data){});
                $(this).toggleClass('active');
            } else {
                window.location = '/login';
            }
        });

        var massVideo = $('.video-js');
        for(var i = 0; i < massVideo.length; i++){
            videojs(massVideo[i]).ready(function(){
                var myPlayer = this;    // Store the video object
                var aspectRatio = 9/16; // Make up an aspect ratio

                function resizeVideoJS(){
                    // Get the parent element's actual width
                    var width = $('.video-container')[0].offsetWidth;
                    // Set width to fill parent element, Set height
                    myPlayer.width(width).height( width * aspectRatio );
                }

                resizeVideoJS(); // Initialize the function
                window.onresize = resizeVideoJS; // Call the function on resize
            });
        }

        TwitterWidgetsLoader.load(function(twttr) {
            var tweets = jQuery(".tweet");

            jQuery(tweets).each( function( t, tweet ) {
                var id = jQuery(this).attr('id');
                twttr.widgets.createVideo(id,tweet).then( function( el ) {
                    //console.log('Video added.');
                });
            });
        });
    });
</script>