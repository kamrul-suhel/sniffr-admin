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
            @if($contact->stories->count() > 0)
                <li>
                    <a href="#stories" role="tab" data-toggle="tab">
                        Stories ({{ $contact->stories->count() }})
                    </a>
                </li>
            @endif
            @if($contact->videos->count() > 0)
                <li>
                    <a href="#videos" role="tab" data-toggle="tab">
                        Videos ({{ $contact->videos->count() }})
                    </a>
                </li>
            @endif
        @endif
    </ul>

    <div class="panel-body tab-content">
        @include('admin.contacts.partials.errors')
        <div class="tab-pane @if(!request()->has('tab')) active @endif" id="contact">
            <div class="col-xs-8">
                @include('admin.contacts.partials.form')
            </div>

            <div class="col-xs-4">
                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">
                        <div class="panel-title">Comments</div>
                        <div class="panel-options">
                            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                        </div>
                    </div>

                    <div class="panel-body" style="display: block; background: #fcfcfc;">
                        <comments-component :asset="{{ json_encode($contact) }}"
                                            asset-type="contact"></comments-component>
                    </div>
                </div>
            </div>
        </div>

        @if($contact)
            <div class="tab-pane" id="stories">
                @include('admin.contacts.partials.stories')
            </div>

            <div class="tab-pane" id="videos">
                @include('admin.contacts.partials.videos')
            </div>
        @endif
    </div>

    <div class="clear"></div>
</div>
@stop

@section('javascript')
    <script src="{{asset('assets/admin/scripts/scripts.js')}}"></script>
@stop
