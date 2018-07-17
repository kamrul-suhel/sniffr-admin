@extends('emails.template')

@section('content')
<div>
    <span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;">
        <b>Hi there!</b>
    </span>
</div>

<div>&nbsp;</div>

<div>How are you? I'm a journalist from UNILAD and would love
to talk to you about an article I'm currently researching called <strong>{{ $story->title }}</strong>.</div>

<div>&nbsp;</div>

<div>Do you have some time to talk to me?</div>

<div>&nbsp;</div>

<div>Please reply directly to this email or email <a href="mailto:stories@unilad.co.uk">stories@unilad.co.uk</a></div>

<div>&nbsp;</div>

<div>Regards,</div>

<div>&nbsp;</div>

{!! (isset($story->user) ? '<div>'.$story->user->full_name.'</div>' : '') !!}
<div>The UNILAD Team.</div>
@stop
