@extends('emails.template_sniffr')

@section('content')
    <div>
    <span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;">
        <b>Hey {{ $user['full_name'] }}!</b>
    </span>
    </div>

    <div>&nbsp;</div>

    <div>&nbsp;</div>

    <div>
        You have successfully reset your password.
    </div>

    <br>

    <div>
        If this was not you, please contact us immediately.
    </div>
    <div>

        <div>Regards,</div>

        <div>&nbsp;</div>

        <div>The Sniffr Team.</div>
    </div>
@endsection
