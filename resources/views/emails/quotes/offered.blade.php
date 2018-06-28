@extends('emails.template_sniffr')

@section('content')
    <p>Hi {{ $data['username'] }}</p>
    <h2>Thank you for your interest in: </h2>
    <p>Based on the usage of:</p>

    <p>Our quote price is: <strong>£{{ $data['collectionVideo']->final_price }}</strong></p>

    <a href="{{ url('/client/collections/accept_price/'.$data['collectionVideo']->id) }}" style="background:#000;color:#fff;padding:10px 8px;border-radius:5px;display:inherit;margin-top:20px;margin-bottom:10px;font-weight:bold;">
        Accept Quote
    </a>
@endsection