@extends('admin.master')

@section('css')
    <link rel="stylesheet" href="/css/tabs.css">
@endsection

@section('content')
    <div id="admin-container">
        @include('admin.contacts.partials.breadcrumb')

        <ul class="nav nav-tabs" role="tablist">
            <li class="active">
                <a href="#contact" role="tab" data-toggle="tab">
                    Contact Information
                </a>
            </li>

            @if($contact)
                <li>
                    <a href="#comments" role="tab" data-toggle="tab">
                        Comments
                    </a>
                </li>
                <li>
                    <a href="#stories" role="tab" data-toggle="tab">
                        Stories
                    </a>
                </li>
                <li>
                    <a href="#delete" role="tab" data-toggle="tab">
                        Delete
                    </a>
                </li>
            @endif
        </ul>

        <div class="panel-body tab-content">
            @include('admin.contacts.partials.errors')
            <div class="tab-pane active" id="contact">
                @include('admin.contacts.partials.form')
            </div>

            @if($contact)
                <div class="tab-pane" id="comments">
                    @include('admin.contacts.partials.comments')
                </div>
                <div class="tab-pane" id="stories">
                    @include('admin.contacts.partials.stories')
                </div>
                <div class="tab-pane" id="delete">
                    @include('admin.contacts.partials.delete')
                </div>
            @endif
        </div>

        <div class="clear"></div>
    </div>
@stop
