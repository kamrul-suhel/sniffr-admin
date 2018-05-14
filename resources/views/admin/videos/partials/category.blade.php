<div class="row">
    <span class="col-md-6">
        <span class="input-group">
            <span class="input-group-addon">
                Collection
            </span>
            <select id="video_collection_id" name="video_collection_id" class="selectpicker form-control" title="choose a collection">
                @foreach($video_collections as $collection)
                    <option value="{{ $collection->id }}"
                            @if(!empty($video->video_collection_id) && $video->video_collection_id == $collection->id)selected="selected"@endif>{{ $collection->name }}</option>
                @endforeach
                </select>
        </span>
    </span>
</div>