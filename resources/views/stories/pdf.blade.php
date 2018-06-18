@extends('stories.master')

@section('css')
    <style>
        .pdf_story_title {
            height: 100px;
        }

        img {
            width: 50%;
            height: 50%;
            clear: both;
        }

        .pdf_story_author {
            font-weight: bold;
        }
    </style>
@endsection

@section('content')
    <div>
        <h1 class="pdf_story_title">
            Title: {{ $title }}
        </h1>

        <div class="pdf_story_author">
            Author: {{ $author }}
        </div>

        <div class="pdf_story_description">
            {!! nl2br(strip_tags($description, '<br> <p>')) !!}
        </div>
    </div>
@endsection