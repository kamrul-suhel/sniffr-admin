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
                <img style="width:50%;" src="{{$data['collectionAsset']->{$data['type']}->image ?? $data['collectionAsset']->{$data['type']}->thumb }}"/>
            </div>
            <div class="col-lg-6">
                <p>With the following terms:</p>
                <ul>
                    <li><p>Type of License: <b>{{ ucwords(str_replace('-', ' ', $data['collectionAsset']->type)) }}</b></p></li><br>
                    <li><p>Platform Usage: <b>{{ ucwords(str_replace('-', ' ', $data['collectionAsset']->platform)) }}</b></p></li><br>
                    <li><p>License Length: <b>{{ ucwords(str_replace('-', ' ', $data['collectionAsset']->length)) }}</b></p></li><br>
                    @if(($data['collectionAsset']->notes))
                        <li><p>Additional Comments: <b>{{ ucwords(str_replace('-', ' ', $data['collectionAsset']->comments)) }}</b></p></li><br>
                    @endif
                </ul>
            </div>
        </div>
    </div>
    <h1>Your quote price is: <strong>£{{ number_format($data['quote']) }}</strong></h1>
    <br>

    <a class="pull-right" href="{{ url('/client/offered') }}"
       style="background:#000;color:#fff;padding:10px 8px;border-radius:5px;font-weight:bold;">
        Review Quotes
    </a>
@endsection