@extends('admin.master')

@section('content')
    <div id="admin-container">
        <ol class="breadcrumb">
            <li><a href="/admin/videos">All Videos</a></li>
            @if($video)
            <li><a href="/admin/videos/{{ ($video->state) ?: 'new' }}">{{ ($video->state) ? ucfirst($video->state) : 'New' }}</a></li>
            <li class="active"><strong><a href="/admin/videos/edit/{{ $video->alpha_id }}">{{ $video->title  }}</a></strong></li>
            @else
            <li class="active"><strong>Add New Video</strong></li>
            @endif
        </ol>

        <div class="row">
            <div class="col-sm-9">
                @if(($video) && (($video->file) || ($video->url)))
                    @include('admin.videos.partials.license')
                @endif
                <ul class="nav nav-tabs" role="tablist">
                    @if(!$video)
                        <li class="active">
                            <a href="#contact_search" role="tab" data-toggle="tab">Create a Video</a>
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

                        @if(!isset($video->currentContract->signed_at) || !isset($video->contact))
                        <li>
                            <a href="#contact" role="tab" data-toggle="tab">Contact</a>
                        </li>
                        @endif

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
                            @include('admin.videos.partials.metadata')
                        </div>

                        <div class="tab-pane" id="moredetails">
                            @include('admin.videos.partials.moredetails')
                        </div>

                        <div class="tab-pane" id="image_files">
                            @include('admin.videos.partials.image_files')
                        </div>

                        <div class="tab-pane" id="video_files">
                            @include('admin.videos.partials.video_files')
                        </div>

                        <div class="tab-pane" id="sales">
                            @include('admin.videos.partials.sales')
                        </div>

                        <div class="tab-pane" id="rights">
                            @include('admin.videos.partials.rights')
                        </div>

                        @if(!isset($video->currentContract->signed_at) || !isset($video->contact))
                        <div class="tab-pane" id="contact">
                            @include('admin.videos.partials.choose_contact')
                        </div>
                        @endif

                        <div class="tab-pane {{ (session('active_tab') == 'contract') ? 'active' : '' }}" id="contract">
                            @include('admin.contracts.partials.form')
                        </div>

                        <div class="tab-pane" id="admin">
                            @include('admin.videos.partials.admin')
                        </div>

                        <div class="tab-pane" id="analytics">
                            @include('admin.videos.partials.analytics')
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
                    <div class="tab-pane active" id="contact_search">
                        @include('admin.videos.partials.basic_information')
                    </div>
                </div>
                @endif
            </div>
            <div class="col-sm-3">
                @if($video)
                    <div class="col-sm-12 ">
                        <div class="row">
                            <div class="form-group clearfix">
                                @if($previous)
                                    <a href="{{ url('admin/videos/edit/' . $previous->alpha_id) }}" class="btn btn-primary">
                                        < Previous
                                    </a>
                                @endif
                                @if($next)
                                    <a href="{{ url('admin/videos/edit/' . $next->alpha_id) }}" class="btn btn-primary pull-right">
                                        Next >
                                    </a>
                                @endif
                            </div>
                        </div>
                    </div>

                    <div class="clear"></div>

                    @include('admin.videos.partials.contact')

                    @include('admin.videos.partials.comments')
                @endif
            </div>
        </div>

        <div class="clear"></div>
    </div>

    @if($video)
        @include('admin.contracts.partials.contract_modal')
    @endif

    @include('admin.modals.add_contact_modal')
@endsection

@section('javascript')
    @include('admin.videos.partials.javascript')
@endsection
