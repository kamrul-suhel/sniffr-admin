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

<div>Thanks again for submitting your video to us - we love it!&nbsp;</div>

<div>&nbsp;</div>

<div>We&rsquo;d just like to confirm a few more details with you which will improve your chances of being featured on our page and for making some money!</div>

<div>&nbsp;</div>

<div>Please click the link below to access our online questionnaire, this is just to verify details with you and confirm everything we need to know before we do anything with your video:</div>

<div>&nbsp;</div>

<div><a href="{{ url('/details/' . $video->more_details_code) }}">Confirm additional details</a></div>

<div>&nbsp;</div>

<div>Once you have filled this in with the correct answers, our team will review the details and get in touch with what happens next!</div>

<div>&nbsp;</div>

<div>Regards,</div>

<div>&nbsp;</div>

<div>The UNILAD Team.</div>
@stop
