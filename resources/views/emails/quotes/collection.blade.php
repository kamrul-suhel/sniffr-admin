@extends('emails.template_sniffr')

@section('content')
    <h2>Thank you for your interest in: </h2>
    <p>Based on the usage of:</p>

    <p>Our quote price is: <strong>£300</strong></p>

    <a href="{{ url('client/quotes') }}" style="background:#000;color:#fff;padding:10px 8px;border-radius:5px;display:inherit;margin-top:20px;margin-bottom:10px;font-weight:bold;">
        Review Quotes
    </a>
@endsection