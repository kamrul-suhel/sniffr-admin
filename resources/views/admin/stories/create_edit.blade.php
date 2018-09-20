@extends('admin.master')

@section('content')
    <!-- This is where -->
    <ol class="breadcrumb">
        <li><a href="{{ (isset($chosen_decision) ? '/admin/licenses/stories/?decision='.$chosen_decision : '/admin/stories') }}"><i class="fa fa-tasks"></i> Stories</a></li>
        <li class="active">
            @if(!empty($asset->id))
                <strong>Edit Story</strong>
            @else
                <strong>New Story</strong>
            @endif
        </li>
    </ol>

    @if($asset && $asset->trashed())
    <div class="row">
        <div class="col-lg-12">
            <div class="col-lg-12 label label-danger">Deleted
                ({{ date('dS F Y @ h:s', strtotime($asset->deleted_at)) }})
            </div>
        </div>
    </div>
    @endif

    <div class="clear"></div>

    <form method="POST" action="{{ $post_route }}" id="js-story-form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
        <div class="row">
            <div class="col-sm-12">
                @include('admin.assets.partials.quotes')

                <div class="form-group">
                    <div>
                        <input type="text" class="form-control story-title" name="title" id="title" placeholder="Story Title" value="@if(!empty($asset->title)){{ $asset->title }}@endif"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-4"> <!-- first column -->
                @include('admin.stories.partials.assets')

                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">
                        <div class="panel-title">Story Description</div>

                        <div class="panel-options">
                            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                        </div>
                    </div>

                    <div class="panel-body" style="display: block;">
                        <textarea class="form-control" name="description" id="details">@if(!empty($asset->description)){{ htmlspecialchars($asset->description) }}@endif</textarea>
                    </div>
                </div>

                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">
                        <div class="panel-title">Include Video Assets</div>

                        <div class="panel-options">
                            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                        </div>
                    </div>

                    <div class="panel-body" style="display:none">
                        <div class="js-video-inputs-wrapper">
                            @if(isset($asset))
                                @foreach($asset->videos as $video)
                                    <div class="form-group input-group">
                                        <input type="text" class="form-control" value="{{ $video->title }}" disabled/>
                                        <input type="hidden" name="videos[]" value="{{ $video->id }}"/>
                                        <span class="input-group-btn">
                                        <button class="js-remove-input btn btn-default"><i class="fa fa-times" aria-hidden="true"></i></button>
                                    </span>
                                    </div>
                                @endforeach
                            @endif
                        </div>

                        <br>

                        <button class="btn btn-default js-story-add-video-button pull-right">Add Video Asset</button>
                    </div>
                </div>
            </div>

            <div class="col-sm-4"> <!-- second column -->
                @include('admin.stories.partials.licensing_information')
            </div>

            <div class="col-sm-4"> <!-- third column -->
                <div class="row">
                    <div class="col-xs-6">
                        @include('admin.users.partials.select')
                    </div>

                    <div class="col-xs-6">
                        @include('admin.assets.partials.priority-panel')
                    </div>
                </div>

                @if(isset($asset->id))
                    @include('admin.assets.partials.comments')

                    @if(auth()->user()->role === 'admin')
                        @include('admin.assets.partials.log')
                    @endif

                    @if($user->username == 'ianlainchbury' || $user->username == 'mikewright' || $user->username == 'hemmitkerrai')
                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title">Admin</div>

                            <div class="panel-options">
                                <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                            </div>
                        </div>

                        <div class="panel-body" style="display: block;">
                            <span class="form-group input-group">
                                <span class="input-group-addon">WordPress ID</span>

                                <input type="text" class="form-control" name="wp_id" id="wp_id" value="{{ isset($asset) ? $asset->wp_id : '' }}"/>
                            </span>

                            <a href="{{ url('admin/stories/wp_refresh/'.$asset->alpha_id) }}" class="btn btn-warning">WP Refresh</a>
                        </div>
                    </div>
                    @endif

                    @include('admin.contracts.partials.form')

                    <input type="hidden" id="id" name="id" value="{{ $asset->id }}"/>
                    <input type="hidden" id="alpha_id" name="alpha_id" value="{{ $asset->alpha_id }}"/>
                    <input type="hidden" name="decision" value="{{ (isset($chosen_decision) ? $chosen_decision : '') }}"/>
                @endif

                <input type="hidden" name="_token" value="<?= csrf_token() ?>"/>
                <input type="hidden" name="decision" value="{{ (isset($chosen_decision) ? $chosen_decision : '') }}"/>
                <input type="hidden" name="type" value="{{ (isset($asset) ? $asset->type : 'new') }}"/>
            </div>
        </div>
    </form>

    <hr>

    @if(isset($asset->id) && !$asset->trashed())
        <a href="{{ url('admin/stories/delete/'.$asset->alpha_id) }}" class="btn btn-danger">Delete Story</a>
    @endif

    @if(isset($asset->id) && isset($chosen_decision) && $chosen_decision == 'licensing' && ($asset->state=='licensing' || $asset->state=='unlicensed' || $asset->state=='unapproved' || $asset->state=='rejected'))
        <a href="{{ url('admin/stories/status/licensed/'.$asset->alpha_id.'/?decision='.(isset($chosen_decision) ? $chosen_decision : '')) }}" class="btn btn-primary pull-right" style="margin-left:10px;">License (without contract)</a>
    @endif

    <a href="#" id="saveStory" class="btn btn-success pull-right">{{ $button_text }}</a>

    @if(isset($asset) && isset($chosen_decision) && $chosen_decision!='content-sourced' && $asset->url)
        <a href="{{ $asset->url }}" class="btn btn-grey pull-right" target="_blank" style="margin-right:10px;">View Story in Wordpress</a>
    @endif

    <div class="clear"></div>
    @if(isset($asset))
        @include('admin.contracts.partials.contract_modal')
    @endif

    @include('admin.contacts.partials.modal')
@stop

@section('javascript')
    <script src="{{asset('assets/admin/scripts/scripts.js')}}"></script>
    @include('admin.assets.partials.js')
@stop
