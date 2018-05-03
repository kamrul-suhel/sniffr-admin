@extends('admin.master')

@section('css')
    <link rel="stylesheet" href="/css/tabs.css">
@endsection

@section('content')
    <div id="admin-container">
        @include('admin.videos.partials.breadcrumb')

        @if($video)
            @include('admin.videos.partials.prev_next_nav')
        @endif

        <div class="clear"></div>

        @include('admin.videos.partials.license')

        <ul class="nav nav-tabs" role="tablist">
            <li class="active">
                <a href="#contact" role="tab" data-toggle="tab">Creator</a>
            </li>
            <li>
                <a href="#metadata" role="tab" data-toggle="tab">Metadata</a>
            </li>
            <li>
                <a href="#copy" role="tab" data-toggle="tab">Copy</a>
            </li>
            <li>
                <a href="#vertical" role="tab" data-toggle="tab">Vertical</a>
            </li>
            <li>
                <a href="#other" role="tab" data-toggle="tab">Other</a>
            </li>

            @if($video)
                <li>
                    <a href="#delete" role="tab" data-toggle="tab">Delete</a>
                </li>
            @endif
        </ul>

        <form method="POST" action="{{ $post_route }}" id="video-form" name="video-form" accept-charset="UTF-8" file="1"
              enctype="multipart/form-data">
            <div class="panel-body tab-content">
                <div class="tab-pane active" id="contact">
                    @include('admin.videos.partials.creator')
                </div>
                <div class="tab-pane" id="metadata">
                    @include('admin.videos.partials.location')
                    @include('admin.videos.partials.details')
                </div>
                <div class="tab-pane" id="copy">
                    @include('admin.videos.partials.copy')
                </div>
                <div class="tab-pane" id="vertical">
                    @include('admin.videos.partials.vertical')
                </div>
                <div class="tab-pane" id="other">
                    @include('admin.videos.partials.non_exclusive_fields')
                    @include('admin.videos.partials.assign_form')
                    @include('admin.videos.partials.video_information')
                    @include('admin.videos.partials.video_files')
                    @include('admin.videos.partials.collection')
                    @include('admin.videos.partials.shotType')
                    @include('admin.videos.partials.campaign')
                    @include('admin.videos.partials.client_exclusivity')
                    @include('admin.videos.partials.tags')

                    @if($video)
                        @include('admin.videos.partials.rights')
                        @include('admin.videos.partials.duration')
                        @include('admin.videos.partials.delete_restore')
                        <input type="hidden" id="id" name="id" value="{{ $video->alpha_id }}"/>
                        <input type="hidden" id="temp_filename" name="temp_filename"
                               value="{{ basename($video->file) }}"/>
                        <input type="hidden" id="temp_state" name="temp_state" value="{{ basename($video->state) }}"/>
                    @endif
                </div>
                <div class="tab-pane" id="delete">
                    @include('admin.videos.partials.delete_restore')
                </div>
            </div>
            <input type="hidden" name="_token" value="<?= csrf_token() ?>"/>
            <div id="video-error" class="error"></div>

            <div class="row save_button">
                <input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right"/>
            </div>
        </form>

        <div id="comments">
            @if($video)
                @include('admin.videos.partials.comments')
            @endif
        </div>

        <div class="clear"></div>
    </div>
@endsection

@section('javascript')
    @include('admin.videos.partials.javascript')
@endsection
