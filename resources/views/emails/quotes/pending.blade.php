@extends('emails.template_sniffr')

@section('content')

    <p>Hi {{ $data['full_name'] ?? $data['username'] ?? $data['first_name'] }}</p>
    <br>

    <div class="col-lg-12">
        <div class="container">
            <h2>Your request is being reviewed</h2>
            @if($data['collection'])
                <p>Your Reference number: <b>{{ ucwords($data['collection']->name) }}</b></p>
                @foreach($data['collection']['collectionVideos'] as $video)
                    <div class="col-lg-6">
                        <h2>{{ $video->video->title }}</h2>
                        <img style="width:50%;" src="{{ $video->video->image }}"/>
                    </div>
                    <ul>
                        <li><p>Type of License: <b>{{ config('pricing.type.'.$video->type.'.name')  }}</b></p></li>
                        <br>

                        <li>
                            Platform Usage:
                            @foreach(explode(',',$video->platform) as $platform)
                                <b>{{ config('pricing.platform.'.$platform.'.name') }},</b>
                            @endforeach
                        </li>
                        <br>

                        <li><p>License Length: <b>{{ config('pricing.length.'.$video->length.'.name')  }}</b></p></li>
                        <br>

                        @if(($video->notes))
                            <li>
                                <p>Your Comments:
                                    <b>{{ $video->notes }}</b>
                                </p>
                            </li>
                        @endif
                    </ul>
                @endforeach

                @foreach($data['collection']['collectionStories'] as $story)
                    <div class="col-lg-6">
                        <h2>{{ $story->story->title }}</h2>
                        <img style="width:50%;" src="{{ $story->story->thumb }}"/>
                    </div>
                    <ul>
                        <li><p>Type of License: <b>{{ config('pricing.type.'.$story->type.'.name') }}</b></p></li>
                        <br>

                        <li>
                            Platform Usage:
                            @foreach($story->platform as $platform)
                                <b>{{ config('pricing.platform.'.$platform.'.name') }},</b>
                            @endforeach
                        </li>
                        </br>

                        <li><p>License Length: <b>{{ config('pricing.length.'.$story->length.'.name') }}</b></p></li>
                        <br>

                        @if(($story->notes))
                            <li>
                                <p>Your Comments:
                                    <b>{{ $story->notes }}</b>
                                </p>
                            </li>
                        @endif
                    </ul>
                @endforeach
            @endif
            <br>
            <hr>
            <p>
                We will get back to you as soon as possible. In the meantime you can check all of our
                <a href="{{ url('videos') }}">Videos</a> and <a href="{{ url('stories') }}">Stories</a>
            </p>
            <hr>
        </div>
    </div>
@endsection
