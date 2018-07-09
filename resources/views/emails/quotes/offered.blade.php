@extends('emails.template_sniffr')

@section('content')
    <p>Hi {{ $data['username'] }}</p>
    <br>
    <p>We've reviewed your request for: </p>
    <br>

    <div class="col-lg-12">
        <div class="col-lg-6">
            <h2>{{ $data['collectionAsset']->{$data['type']}->title }}</h2>
            <img style="width:50%;" src="{{$data['collectionAsset']->{$data['type']}->image ?? $data['collectionAsset']->{$data['type']}->thumb }}"/>
        </div>
        @if($data['type'] == 'Video')
            <div class="col-lg-6">
                <p>With the following terms:</p>
                <ul>
                    <li>
                        <p>Video Name:
                            <b>{{ ucwords(str_replace('-', ' ', $data['collectionAsset']->{$data['type']}->title)) }}</b>
                        </p>
                    </li>
                    <li>
                        <p>Type of License: <b>{{ ucwords(str_replace('-', ' ', $data['collectionAsset']->type)) }}</b></p>
                    </li>
                    <li>
                        <p>Platform Usage: <b>{{ ucwords(str_replace('-', ' ', $data['collectionAsset']->platform)) }}</b>
                        </p>
                    </li>
                    <li>
                        <p>License Length: <b>{{ ucwords(str_replace('-', ' ', $data['collectionAsset']->length)) }}</b></p>
                    </li>
                </ul>
            </div>
        @endif
    </div>
    <br>
    <h1>Our quote price is: <strong>£{{ $data['quote'] }}</strong></h1>
    <br>

    <a class="pull-right" href="{{ url('/client/offered') }}"
       style="background:#000;color:#fff;padding:10px 8px;border-radius:5px;font-weight:bold;">
        Review Quotes
    </a>
@endsection