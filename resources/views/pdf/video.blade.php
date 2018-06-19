@extends('pdf.master')

@section('content')
    <div>
        <h1 class="pdf_video_title">
            {{ $title }}
        </h1>

        <div class="pdf_video_description bottom-padding">
            {{ $description }}
        </div>

        <div class="pdf_video_credit bottom-padding">
            <strong>Please Credit: {!! $credit !!}</strong>
        </div>
    </div>
@endsection