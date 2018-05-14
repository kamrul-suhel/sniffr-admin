<div class="row">
    <span class="col-md-6">
        <span class="input-group">
            <span class="input-group-addon">
                Vertical
            </span>
            <select id="video_category_id" name="video_category_id" class="selectpicker form-control" title="choose a vertical">
                @foreach($video_categories as $category)
                    <option value="{{ $category->id }}" {{ (($video) && ($video->video_category_id == $category->id)) ? 'selected="selected"' : '' }}>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>
        </span>
    </span>
</div>