@extends('emails.template_sniffr')

@section('content')
    <div class="col-lg-12">
        <div class="container">
            <h2>Your request is being reviewed</h2>
            @if($data['collection'])
                <p>Your Reference number: <b>{{ ucwords($data['collection']->name) }}</b></p>

                @foreach($data['collection']['collectionVideos'] as $video)
                    <ul>
                        <li><p>Video Name: <b>{{ ucwords(str_replace('-', ' ', $video->video->title)) }}</b></p></li><br>
                        <li><p>Type of License: <b>{{ ucwords(str_replace('-', ' ', $video->type)) }}</b></p></li><br>
                        <li><p>Platform Usage: <b>{{ ucwords(str_replace('-', ' ', $video->platform)) }}</b></p></li><br>
                        <li><p>License Length: <b>{{ ucwords(str_replace('-', ' ', $video->length)) }}</b></p></li><br>
                        @if(isset($video->notes))
                            <li><p>Your Comments: </p></li>
                            <pre style="white-space: pre-wrap;">{{ $video->notes }}</pre>
                        @endif
                    </ul>
                @endforeach

                @foreach($data['collection']['collectionStories'] as $story)
                    <ul>
                        <li><p>Video Name: {{ ucwords(str_replace('-', ' ', $story->story->title)) }}</p></li><br>
                        @if(isset($story->notes))
                            <li><p>Your Comments: </p></li>
                          <pre style="white-space: pre-wrap;">{{ $story->notes }}</pre>
                        @endif
                    </ul>
                @endforeach
            @endif
            <br><hr>
            <p>
                We will get back to you as soon as possible. In the meantime you can check all of our
                <a href="{{ url('videos') }}">Videos</a> and <a href="{{ url('stories') }}">Stories</a>
            </p>
            <hr>
        </div>
    </div>
@endsection