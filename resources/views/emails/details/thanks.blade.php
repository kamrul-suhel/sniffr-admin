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

<div>Thanks for sending over more details about your video, and confirming this with us!</div>

<div>We&rsquo;re really keen to get going with this so be sure to keep an eye out on the page to see if/when your video is featured.</div>

<div>&nbsp;</div>

<div>We may also allow some other Facebook pages to use the video to ensure it has the best chance of going viral. If you see any uploads you&rsquo;re unsure of, please do send them our way and we&rsquo;ll check them!</div>

<div>&nbsp;</div>

<div>If you would like to submit any more content to us, you can do so by following this link: <a href="{{ url('/upload/') }}">{{ url('/upload/') }}</a></div>

<div>&nbsp;</div>

<div>If you have any questions you&rsquo;re more than welcome to contact the team here: <a href="mailto:submissions@unilad.co.uk">submissions@unilad.co.uk</a></div>

<div>&nbsp;</div>

<div>Regards,</div>

<div>&nbsp;</div>

<div>The UNILAD Team.</div>
@stop
