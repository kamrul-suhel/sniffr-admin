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
            <a class="block-thumbnail" href="{{url('video')}}/{{$video->alpha_id}}" style="background-image:url('{{$video->image}}')">
                <div class="thumbnail-overlay"></div>
                <span class="play-button"><i class="far fa-play-circle fa-4x"></i></span>
                <span class="label label-{{$video->state == 'licensed' ? 'success' : 'danger'}}">
                    {{ucfirst($video->state)}}
                </span>

                <div class="video-duration">
                    {{gmdate("i:s", $video->duration)}}
                </div>
            </a>
        </v-card-media>

        <v-card-title pb0>
            <h3 class="headline mb-0">
                {{(strlen($video->title) > 20)? substr($video->title, 0, 20): $video->title }}
            </h3>
            <div class="video-content">
                @if(strlen($video->description) > 100)
                    {{substr($video->description, 0, 100) . '...'}}
                @else
                    {{$video->description}}
                @endif
            </div>
        </v-card-title>

    </v-card>
</v-flex>
@endforeach