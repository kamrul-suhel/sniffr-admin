@php
$currentDay = '';
foreach($videos as $video):

$date = date('jS M Y',strtotime($video->licensed_at));
if(isset($day_sort) && $currentDay != $date){
    $currentDay = $date;
    echo '<div class="col-xs-12"><h1>'.$date.'</h1></div>';
}
@endphp
<v-flex xs12 sm6 md4 lg4 xl4>
    <v-card class="block">
        <v-card-media src="{{ $video->image }}" height="200px">
            <a class="block-thumbnail" href="<?= url('video') ?><?= '/' . $video->alpha_id ?>" style="background-image:url('<?= $video->image; ?>')">
                <div class="thumbnail-overlay"></div>
                <span class="play-button"></span>
                <span class="label label-<?php echo $video->state == 'licensed' ? 'success' : 'danger'; ?>"><?php echo ucfirst($video->state); ?></span>

            </a>
        </v-card-media>
        <v-card-title pb0>
            <h3 class="headline mb-0">
                {{(strlen($video->title) > 20)? substr($video->title, 0, 20): $video->title }}
            </h3>
            <div class="video-duration">
                {{gmdate("i:s", $video->duration)}}
            </div>
            <div class="video-content">
                @if(strlen($video->description) > 100)
                    {{substr($video->description, 0, 100) . '...'}}
                @else
                    {{$video->description}}
                @endif
            </div>
        </v-card-title>
        {{--<div class="block-contents">--}}
            {{--<div class="title">--}}
                {{--<h2 class="title_text">--}}

                {{--</h2>--}}
                {{--<span>{{ \App\Libraries\TimeHelper::convert_seconds_to_HMS($video->duration) }}</span>--}}
            {{--</div>--}}
            {{--<p class="desc">--}}
                {{--@php if(strlen($video->description) > 90){--}}
                    {{--echo substr($video->description, 0, 90) . '...';--}}
                {{--} else {--}}
                    {{--echo $video->description;--}}
                {{--} @endphp--}}
            {{--</p>--}}
        {{--</div>--}}
    </v-card>
</v-flex>
@endforeach