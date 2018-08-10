@extends('emails.template_sniffr')

@section('content')

    <p>
        Hi {{ $data['collection']->user->full_name ?? $data['collection']->user->username ?? $data['collection']->user->first_name }}</p>
    <br>

    <div class="col-lg-12">
        <div class="container">
            <h2>Sorry but your offer has been revoked.</h2>
            @if($data['collection'])
                <p>Your Reference number: <b>{{ ucwords($data['collection']->name) }}</b></p>
                <br>
                @foreach($data['collection']['collectionVideos'] as $video)
                    <h2>{{ ucwords(str_replace('-', ' ', $video->video->title)) }}</h2>
                    <img src="{{$video->video->image}}" style="width:50%;" alt="" class="text-center">
                    <ul>
                        <li><p>Type of License: <b>{{ ucwords(str_replace('-', ' ', $video->type)) }}</b></p></li>
                        <br>
                        <li><p>Platform Usage: <b>{{ ucwords(str_replace('-', ' ', $video->platform)) }}</b></p></li>
                        <br>
                        <li><p>License Length: <b>{{ ucwords(str_replace('-', ' ', $video->length)) }}</b></p></li>
                        <br>
                        @if(($video->notes))
                            <li><p>Additional Comments: <b>{{ ucwords(str_replace('-', ' ', $video->notes)) }}</b></p>
                            </li><br>
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

            <p>
                <br><br>
                Rest assured we have many more <a href="{{ url('videos') }}">Videos</a> and <a
                        href="{{ url('stories') }}">Stories</a> for you!
            </p>

            <hr>
        </div>
    </div>
@endsection