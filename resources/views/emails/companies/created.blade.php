@extends('emails.template')

@section('content')
    <div>
    <span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;">
        <b>Hey {{ $company->id }}!</b>
    </span>
    </div>

    <div>&nbsp;</div>

    <div>Video Ref: </div>

    <div>&nbsp;</div>

    <div>You are receiving this email in reference to licensing your video. Before we can use your video <strong>we need to you to agree to an agreement</strong> which includes specific terms.</div>

    <div>&nbsp;</div>

    <div>Please click the following link and then agree to the terms provided on the page: 

    <div>&nbsp;</div>

    <div>If you have any questions you&rsquo;re more than welcome to contact the team here: <a
                href="mailto:licensing@unilad.co.uk">licensing@unilad.co.uk</a></div>

    <div>&nbsp;</div>

    <div>Regards,</div>

    <div>&nbsp;</div>

    <div>The UNILAD Team.</div>
@endsection
