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

<div>We&rsquo;ve received no response from you yet to verify your video and confirm your submission.</div>

<div>Please answer the online questionnaire below, <strong>*we cannot feature your video if you do not fill out this form*</strong>:</div>

<div>&nbsp;</div>

<div><a href="{{ url('/details/' . $video->more_details_code) }}">Confirm additional details</a></div>

<div>&nbsp;</div>

<div>We&rsquo;re really keen to use your video so please fill this in as soon as possible! Once you have done so,&nbsp; our team will review the content and get in touch with further opportunities for you!</div>

<div>&nbsp;</div>

<div>Regards,</div>

<div>&nbsp;</div>

<div>The UNILAD Team.</div>
@stop