@extends('admin.master')

@section('content')
    @include('admin.dashboard.partials.submissions_stats')
@stop

@section('javascript')
    @include('admin.dashboard.partials.js')
@stop
