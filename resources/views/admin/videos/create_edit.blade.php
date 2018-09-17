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

        <form method="POST" action="{{ ($asset) ? route('videos.update', ['id' => $asset->id]) : route('videos.store') }}" id="video-form" name="video-form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
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

                            @if($asset->more_details)
                                <li>
                                    <a href="#moredetails" role="tab" data-toggle="tab">More Details</a>
                                </li>
                            @endif

                            <li>
                                <a href="#media" role="tab" data-toggle="tab">Media</a>
                            </li>

                            @if($asset->rights != 'ex' || $asset->rights != 'nonex')
                            <li class="{{ (session('active_tab') == 'contract') ? 'active' : '' }}">
                                <a href="#contract" role="tab" data-toggle="tab">Contract</a>
                            </li>
                            @endif

                            <li>
                                <a href="#analytics" role="tab" data-toggle="tab">Page URL</a>
                            </li>

                            @if(count($activeLicenses))
                            <li>
                                <a href="#sales" role="tab" data-toggle="tab">Sales</a>
                            </li>
                            @endif

                            @if(auth()->user()->role === 'admin')
                            <li>
                                <a href="#logs" role="logs" data-toggle="tab">Logs</a>
                            </li>
                            @endif

                            <li>
                                <a href="#admin" role="tab" data-toggle="tab">Admin</a>
                            </li>
                         @endif
                    </ul>
                    @if($asset)
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

                        <div class="tab-pane" id="media">
                            @include('admin.videos.partials.media')
                        </div>

                        <div class="tab-pane {{ (session('active_tab') == 'contract') ? 'active' : '' }}" id="contract">
                            @include('admin.contracts.partials.form')
                        </div>

                        <div class="tab-pane" id="analytics">
                            @include('admin.videos.partials.analytics')
                        </div>

                        @if(count($activeLicenses))
                        <div class="tab-pane" id="sales">
                            @include('admin.videos.partials.sales')
                        </div>
                        @endif

                        @if(auth()->user()->role === 'admin')
                        <div class="tab-pane" id="logs">
                            @include('admin.videos.partials.log')
                        </div>
                        @endif

                        <div class="tab-pane" id="admin">
                            @include('admin.videos.partials.admin')
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

                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Comments</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>

                            <div class="panel-body" style="display: block; background: #fcfcfc;">
                                <comments-component :asset="{{ json_encode($asset) }}" asset-type="video"></comments-component>
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        </form>

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
    <script src="{{asset('assets/admin/scripts/scripts.js')}}"></script>
@stop
