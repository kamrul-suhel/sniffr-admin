@extends('admin.master')

@section('content')
    @include('admin.dashboard.partials.submissions_stats')
@endsection

@section('javascript')
    @include('admin.dashboard.partials.js')
@endsection
