@extends('emails.template_sniffr')

@section('content')

    @if(!empty($mailer->note)) <div style="padding-top:10px;padding-bottom:20px;">{{ $mailer->note }}</div> @endif

    @if($mailer->stories->count())
        <hr>
        <h2>Stories</h2>
        <p>
            <a href="{{ url('/client/stories') }}" style="display:block;color:#000;text-decoration:underline;margin-bottom:15px;">
                Checkout all your stories here
            </a>
        </p>
        @include('emails.clientmailers.partials.stories')
    @endif


    @if($mailer->videos->count())
        <hr>
        <h2>Videos</h2>
        <p>
            <a href="{{ url('/client/videos') }}" style="display:block;color:#000;text-decoration:underline;margin-bottom:15px;">
                Checkout all your videos here
            </a>
        </p>
        @include('emails.clientmailers.partials.videos')
    @endif

    @if((!$mailer->stories->count()) && (!$mailer->videos->count())))
        <strong>No Stories or Videos have been selected</strong>
    @endif

@endsection
