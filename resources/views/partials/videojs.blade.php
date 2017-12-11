<style>
  .vjs-default-skin .vjs-big-play-button {
    background: rgba(0,0,0,0.75);
    border-radius: 50%;
    border: #fff solid 3px;
    height: 72px;
    width: 72px;
    margin-top: -7%;
  }
  .video-js .vjs-big-play-button:before {
    padding-top: 12px;
    font-size: 38px;
  }
</style>

@section ('javascript-videojs')
  <script type="text/javascript" src="{{ '/content/themes/default/assets/js/video.js' }}"></script>
  <script type="text/javascript" src="{{ '/content/themes/default/assets/js/videojs-vimeo.js' }}"></script>

  <!-- RESIZING FLUID VIDEO for VIDEO JS -->
  <script type="text/javascript">
    // Once the video is ready

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
  </script>
@stop
