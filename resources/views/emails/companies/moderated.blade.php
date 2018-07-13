@extends('emails.template_sniffr')

@section('content')

    <p>Hi {{ $company->owner->full_name }}</p>
    <br>

    <div class="col-lg-12">
        <div class="container">
            <h2>Your company has been approved!</h2>

            <p>You can now access exclusive content, buy, and license our stories and videos.</p>

            <br>

            <p>We recommend updating your company profile as soon as possible. You can also add new users from your company too!</p>
            <br><hr>

            <p>
                <a class="pull-right" href="{{ url('/client/profile') }}"
                   style="background:#000;color:#fff;padding:10px 8px;border-radius:5px;font-weight:bold;">
                    Account Settings
                </a>
            </p>
        </div>
    </div>
@endsection