@extends('admin.master')

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

                        @if($video->more_details)
                            <li>
                                <a href="#moredetails" role="tab" data-toggle="tab">More Details</a>
                            </li>
                        @endif

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

                        @if($video->rights != 'ex' || $video->rights != 'nonex')
                        <li class="{{ (session('active_tab') == 'contract') ? 'active' : '' }}">
                            <a href="#contract" role="tab" data-toggle="tab">Contract</a>
                        </li>
                        @endif

                        <li>
                            <a href="#admin" role="tab" data-toggle="tab">Admin</a>
                        </li>

                        <li>
                            <a href="#analytics" role="tab" data-toggle="tab">Analytics</a>
                        </li>
                    @endif
                </ul>
                @if($video)
                <form method="POST" action="{{ ($video) ? route('videos.update', ['id' => $video->id]) : route('videos.store') }}" id="video-form" name="video-form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
                    <div class="panel-body tab-content">
                        <div class="tab-pane {{ (!session('active_tab')) ? 'active' : '' }}" id="copy">
                            @include('admin.videos.partials.copy')
                        </div>

                        <div class="tab-pane" id="metadata">
                            @include('admin.videos.partials.vertical')
                            @include('admin.videos.partials.collection')
                            @include('admin.videos.partials.shotType')
                            @include('admin.videos.partials.tags')
                            @include('admin.videos.partials.location')
                            @include('admin.videos.partials.video_information')
                            @include('admin.videos.partials.duration')
                            @include('admin.videos.partials.credit')
                            @include('admin.videos.partials.notes')
                            @include('admin.videos.partials.details')
                            @include('admin.videos.partials.featured')
                        </div>

                        <div class="tab-pane" id="moredetails">
                            <div class="row">
                                @if($video->more_details)
                                    <div class="col-md-3">
                                        @include('admin.videos.partials.rights_status')
                                    </div>
                                @endif

                                @if($video->rights == 'nonexc')
                                    <div class="col-md-6">
                                        @include('admin.videos.partials.non_exclusive_fields')
                                    </div>
                                @endif
                            </div>
                        </div>

                        <div class="tab-pane" id="image_files">
                            @include('admin.videos.partials.image_files')
                        </div>

                        <div class="tab-pane" id="video_files">
                            @include('admin.videos.partials.video_files')
                        </div>

                        <div class="tab-pane" id="sales">
                            @include('admin.videos.partials.video_class')
                        </div>

                        <div class="tab-pane" id="rights">
                            <div class="row">
                                <div class="col-md-3">
                                    @include('admin.videos.partials.license_selector')
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
                            @include('admin.videos.partials.assign_form')

                            @include('admin.videos.partials.delete_restore')
                        </div>

                        <div class="tab-pane" id="analytics">
                            @include('admin.videos.partials.social_links')
                        </div>
                    </div>

                    <input type="hidden" id="id" name="id" value="{{ $video->alpha_id }}"/>
                    <input type="hidden" id="temp_filename" name="temp_filename" value="{{ basename($video->file) }}"/>
                    <input type="hidden" id="temp_state" name="temp_state" value="{{ basename($video->state) }}"/>

                    {{ csrf_field() }}

                    <div id="video-error" class="error"></div>

                    <div class="form-group save_button">
                        <div class="clearfix">
                            <input type="submit" value="{{ ($video) ? 'Update Video' : 'Create Video' }}" class="btn btn-success pull-right"/>
                        </div>
                    </div>
                </form>
                @else
                <div class="panel-body tab-content">
                    <div class="tab-pane active" id="creator_search">
                        @include('admin.videos.partials.basic_information')
                    </div>
                </div>
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
