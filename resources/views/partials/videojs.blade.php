@section ('javascript-videojs')
  <script src="/assets/admin/js/video.js"></script>
  <script src="/assets/admin/js/videojs-vimeo.js"></script>

  <!-- RESIZING FLUID VIDEO for VIDEO JS -->
  <script type="text/javascript">
    // Once the video is ready

    (function($){

        var massVideo = $('.video-js');
        for(var i = 0; i < massVideo.length; i++){
          videojs(massVideo[i]).ready(function(){

            var myPlayer = this;    // Store the video object
            var aspectRatio = 9/16; // Make up an aspect ratio

            function resizeVideoJS(){
              // Get the parent element's actual width
              var width = document.getElementById('video_container').offsetWidth;
              // Set width to fill parent element, Set height
              myPlayer.width(width).height( width * aspectRatio );
            }

            resizeVideoJS(); // Initialize the function
            window.onresize = resizeVideoJS; // Call the function on resize
          });
        }

    })(jQuery);
  </script>
@stop
