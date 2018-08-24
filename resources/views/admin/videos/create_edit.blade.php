@extends('admin.master')

@section('content')
    <div id="admin-container">
        <ol class="breadcrumb">
            <li><a href="/admin/videos">All Videos</a></li>
            @if($asset)
            <li><a href="/admin/videos/{{ ($asset->state) ?: 'new' }}">{{ ($asset->state) ? ucfirst($asset->state) : 'New' }}</a></li>
            <li class="active"><strong><a href="/admin/videos/edit/{{ $asset->alpha_id }}">{{ $asset->title  }}</a></strong></li>
            @else
            <li class="active"><strong>Add New Video</strong></li>
            @endif
        </ol>

        <div class="row">
            <div class="col-sm-9">
                @if(isset($asset))
                    @if(\App\CollectionVideo::isOffered($asset->id)->count() > 0
                    || \App\CollectionVideo::isRequested($asset->id)->count() > 0)
                        <div class="col-lg-12 label label-warning">
                            {{ \App\CollectionVideo::isOffered($asset->id)->count() > 0 ? "Offered: ".\App\CollectionVideo::isOffered($asset->id)->count() : '' }}
                            {{ \App\CollectionVideo::isRequested($asset->id)->count() > 0 ? "Requested: ".\App\CollectionVideo::isRequested($asset->id)->count() : '' }}
                        </div>
                    @endif
                @endif

                @if(($asset) && (($asset->file) || ($asset->url)))
                    @include('admin.videos.partials.license')
                @endif
                <ul class="nav nav-tabs" role="tablist">
                    @if(!$asset)
                        <li class="active">
                            <a href="#contact_search" role="tab" data-toggle="tab">Create a Video</a>
                        </li>
                    @endif

                    @if($asset)
                        <li class="{{ (!session('active_tab')) ? 'active' : '' }}">
                            <a href="#copy" role="tab" data-toggle="tab">Copy</a>
                        </li>

                        <li>
                            <a href="#metadata" role="tab" data-toggle="tab">Metadata</a>
                        </li>

                        <li>
                            <a href="#credits" role="tab" data-toggle="tab">Credits</a>
                        </li>

                        @if($asset->more_details)
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

                        @if(!isset($asset->currentContract->signed_at) || !isset($asset->contact))
                        <li>
                            <a href="#contact" role="tab" data-toggle="tab">Contact</a>
                        </li>
                        @endif

                        @if($asset->rights != 'ex' || $asset->rights != 'nonex')
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
                @if($asset)
                <form method="POST" action="{{ ($asset) ? route('videos.update', ['id' => $asset->id]) : route('videos.store') }}" id="video-form" name="video-form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
                    <div class="panel-body tab-content">
                        <div class="tab-pane {{ (!session('active_tab')) ? 'active' : '' }}" id="copy">
                            @include('admin.videos.partials.copy')
                        </div>

                        <div class="tab-pane" id="metadata">
                            @include('admin.videos.partials.metadata')
                        </div>

                        <div class="tab-pane" id="credits">
                            @include('admin.videos.partials.credits')
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

                        @if(!isset($asset->currentContract->signed_at) || !isset($asset->contact))
                        <div class="tab-pane" id="contact">
                            @include('admin.videos.partials.contact')
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

                    <input type="hidden" id="id" name="id" value="{{ $asset->alpha_id }}"/>
                    <input type="hidden" id="temp_filename" name="temp_filename" value="{{ basename($asset->file) }}"/>
                    <input type="hidden" id="temp_state" name="temp_state" value="{{ basename($asset->state) }}"/>

                    {{ csrf_field() }}

                    <div id="video-error" class="error"></div>

                    <div class="form-group save_button">
                        <div class="clearfix">
                            <input type="submit" value="{{ ($asset) ? 'Update Video' : 'Create Video' }}" class="btn btn-success pull-right"/>
                        </div>
                    </div>
                </form>
                @else
                <div class="panel-body tab-content">
                    <div class="tab-pane active" id="contact_search">
                        @include('admin.videos.partials.initial_information')
                    </div>
                </div>
                @endif
            </div>
            <div class="col-sm-3">
                @if($asset)
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

                    @include('admin.comments.partials.form')

                    @include('admin.videos.partials.log')
                @endif
            </div>
        </div>

        <div class="clear"></div>
    </div>

    @if($asset)
        @include('admin.contracts.partials.contract_modal')
    @endif

    @include('admin.contacts.partials.modal')
@stop

@section('javascript')
    @include('admin.videos.partials.js')
    @include('admin.contacts.partials.js')
@stop
