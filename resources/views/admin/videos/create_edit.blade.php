@extends('admin.master')

@section('css')
    <link rel="stylesheet" href="/css/tabs.css">
@endsection

@section('content')
    <div id="admin-container">
        @include('admin.videos.partials.breadcrumb')

        @if($video)

            <div class="row">
                <div class="col-sm-9">
                    @include('admin.videos.partials.license')
                </div>
                <div class="col-sm-3">
                    @include('admin.videos.partials.prev_next_nav')

                    <div class="clear"></div>
                    @include('admin.videos.partials.creator')
                    @include('admin.videos.partials.comments')
                </div>
            </div>
        @endif

        <ul class="nav nav-tabs" role="tablist">
            <li class="active">
                <a href="#creator_search" role="tab" data-toggle="tab">Creator</a>
            </li>

            <li>
                <a href="#contract" role="tab" data-toggle="tab">Contract</a>
            </li>

            <li>
                <a href="#copy" role="tab" data-toggle="tab">Copy</a>
            </li>

            <li>
                <a href="#metadata" role="tab" data-toggle="tab">Metadata</a>
            </li>

            <li>
                <a href="#vertical" role="tab" data-toggle="tab">Vertical</a>
            </li>

            <li>
                <a href="#files" role="tab" data-toggle="tab">Files</a>
            </li>

            <li>
                <a href="#sales" role="tab" data-toggle="tab">Sales</a>
            </li>

            <li>
                <a href="#rights" role="tab" data-toggle="tab">Rights</a>
            </li>

            @if($video)
                <li>
                    <a href="#admin" role="tab" data-toggle="tab">Admin</a>
                </li>
            @endif
        </ul>
        @include('admin.videos.partials.open_form')
        <div class="panel-body tab-content">
            <div class="tab-pane active" id="creator_search">
                @include('admin.videos.partials.creator_choose')
            </div>
            <div class="tab-pane" id="copy">
                @include('admin.videos.partials.copy')
            </div>
            <div class="tab-pane" id="metadata">
                @include('admin.videos.partials.location')
                @include('admin.videos.partials.details')
                @include('admin.videos.partials.shotType')
                @include('admin.videos.partials.video_information')
                @include('admin.videos.partials.duration')
            </div>
            <div class="tab-pane" id="vertical">
                @include('admin.videos.partials.vertical')
                @include('admin.videos.partials.category')
                @include('admin.videos.partials.tags')
            </div>
            <div class="tab-pane" id="files">
                @include('admin.videos.partials.video_files')
            </div>
            <div class="tab-pane" id="sales">
                @include('admin.videos.partials.campaign')
                @include('admin.videos.partials.client_exclusivity')
            </div>

            @if($video)
                <div class="tab-pane" id="rights">
                    <div class="row">
                        <div class="col-md-3">
                            @include('admin.videos.partials.rights_status')
                        </div>

                        <div class="col-md-3">
                            @include('admin.videos.partials.license_selector')
                        </div>

                        <div class="col-md-6">
                            @if($video->rights == 'nonex')
                                @include('admin.videos.partials.non_exclusive_fields')
                            @endif
                        </div>
                    </div>
                </div>
            @endif

            <div class="tab-pane" id="admin">
                <div class="row">
                    @include('admin.videos.partials.assign_form')
                </div>
                @if($video)
                    @include('admin.videos.partials.delete_restore')
                @endif
            </div>
        </div>
        @include('admin.videos.partials.close_form')
        <div class="clear"></div>
    </div>

    @if($video)
        @include('admin.videos.partials.contract')
    @endif
@endsection

@section('javascript')
    @include('admin.videos.partials.javascript')
@endsection
