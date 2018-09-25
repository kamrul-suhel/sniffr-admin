@extends('emails.template_sniffr')

@section('content')

    <p>Hi {{ $data['full_name'] ?? $data['username'] ?? $data['first_name'] }}</p>
    <br>

    <div class="col-lg-12">
        <div class="container">
            <h2>We have an offer for you!</h2>
            <p>Your Reference number: <b>{{ ucwords($data['collectionAsset']->collection->name) }}</b></p>
            <div class="col-lg-6">
                <h2>{{ $data['collectionAsset']->{$data['type']}->title }}</h2>
                <img style="width:50%;"
                     src="{{$data['collectionAsset']->{$data['type']}->image ?? $data['collectionAsset']->{$data['type']}->thumb }}"/>
            </div>
            <div class="col-lg-6">
                <p>With the following terms:</p>
                <ul>
                    <li><p>Type of License: <b>{{ config('pricing.type.'.$data['collectionAsset']->type.'.name') }}</b>
                        </p></li>
                    <br>

                    <li>
                        Platform Usage:
                        @foreach(explode(',',$data['collectionAsset']->platform) as $platform)
                            <b>{{ config('pricing.platform.'.$platform.'.name') }},</b>
                        @endforeach
                    </li>
                    <br>

                    <li><p>License Length:
                            <b>{{ config('pricing.length.'.$data['collectionAsset']->length.'.name') }}</b></p></li>
                    <br>

                    @if(($data['collectionAsset']->notes))
                        <li>
                            <p>Your Comments:
                                <b>{{ $data['collectionAsset']->notes }}</b>
                            </p>
                        </li>
                        <br>
                    @endif
                </ul>
            </div>
        </div>
    </div>
    <h1>Your quote price is: <strong>£{{ number_format($data['quote']) }}</strong></h1>
    <br>

    <a class="pull-right" href="{{ url(env('FRONTEND_URL').'/client/offered?type=offered') }}"
       style="background:#000;color:#fff;padding:10px 8px;border-radius:5px;font-weight:bold;">
        Review Quotes
    </a>
@endsection