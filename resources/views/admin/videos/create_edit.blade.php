@extends('admin.master')

@section('content')
    <form method="POST" action="{{ ($asset) ? route('videos.update', ['id' => $asset->id]) : route('videos.store') }}" id="video-form" name="video-form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
        <div id="admin-container">
            <ol class="breadcrumb">
                <li><a href="/admin/licenses/videos?state=all">All Videos</a></li>
                @if($asset)
                    <li><a href="/admin/licenses/videos?state={{ ($asset->state) ?: 'new' }}">{{ ($asset->state) ? ucfirst($asset->state) : 'New' }}</a></li>
                    <span class="album-asset-update" id="asset-update-{{ $asset->alpha_id }}"><i class="fa fa-thumbs-up"></i></a> Updated</span>
                    <span class="album-asset-update-error" id="asset-update-error-{{ $asset->alpha_id }}"><i class="fa fa-thumbs-down"></i></a> Something went wrong</span>
                @else
                    <li class="active"><strong>Add New Video</strong></li>
                @endif
            </ol>

            <div class="row">
                <div class="col-xs-8">
                    @include('admin.assets.partials.quotes')

                    <div class="form-group">
                        <div>
                            <input type="text" class="form-control story-title" name="title" id="title" placeholder="Video Title" value="@if(!empty($asset->title)){{ $asset->title }}@endif"/>
                        </div>
                    </div>
                </div>

                <div class="col-xs-4">
                    @if($asset)
                        <div class="form-group clearfix">
                            @if($previous)<a href="{{ url('admin/videos/edit/' . $previous->alpha_id) }}" class="btn btn-primary">< Previous</a>@endif
                            @if($next)<a href="{{ url('admin/videos/edit/' . $next->alpha_id) }}" class="btn btn-primary pull-right">Next ></a>@endif
                        </div>
                    @endif
                </div>
            </div>

            <div class="row">
                <div class="col-sm-4">
                    @include('admin.videos.partials.license')

                    @include('admin.videos.partials.description')

                    @include('admin.videos.partials.media')

                    @include('admin.videos.partials.details')
                </div>

                <div class="col-sm-4">
                    @include('admin.videos.partials.metadata')

                    @include('admin.videos.partials.moredetails')
                </div>

                <div class="col-sm-4">
                    @include('admin.videos.partials.contact')

                    <div class="row">
                        <div class="col-xs-6">
                            @include('admin.users.partials.select')
                        </div>

                        <div class="col-xs-6">
                            @include('admin.assets.partials.priority-panel')
                        </div>
                    </div>


                    @if($asset)
                        @include('admin.assets.partials.comments')

                        @include('admin.contracts.partials.form')

                        @if(count($activeLicenses))
                            @include('admin.videos.partials.sales')
                        @endif

                        @include('admin.videos.partials.analytics')

                        @if(auth()->user()->role === 'admin')
                            @include('admin.assets.partials.log')
                        @endif
                    @endif
                </div>
            </div>

            <hr>

            @if($asset)
                <input type="hidden" id="id" name="id" value="{{ $asset->alpha_id }}"/>
                <input type="hidden" id="temp_filename" name="temp_filename" value="{{ basename($asset->file) }}"/>
                <input type="hidden" id="temp_state" name="temp_state" value="{{ basename($asset->state) }}"/>
            @endif

            {{ csrf_field() }}

            <div id="video-error" class="error"></div>

            <div class="form-group save_button pull-right">
                @if($asset && !$asset->hasContract() && ($asset->state == 'pending' || $asset->state == 'problem' || $asset->state == 'licensed' || $asset->state=='restricted'))
                    @if($asset->state != 'licensed')
                        <a href="{{ url('admin/videos/status/licensed/' . $asset->alpha_id ) }}"
                           class="btn btn-primary btn-success">
                            License
                        </a>
                    @endif
                    @if($asset->state != 'licensed' && $asset->is_exclusive && !$asset->submitted_elsewhere)
                        <a href="{{ url('admin/videos/status/licensed/' . $asset->alpha_id ) }}"
                           class="btn btn-primary btn-warning">
                            Fast Track License (Video is Ex to Unilad)
                        </a>
                    @endif
                    @if($asset->state != 'licensed')
                        <a href="{{ url('admin/videos/status/licensed/' . $asset->alpha_id ) }}"
                           class="btn btn-primary btn-warning">
                            Fast Track License (No conditions)
                        </a>
                    @endif
                    @if($asset->state != 'restricted')
                        <a href="{{ url('admin/videos/status/restricted/' . $asset->alpha_id ) }}"
                           class="btn btn-primary btn-warning">
                            Restricted
                        </a>
                    @endif
                    @if($asset->state != 'problem')
                        <a href="{{ url('admin/videos/status/problem/' . $asset->alpha_id ) }}"
                           class="btn btn-primary btn-danger">
                            Problem
                        </a>
                    @endif
                    |
                @endif

                <input type="submit" value="{{ $asset ? 'Update Video' : 'Create Video' }}" class="btn btn-success"/>
            </div>

            @if($asset)
                @if($asset->trashed())
                    <a href="{{ url('admin/videos/restore/'.$asset->alpha_id) }}" title="Restore Video" class="btn btn-warning"><i class="fa fa-fa-upload"></i> Restore Video</a>
                @else
                    <a href="{{ url('admin/videos/delete/' . $asset->alpha_id) }}" title="Delete Video" class="btn btn-danger"><i class="fa fa-trash-o"></i> Delete Video</a>
                @endif
            @endif
        </form>
    </div>

    <div class="clearfix"></div>

    @if($asset)
        @include('admin.contracts.partials.contract_modal')
    @endif

    @include('admin.contacts.partials.modal')
@stop

@section('javascript')
    <script src="{{asset('assets/admin/scripts/scripts.js')}}"></script>
    @include('admin.assets.partials.js')
@stop
