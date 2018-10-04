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
                @foreach($data['collection']['collectionVideos'] as $video)
                    <h2>{{ ucwords(str_replace('-', ' ', $video->video->title)) }}</h2>
                    <img src="{{$video->video->image}}" style="width:50%;" alt="" class="text-center">
                    <ul>
                        <li><p>Type of License: <b>{{ config('pricing.type.'.$video->type.'.name') }}</b></p></li>
                        <br>

                        <li>
                            Platform Usage:
                            @foreach(explode(',',$video->platform) as $platform)
                                <b>{{ config('pricing.platform.'.$platform.'.name') }},</b>
                            @endforeach
                        </li>
                        <br>

                        <li><p>License Length: <b>{{ config('pricing.length.'.$video->length.'.name') }}</b></p></li>
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
                        <li><p>Type of License: <b>{{ config('pricing.type.'.$story->type.'.name') }}</b></p></li>
                        <br>

                        <li>
                            Platform Usage:
                            @foreach(explode(',',$story->platform) as $platform)
                                <b>{{ config('pricing.platform.'.$platform.'.name') }},</b>
                            @endforeach
                        </li>
                        <br>

                        <li><p>License Length: <b>{{ config('pricing.length.'.$story->type.'.name') }}</b></p></li>
                        <br>

                        @if(isset($story->notes))
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

            <p>
                <br><br>
                Rest assured we have many more <a href="{{ url(env('FRONTEND_URL').'/videos') }}">Videos</a> and <a
                        href="{{ url(env('FRONTEND_URL').'/stories') }}">Stories</a> for you!
            </p>

            <hr>
        </div>
    </div>
@endsection