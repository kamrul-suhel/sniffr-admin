@extends('admin.master')

@section('content')
    <div id="admin-container">
        @include('admin.videos.partials.breadcrumb')

        <div class="row bottom-padding">
            @include('admin.videos.partials.title')

            <div class="col-sm-12">
                <div class="row">
                    @include('admin.videos.partials.search')
                    @include('admin.videos.partials.prev_next_nav')
                </div>
            </div>
        </div>

        <div class="clear"></div>

        @include('admin.videos.partials.license')

        <form method="POST" action="{{ $post_route }}" id="video-form" name="video-form" accept-charset="UTF-8" file="1"
              enctype="multipart/form-data">

            @include('admin.videos.partials.non_exclusive_fields')

            @include('admin.videos.partials.assign_form')

            @include('admin.videos.partials.video_information')

            @include('admin.videos.partials.video_files')

            <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title">
                                <label for="description">Short Description</label>
                            </div>
                            <div class="panel-options">
                                <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                            </div>
                        </div>
                        <div class="panel-body">
                            <p>Add a short description of the video below:</p>

                            <textarea class="form-control" name="description" id="description">{{
                            ($video) ? htmlspecialchars($video->description) : ''
                            }}</textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title">
                                <label for="location">Location</label>
                            </div>

                            <div class="panel-options">
                                <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                            </div>
                        </div>

                        <div class="panel-body" style="display: block;">
                            <p>Where was the video filmed?</p>
                            <input type="text" class="form-control" name="location" id="location"
                                   value="@if(!empty($video->location)){{ $video->location }}@endif"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Video Details, Links, and Info</div>

                    <div class="panel-options">
                        <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                    </div>
                </div>

                <div class="panel-body" style="display: block; padding:0px;">
                    <textarea class="form-control" name="details"
                              id="details">@if(!empty($video->details)){{ htmlspecialchars($video->details) }}@endif</textarea>
                </div>
            </div>

            <div id="video-error" class="error"></div>

            <div class="row">
                <div class="col-sm-4">
                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title">Vertical</div>

                            <div class="panel-options">
                                <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                            </div>
                        </div>

                        <div class="panel-body" style="display: block;">
                            <p>Select a Vertical Below:</p>
                            <select id="video_category_id" name="video_category_id">
                                <option value="0">Please Select</option>
                                @foreach($video_categories as $category)
                                    <option value="{{ $category->id }}"
                                            @if(!empty($video->video_category_id) && $video->video_category_id == $category->id)selected="selected"@endif>{{ $category->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title">Collection</div>

                            <div class="panel-options">
                                <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                            </div>
                        </div>

                        <div class="panel-body" style="display: block;">
                            <p>Select a Video Collection Below:</p>
                            <select id="video_collection_id" name="video_collection_id">
                                <option value="0">Please Select</option>
                                @foreach($video_collections as $collection)
                                    <option value="{{ $collection->id }}"
                                            @if(!empty($video->video_collection_id) && $video->video_collection_id == $collection->id)selected="selected"@endif>{{ $collection->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title">Shot Type</div>

                            <div class="panel-options">
                                <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                            </div>
                        </div>

                        <div class="panel-body" style="display: block;">
                            <p>Select a Shot Type Below:</p>
                            <select id="video_shottype_id" name="video_shottype_id">
                                <option value="0">Please Select</option>
                                @foreach($video_shottypes as $shottype)
                                    <option value="{{ $shottype->id }}"
                                            @if(!empty($video->video_shottype_id) && $video->video_shottype_id == $shottype->id)selected="selected"@endif>{{ $shottype->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            @if($video)
                <div class="row">
                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Campaign</div>

                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>

                            <div class="panel-body" style="display: block;">
                                <select name="campaigns[]" id="campaigns" class="form-control" multiple>
                                    @if(!empty($video_campaigns))
                                        @foreach($video_campaigns as $campaign)
                                            <option value="{{ $campaign->id }}"{{ isset($video) && $video->campaigns()->get()->contains($campaign->id)  ? " selected" : "" }}>{{ $campaign->name }}</option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Client Exclusivity</div>

                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>

                            <div class="panel-body" style="display: block;">
                                @if(isset($video) && count($video->campaigns)>0)
                                    @foreach($video->campaigns as $campaign)
                                        <?php
                                        $date1 = now();
                                        $date2 = new DateTime($campaign->pivot->created_at);

                                        $diff = $date2->diff($date1);

                                        $exclusivity = 48 - ($diff->h + ($diff->days * 24));
                                        ?>
                                        {{ $campaign->name }}
                                        : {{ $exclusivity > 0 ? $exclusivity.' Hours left' : 'Exclusivity Expired' }}
                                    @endforeach
                                @else
                                    <p>Not currently selected for any campaigns</p>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            @endif

            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Tags</div>

                    <div class="panel-options">
                        <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                    </div>
                </div>

                <div class="panel-body" style="display: block;">
                    <div id="video-analysis"></div>
                    <p>Add video tags below:</p>
                    <input class="form-control" name="tags" id="tags" data-role="tagsinput"
                           value="@if(!empty($video) && $video->tags->count() > 0)@foreach($video->tags as $tag){{ $tag->name . ', ' }}@endforeach @endif">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-4">
                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title"> Duration</div>
                            <div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                            </div>
                        </div>
                        <div class="panel-body">
                            <p>Enter the video duration in the following format (Hours : Minutes : Seconds)</p>
                            <input class="form-control" name="duration" id="duration"
                                   value="@if(!empty($video->duration)){{ gmdate('H:i:s', $video->duration) }}@endif">
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title"> Rights Management</div>
                            <div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                            </div>
                        </div>
                        <div class="panel-body">
                            <p>Select if the video is exclusive or non-exclusive</p>
                            <select id="rights" name="rights">
                                <option value="ex"
                                        @if(isset($video->rights)) @if($video->rights == 'ex') selected @endif @endif>
                                    Exclusive
                                </option>
                                <option value="nonex"
                                        @if(isset($video->rights)) @if($video->rights == 'nonex') selected @endif @endif>
                                    Non-Exclusive
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            @if(isset($video))
                <input type="hidden" id="id" name="id" value="{{ $video->alpha_id }}"/>
                <input type="hidden" id="temp_filename" name="temp_filename" value="{{ basename($video->file) }}"/>
                <input type="hidden" id="temp_state" name="temp_state" value="{{ basename($video->state) }}"/>
            @endif

            <input type="hidden" name="_token" value="<?= csrf_token() ?>"/>

            @if(isset($video))
                @if($video->trashed())
                    <a href="{{ url('admin/videos/restore/'.$video->alpha_id) }}" title="Restore Video"
                       class="btn btn-warning">
                        <i class="fa fa-fa-upload"></i> Restore
                    </a>
                @else
                    <a href="{{ url('admin/videos/delete/'.$video->alpha_id) }}" title="Delete Video"
                       class="btn btn-danger">
                        <i class="fa fa-trash-o"></i> Delete
                    </a>
                @endif
            @endif

            <input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right"/>
        </form>

        <div class="clear"></div>
    </div>
@endsection

@section('javascript')
    @include('admin.videos.partials.javascript')
@endsection
