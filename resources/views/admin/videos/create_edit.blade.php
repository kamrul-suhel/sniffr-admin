@extends('admin.master')

@section('css')
    <link rel="stylesheet" href="/css/modals.css">
    <link rel="stylesheet" href="/css/tabs.css">
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/css/bootstrap-select.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/js/bootstrap-select.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/js/i18n/defaults-*.min.js"></script>
@endsection

@section('content')
    <div id="admin-container">
        @include('admin.videos.partials.breadcrumb')

        <div class="row">
            <div class="col-sm-9">
                @if(($video) && (($video->file) || ($video->url)))
                    @include('admin.videos.partials.license')
                @endif
                <ul class="nav nav-tabs" role="tablist">
                    @if(!$video)
                        <li class="active">
                            <a href="#creator_search" role="tab" data-toggle="tab">Create a Video</a>
                        </li>
                    @endif

                    @if($video)
                        <li class="{{ (!session('active_tab')) ? 'active' : '' }}">
                            <a href="#copy" role="tab" data-toggle="tab">Copy</a>
                        </li>

                        <li>
                            <a href="#metadata" role="tab" data-toggle="tab">Metadata</a>
                        </li>

                        <li>
                            <a href="#image_files" role="tab" data-toggle="tab">Image Files</a>
                        </li>

                        <li>
                            <a href="#video_files" role="tab" data-toggle="tab">Video Files</a>
                        </li>

                        <li>
                            <a href="#sales" role="tab" data-toggle="tab">Sales</a>
                        </li>

                        <li>
                            <a href="#rights" role="tab" data-toggle="tab">Rights</a>
                        </li>

                        <li>
                            <a href="#creator" role="tab" data-toggle="tab">Creator</a>
                        </li>

                        <li class="{{ (session('active_tab') == 'contract') ? 'active' : '' }}">
                            <a href="#contract" role="tab" data-toggle="tab">Contract</a>
                        </li>

                        <li>
                            <a href="#admin" role="tab" data-toggle="tab">Admin</a>
                        </li>
                    @endif
                </ul>
                @if($video)
                    @include('admin.videos.partials.open_form')
                @endif
                <div class="panel-body tab-content">
                    @if(!$video)
                        <div class="tab-pane active" id="creator_search">
                            @include('admin.videos.partials.basic_information')
                        </div>
                    @endif

                    @if($video)
                        <div class="tab-pane {{ (!session('active_tab')) ? 'active' : '' }}" id="copy">
                            @include('admin.videos.partials.copy')
                        </div>
                        <div class="tab-pane" id="metadata">
                            @include('admin.videos.partials.vertical')
                            @include('admin.videos.partials.collection')
                            @include('admin.videos.partials.tags')

                            @include('admin.videos.partials.location')
                            @include('admin.videos.partials.shotType')
                            @include('admin.videos.partials.video_information')
                            @include('admin.videos.partials.duration')
                            @include('admin.videos.partials.details')
                        </div>
                        <div class="tab-pane" id="image_files">
                            @include('admin.videos.partials.image_files')
                        </div>
                        <div class="tab-pane" id="video_files">
                            @include('admin.videos.partials.video_files')
                        </div>
                        <div class="tab-pane" id="sales">
                            @include('admin.videos.partials.campaign')
                            @include('admin.videos.partials.client_exclusivity')
                        </div>

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

                        <div class="tab-pane" id="creator">
                            @include('admin.videos.partials.choose_creator')
                        </div>

                        <div class="tab-pane {{ (session('active_tab') == 'contract') ? 'active' : '' }}" id="contract">
                            @include('admin.videos.partials.contract')
                        </div>

                        <div class="tab-pane" id="admin">
                            <div class="row">
                                @include('admin.videos.partials.assign_form')
                            </div>
                            @include('admin.videos.partials.delete_restore')
                        </div>
                    @endif
                </div>

                @if($video)
                    @include('admin.videos.partials.close_form')
                @endif
            </div>
            <div class="col-sm-3">
                @if($video)
                    @include('admin.videos.partials.prev_next_nav')

                    <div class="clear"></div>
                    @include('admin.videos.partials.creator')
                    @include('admin.videos.partials.comments')
                @endif
            </div>
        </div>

        <div class="clear"></div>
    </div>

    @if($video)
        @include('admin.videos.partials.contract_modal')
    @endif

    @include('admin.videos.partials.add_creator_modal')
@endsection

@section('javascript')
    @include('admin.videos.partials.javascript')
@endsection
