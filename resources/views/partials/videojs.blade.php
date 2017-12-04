@if(!empty($video->url))
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
