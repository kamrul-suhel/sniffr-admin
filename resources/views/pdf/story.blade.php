@extends('pdf.master')

@section('content')
    <div>
        <h1 class="pdf_story_title">
            {{ $title }}
        </h1>

        <div class="pdf_story_author bottom-padding">
            Author: {{ $author }}
        </div>

        <div class="pdf_story_description bottom-padding">
            {!! $description !!}
        </div>
    </div>
@endsection