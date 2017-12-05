@if($video->youtube_id)
<div id="video_container" class="fitvid" style="padding-top:0px;">
    <div class="youtube-player" data-id="{{ $video->youtube_id }}"></div>
</div>
@elseif(!empty($video->url))
  @if (str_contains($video->url, 'youtube'))
    <div id="video_container" class="fitvid" style="padding-top:0px;">
      <div class="youtube-player" data-id="{{ $key = $video->getKey() }}"></div>
    </div>
  @elseif (str_contains($video->url, 'vimeo'))
    <div id="video_container" class="fitvid" style="padding-top:0px;">
      <video id="video_player" x-webkit-airplay=”allow” class="video-js vjs-default-skin vjs-big-play-centered" preload="auto" width="100%" style="width:100%;"
        data-setup='{ "techOrder": ["vimeo"], "sources": [{ "type": "video/vimeo", "src": "{{ $video->url }}"}] }'>
        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
      </video>
    </div>
  @elseif (str_contains($video->url, 'facebook'))
    <div id="video_container" class="fitvid" style="padding-top:0px;">
      <div class="fb-video"
        data-href="{{ $video->url }}"
        data-allowfullscreen="true"></div>
    </div>
  @endif
@elseif (!empty($video->file))
  <div id="video_container" class="fitvid" style="padding-top:0px;">
    <video id="video_player" x-webkit-airplay=”allow” class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" poster="<?= Config::get('site.uploads_url') . 'images/' . $video->image ?>" data-setup="{}" width="100%" style="width:100%;">
      <source src="{{ $video->file }}" type='video/mp4'>
      <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
    </video>
  </div>
@elseif (!empty($video->embed_code))
  <div id="video_container" class="fitvid" style="padding-top:0px;">
  @if(strpos($video->image,'http') === false)
  <img src="{{ Config::get('site.uploads_dir') . 'images/' . $video->image }}" />
  @else
  <img src="{{ $video->image }}" class="video-img" />
  @endif
  </div>
@else
  <div id="video_container" class="fitvid" style="padding-top:0px;">
    <p>There seems to be an issue with this video</p>
  </div>
@endif

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
