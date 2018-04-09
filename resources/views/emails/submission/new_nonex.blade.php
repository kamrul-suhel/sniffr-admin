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

<div>A new video has been submitted from the non-exclusive video form. It is currently waiting for your approval. Please click the link below to review the submitted video.</div>

<div>&nbsp;</div>

<div><a href="{{ url('admin/videos/edit/' . $video->id) }}">{{ $video->title }}</a></div>

<div>&nbsp;</div>

<div>Regards,</div>

<div>&nbsp;</div>

<div>The UNILAD Team.</span></div>
@stop
