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

<div>A new video has been submitted. You need to review it in order to start the acceptance and licensing process. Please click the link below to review the submitted video.</div>

<div>&nbsp;</div>

<div><a href="{{ url('admin/videos/edit/' . $video->alpha_id) }}">{{ $video->title }}</a></div>

<div>&nbsp;</div>

<div>Regards,</div>

<div>&nbsp;</div>

<div>The UNILAD Team.</span></div>
@stop
