@extends('emails.template')

@section('content')
<div>
    <span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;">
        <b>Hey {{ isset($video->contact->first_name) ? ' '.$video->contact->first_name : '' }}!</b>
    </span>
</div>

<div>&nbsp;</div>

<div>Video Ref: {{ $video->alpha_id }}</div>

<div>&nbsp;</div>

<div>Thanks for sending through your video! It has now been sent over to our content team who will review it and decide if it’s something they’re looking for. They will email you with an update on this process ASAP.</div>

<div>&nbsp;</div>

<div>You may be asked to fill out some more details so be sure to keep an eye out for them getting in touch!</div>

<div>&nbsp;</div>

<div>Regards,</div>

<div>&nbsp;</div>

<div>The UNILAD Team.</div>
@stop
