@extends('emails.template_sniffr')

@section('content')
    <div>
    <span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;">
        <b>Hey {{ $email_data['full_name'] }}!</b>
    </span>
    </div>

    <div>&nbsp;</div>

    <div>&nbsp;</div>

    <div>We have created you a new account for the company <strong>{{ $email_data['company_name'] }}</strong>.
    </div>

    <div>&nbsp;</div>

    <div>You can login in this link and complete your registration process:

        <div>&nbsp;</div>

        <div>
            <strong>username: </strong> {{ $email_data['email'] }}

            <div>&nbsp;</div>
            <strong>password</strong>: <a href="{{ route('password.set_password', ['token' => $email_data['token'], 'email' => $email_data['email']]) }}">click
                here to set your password</a>
            <div>&nbsp;</div>
            Login URL
            <div>&nbsp;</div>
            <a href="{{ route('home') }}">{{ route('home') }}</a>
        </div>

        <div>&nbsp;</div>

        <div>Regards,</div>

        <div>&nbsp;</div>

        <div>The UNILAD Team.</div>
    </div>
@endsection
