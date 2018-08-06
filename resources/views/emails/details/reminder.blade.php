@extends('emails.template')

@section('content')
<div>
    <span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;">
        <b>Hey {{ $video->contact->full_name }}!</b>
    </span>
</div>

<div>&nbsp;</div>

<div>Video Ref: {{ $video->alpha_id }}</div>

<div>&nbsp;</div>

<div>Thanks again for submitting your video to us!</div>

<div>We&rsquo;ve received no response from you yet to verify your video and confirm your submission. Please answer the online questionnaire below.</div>

<div><a href="{{ url('/details/' . $video->more_details_code) }}">Confirm additional details</a></div>

<div>&nbsp;</div>

<div>We’re really keen to use your video so please fill this in as soon as possible!</div>

<div>&nbsp;</div>

<div>Regards,</div>

<div>&nbsp;</div>

<div>The UNILAD Team.</div>
@stop