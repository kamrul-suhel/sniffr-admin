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
                    <a href="#stories" role="tab" data-toggle="tab">
                        Stories
                    </a>
                </li>
                <li>
                    <a href="{{ route('contacts.destroy', ['id' => $contact->id]) }}" onclick="return confirm('Are you sure you want to delete this contact?');" style="background-color: #d32f2f; color:white;">
                        Delete  <i class="fa fa-trash-o"></i>
                    </a>
                </li>
            @endif
        </ul>

        <div class="panel-body tab-content">
            @include('admin.contacts.partials.errors')
            <div class="tab-pane @if(!request()->has('tab')) active @endif" id="contact">
                @include('admin.contacts.partials.form')
                @if($contact)
                    @include('admin.contacts.partials.comments')
                @endif
            </div>

            @if($contact)
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
