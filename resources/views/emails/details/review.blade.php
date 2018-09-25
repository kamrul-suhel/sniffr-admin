@extends('emails.template')

@section('content')
<div>
    <span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;">
        <b>Hey submission admin person!</b>
    </span>
</div>

<div>&nbsp;</div>

<div>Video Ref: {{ $video->alpha_id }}</div>

<div>&nbsp;</div>

<div>A video now has additional details provided. Please click the link below to review the additional details of the video.</div>

<div>&nbsp;</div>

<div><a href="{{ url(env('FRONTEND_URL').'/admin/videos/edit/' . $video->alpha_id) }}">{{ $video->title }}</a></div>

<div>&nbsp;</div>

<div>Regards,</div>

<div>&nbsp;</div>

<div>The UNILAD Team.</div>
@stop
