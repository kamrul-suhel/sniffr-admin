@extends('admin.master')

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
                <a href="#stories" role="tab" data-toggle="tab">
                    Stories
                </a>
            </li>
        @endif
    </ul>

    <div class="panel-body tab-content">
        @include('admin.contacts.partials.errors')
        <div class="tab-pane @if(!request()->has('tab')) active @endif" id="contact">
            @if($contact)
                @include('admin.contacts.partials.form')
                @include('admin.contacts.partials.comments')
            @endif
        </div>

        @if($contact)
            <div class="tab-pane" id="stories">
                @include('admin.contacts.partials.stories')
            </div>
        @endif
    </div>

    <div class="clear"></div>
</div>
@stop
