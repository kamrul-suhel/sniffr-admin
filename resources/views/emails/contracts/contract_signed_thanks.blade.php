@extends('emails.template')

@section('content')
    <div>
    <span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;">
        <b>Hey {{ $video->contact->full_name }}!</b>
    </span>
    </div>

    <div>&nbsp;</div>

    <div>Thank you for signing the contract.</div>
    <div>If you need it you can download it from this link.</div>

    <div>&nbsp;</div>

    <div><a href="{{ url('download/contract/'.$video->contracts->first()->reference_id) }}">{{ url('download/contract/'.$video->contracts->first()->reference_id) }}</a></div>

    <div>&nbsp;</div>
    
    <div>If you have any questions you&rsquo;re more than welcome to contact the team here: <a
                href="mailto:licensing@unilad.co.uk">licensing@unilad.co.uk</a></div>

    <div>&nbsp;</div>

    <div>Regards,</div>

    <div>&nbsp;</div>

    <div>The UNILAD Team.</div>

    <div>&nbsp;</div>

    <div>Video Ref: {{ $video->alpha_id }}</div>
@endsection
