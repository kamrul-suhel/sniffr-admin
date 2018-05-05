<form method="POST" action="{{
($video) ? route('videos.update', ['id' => $video->id]) : route('videos.store')
}}" id="video-form" name="video-form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
