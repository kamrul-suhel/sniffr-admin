@extends('emails.template')

@section('content')
<div>Story Ref: {{ $story->alpha_id }}</div>

<div>&nbsp;</div>

<div>
    <span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;">
        <b>Hey,</b>
    </span>
</div>

<div>&nbsp;</div>

<div>Just checking if your still up for working ith us on the article? Did you get my previous messages. Thanks</div>

<div>&nbsp;</div>

<div>Please reply directly to this email or email <a href="mailto:stories@unilad.co.uk">stories@unilad.co.uk</a></div>

<div>&nbsp;</div>

<div>Regards,</div>

<div>&nbsp;</div>

{!! (isset($story->user->full_name) ? '<div>'.$story->user->full_name.'</div>' : '') !!}
<div>The UNILAD Team.</div>
@stop
