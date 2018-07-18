@extends('emails.template_sniffr')

@section('content')

    <p>Hi {{ $data['collection']->user->full_name }}</p>
    <br>

    <div class="col-lg-12">
        <div class="container">
            <h2>Your license has come to an end.</h2>
            @if($data['collection'])
                <p>Your Reference number: <b>{{ ucwords($data['collection']->name) }}</b></p>
                <br>
                @foreach($data['collection']['collectionVideos'] as $video)
                    <h2>{{ ucwords(str_replace('-', ' ', $video->video->title)) }}</h2>
                    <img src="{{$video->video->image}}" style="width:50%;" alt="" class="text-center">
                    <ul>
                        <li><p>Type of License: <b>{{ ucwords(str_replace('-', ' ', $video->type)) }}</b></p></li>
                        <li><p>Platform Usage: <b>{{ ucwords(str_replace('-', ' ', $video->platform)) }}</b></p></li>
                        <li><p>License Length: <b>{{ ucwords(str_replace('-', ' ', $video->length)) }}</b></p></li>
                        @if(isset($video->notes))
                            <li><p>Your Comments: </p></li>
                            <pre style="white-space: pre-wrap;">{{ $video->notes }}</pre>
                        @endif
                    </ul>
                @endforeach

                @foreach($data['collection']['collectionStories'] as $story)
                    <h2>{{ ucwords(str_replace('-', ' ', $story->story->title)) }}</h2>
                    <img src="{{$story->story->thumb}}" style="width:50%;" alt="" class="text-center">
                    <ul>
                        <br>
                        @if(isset($story->notes))
                            <li><p>Your Comments: </p></li>
                            <pre style="white-space: pre-wrap;">{{ $story->notes }}</pre>
                        @endif
                    </ul>
                @endforeach
            @endif
            <br>
            <hr>
            <p>
                You can license the item again (if available) <a href="{{ url('client/'.str_plural($data['type']).'/'.$data['collectionAsset']->{$data['type']}->alpha_id) }}">here</a>.
                <br><br>
                We have new media coming in everyday! Check out our <a href="{{ url('videos') }}">Videos</a> and <a href="{{ url('stories') }}">Stories</a> now!
            </p>
            <hr>
        </div>
    </div>
@endsection