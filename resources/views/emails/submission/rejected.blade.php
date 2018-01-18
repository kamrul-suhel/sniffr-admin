@extends('emails.template')

@section('content')
<div>
    <span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;">
        <b>Hey{{ isset($video->contact->first_name) ? ' '.$video->contact->first_name : '' }}!</b>
    </span>
</div>

<div>&nbsp;</div>

<div>Video Ref: {{ $video->alpha_id }}</div>

<div>&nbsp;</div>

<div>Thanks for submitting your video to us.  On this occasion we won’t be using the video.</div>

<div>&nbsp;</div>

<div>Please keep sending videos in, we are always on the lookout for great content.</div>

<div>&nbsp;</div>

<div>Regards,</div>

<div>&nbsp;</div>

<div>The UNILAD Team.</div>
@stop
