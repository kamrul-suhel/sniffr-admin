<div class="row">
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
</div>