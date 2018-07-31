<div class="row">
    <div class="form-group col-md-6">
        <span class="input-group">
            <span class="input-group-addon">
                Vertical
            </span>

            <select id="video_category_id" name="video_category_id" class="selectpicker form-control" title="choose a vertical">
                @foreach($video_categories as $category)
                    <option value="{{ $category->id }}" {{ (($asset) && ($asset->video_category_id == $category->id)) ? 'selected="selected"' : '' }}>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>
        </span>
    </div>
</div>

<div class="row">
    <span class="form-group col-md-6">
        <span class="input-group">
            <span class="input-group-addon">
                Collection
            </span>

            <select id="video_collection_id" name="video_collection_id" class="selectpicker form-control" title="choose a collection">
                @foreach($video_collections as $collection)
                    <option value="{{ $collection->id }}"
                            @if(!empty($asset->video_collection_id) && $asset->video_collection_id == $collection->id)selected="selected"@endif>{{ $collection->name }}</option>
                @endforeach
            </select>
        </span>
    </span>
</div>

<div class="row">
    <span class="form-group col-md-6">
        <span class="input-group">
            <span class="input-group-addon">
                Shot Type
            </span>

            <select id="video_shottype_id" name="video_shottype_id" class="selectpicker form-control">
                <option value="">Please Select</option>
                @foreach($video_shottypes as $shottype)
                    <option value="{{ $shottype->id }}"
                            {{ (($asset) && ($asset->video_shottype_id == $shottype->id)) ? 'selected="selected"' : '' }}>
                        {{ $shottype->name }}
                    </option>
                @endforeach
                <option value="">N/A</option>
            </select>
        </span>
    </span>
</div>

<div class="row">
    <span class="form-group col-md-6">
        <div id="video-analysis"></div>

        <span class="input-group">
            <span class="input-group-addon">Tags</span>

            <input class="form-control" name="tags" id="tags" data-role="tagsinput" value="@if($tags)
            @foreach($tags as $tag)
            {{ $tag->name . ',' }}
            @endforeach
            @endif" title="tags">
        </span>
    </span>
</div>

<div class="row">
    <span class="form-group col-md-6">
        <span class="input-group">
            <span class="input-group-addon">
                Location
            </span>

            <input type="text" class="form-control" name="location" id="location" value="{{ ($asset && $asset->location != 'null') ? $asset->location : '' }}"/>
        </span>
    </span>
</div>

<div class="row">
    <div class="col-md-6">
        <span class="form-group input-group">
            <span class="input-group-addon">
                Filmed Date
            </span>
            <input type="date" class="form-control" name="date_filmed" id="date_filmed" disabled="disabled" value="{{
            ($asset) ? $asset->date_filmed : ''
            }}" title="date filmed"/>
        </span>

        <span class="form-group input-group">
            <span class="input-group-addon">
                Uploaded Date
            </span>
            <input type="text" class="form-control" name="created_at" id="created_at" disabled="disabled" value="{{
            ($asset) ? ($asset->created_at)->format('d/m/Y') : ''
            }}"/>
        </span>
    </div>
</div>

<div class="row">
    <span class="col-md-6">
        <span class="form-group input-group">
            <span class="input-group-addon">
                Duration (Hours : Minutes : Seconds)
            </span>

            <input class="form-control" name="duration" id="duration" value="{{
            ($asset) ? gmdate('H:i:s', $asset->duration) : ''
            }}" placeholder="Enter the video duration in the following format (Hours : Minutes : Seconds)">
        </span>
    </span>
</div>

<div class="row">
    <div class="col-md-6">
        <div class="form-group input-group">
            <span class="input-group-addon">Notes</span>
            <textarea class="form-control" name="notes" id="notes" rows="4" title="notes">{{
				$asset->notes or old('notes')
				}}</textarea>
        </div>
    </div>
</div>

<div class="row">
    <span class="col-md-12">
        <span class="form-group input-group">
            <span class="input-group-addon">
                Video Details, Links, and Info
            </span>

            <textarea class="form-control" name="details" id="details" rows="10">{!! ($asset) ? $asset->details : '' !!}</textarea>
        </span>
    </span>
</div>

@if($asset->state == 'licensed' && (Auth::user()->role == 'admin' || Auth::user()->role == 'manager'))
    <div class="form-group">
        <div class="input-group">
            <span class="input-group">Make Featured</span>
            <input type="checkbox" @if(isset($asset->featured) && $asset->featured==1)checked="checked"@endif value="1" name="featured" id="featured" />
        </div>
    </div>
@endif
