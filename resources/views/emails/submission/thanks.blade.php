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

<div>Thanks for submitting your video to us. If the video is shared on our main UNILAD Facebook page, we’ll be sure to notify you and you’ll receive £100!</div>

<div>&nbsp;</div>

<div>Please keep sending videos in, we are always on the lookout for great content.</div>

<div>&nbsp;</div>

<div>Regards,</div>

<div>&nbsp;</div>

<div>The UNILAD Team.</div>
@stop
