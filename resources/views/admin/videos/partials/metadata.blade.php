<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Metadata</div>

        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body" style="display: block; background: #fcfcfc;">
        <div class="form-group">
            <span class="input-group">
                <span class="input-group-addon">
                    Source URL @if($asset && $asset->precedent_link) <a target="_blank" href="{{$asset->precedent_link}}"><i class="fa fa-external-link"></i></a> @endif
                </span>
                <input type="text" class="form-control" name="precedent_link" id="precedent_link" value="{{ ($asset && $asset->precedent_link != 'null') ? $asset->precedent_link : '' }}"/>
            </span>
        </div>

        <div class="form-group input-group">
            <span class="input-group-addon">Credit</span>
            <textarea class="form-control" name="credit" id="credit" rows="4" title="">{{ $asset->credit or old('credit') }}</textarea>
        </div>

        <div class="form-group input-group">
            <span class="input-group-addon">Notes</span>
            <textarea class="form-control" name="notes" id="notes" rows="4" title="notes">{{
				$asset->notes or old('notes')
				}}</textarea>
        </div>

        <div class="form-group">
            <span class="input-group">
                <span class="input-group-addon">Rights</span>

                <select name="rights" class="form-control">
                    <option value="">License</option>
                    <option value="ex"{{ $asset && $asset->rights == 'ex' ? ' selected="selected"' : '' }}>Ex Submission</option>
                    <option value="exc"{{ $asset && $asset->rights == 'exc' ? ' selected="selected"' : '' }}>Ex Chaser</option>
                    <option value="excc"{{ $asset && $asset->rights == 'excc' ? ' selected="selected"' : '' }}>Ex Chaser Channel</option>
                    <option value="nonex"{{ $asset && $asset->rights == 'nonex' ? ' selected="selected"' : '' }}>Non Ex Submission</option>
                    <option value="nonexc"{{ $asset && $asset->rights == 'nonexc' ? ' selected="selected"' : '' }}>Non Ex Chaser</option>
                </select>
            </span>
        </div>

        <hr>

        <div class="form-group">
            <span class="input-group">
                <span class="input-group-addon">
                    Vertical
                </span>

                <select id="video_category_id" name="video_category_id" class="form-control">
                    <option value="">Select Vertical</option>
                    @foreach($video_categories as $category)
                        <option value="{{ $category->id }}" {{ (($asset) && ($asset->video_category_id == $category->id)) ? 'selected="selected"' : '' }}>
                            {{ $category->name }}
                        </option>
                    @endforeach
                </select>
            </span>
        </div>

        <div class="form-group">
            <span class="input-group">
                <span class="input-group-addon">
                    Collection
                </span>

                <select id="video_collection_id" name="video_collection_id" class="form-control">
                    <option value="">Select Collection</option>
                    @foreach($video_collections as $collection)
                        <option value="{{ $collection->id }}" @if(!empty($asset->video_collection_id) && $asset->video_collection_id == $collection->id)selected="selected"@endif>
                            {{ $collection->name }}
                        </option>
                    @endforeach
                </select>
            </span>
        </div>

        <div class="form-group">
            <span class="input-group">
                <span class="input-group-addon">
                    Shot Type
                </span>

                <select id="video_shottype_id" name="video_shottype_id" class="form-control">
                    <option value="">Select Shot Type</option>
                    @foreach($video_shottypes as $shottype)
                        <option value="{{ $shottype->id }}" {{ (($asset) && ($asset->video_shottype_id == $shottype->id)) ? 'selected="selected"' : '' }}>
                            {{ $shottype->name }}
                        </option>
                    @endforeach
                </select>
            </span>
        </div>

        <div class="form-group">
            <div id="video-analysis"></div>

            <span class="input-group">
                <span class="input-group-addon">Tags</span>

                <input class="form-control" name="tags" id="tags" data-role="tagsinput" value="@if($tags)
                @foreach($tags as $tag)
                {{ $tag->name . ',' }}
                @endforeach
                @endif" title="tags">
            </span>
        </div>

        <div class="form-group">
            <span class="input-group">
                <span class="input-group-addon">
                    Location
                </span>
                <input type="text" class="form-control" name="location" id="location" value="{{ ($asset && $asset->location != 'null') ? $asset->location : '' }}"/>
            </span>
        </div>

        <div class="form-group input-group">
            <span class="input-group-addon">
                Filmed Date
            </span>
            <input type="date" class="form-control" name="date_filmed" id="date_filmed" disabled="disabled" value="{{ $asset ? $asset->date_filmed : '' }}" title="date filmed"/>
        </div>

        <div class="form-group input-group">
            <span class="input-group-addon">
                Uploaded Date
            </span>
            <input type="text" class="form-control" name="created_at" id="created_at" disabled="disabled" value="{{ $asset ? ($asset->created_at)->format('d/m/Y H:i:s') : '' }}"/>
        </div>

        <div class="form-group input-group">
            <span class="input-group-addon">
                Duration (Hours : Minutes : Seconds)
            </span>

            <input class="form-control" name="duration" id="duration" value="{{ $asset ? gmdate('H:i:s', $asset->duration) : '' }}" placeholder="Enter the video duration in the following format (Hours : Minutes : Seconds)">
        </div>

        <div class="form-group input-group">
            <span class="input-group-addon">Video Class</span>

            <select name="class" class="form-control" id="class">
                @foreach(config('pricing.class') as $key => $value)
                    <option {{ ($asset && $key == $asset->class) ? 'selected': '' }} value="{{ $key }}">{{ $value['modifier'] }}:{{ $value['name'] }}</option>
                @endforeach
            </select>
        </div>

        @if(Auth::user()->role == 'admin' || Auth::user()->role == 'manager')
        <div class="form-group">
            <div class="input-group">
                <input class="form-inline" type="checkbox" title="Appears on the home page" @if($asset && $asset->featured==1)checked="checked"@endif value="1" name="featured" id="featured" @if($asset && ($asset->state != 'licensed' || !$asset->file)) disabled @endif /><label for="featured">&nbsp;Make Featured @if($asset && ($asset->state != 'licensed' || !$asset->file)) (must be licensed and a file)@endif</label>
            </div>
        </div>
        @endif
    </div>
</div>
