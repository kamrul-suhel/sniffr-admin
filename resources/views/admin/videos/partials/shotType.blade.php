<div class="row">
    <span class="col-md-6">
        <span class="input-group">
            <span class="input-group-addon">
                Shot Type
            </span>

            <select id="video_shottype_id" name="video_shottype_id" class="selectpicker form-control">
                <option value="0">Please Select</option>
                @foreach($video_shottypes as $shottype)
                    <option value="{{ $shottype->id }}"
                            {{ (($video) && ($video->video_shottype_id == $shottype->id)) ? 'selected="selected"' : '' }}>
                        {{ $shottype->name }}
                    </option>
                @endforeach
            </select>
        </span>
    </span>
</div>