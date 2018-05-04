<div class="row">
    <div class="col-md-6">
        <div class="input-group">
            <span class="input-group-addon">Choose Creator</span>
            <select type="text" class="form-control" id="creator_id" name="creator_id" title="creator">
                <option value="">--</option>
                <option value="">UNILAD</option>
                <option value="">--</option>
                <option value="">Unassigned</option>
                <option value="">--</option>
                @foreach($creators as $creator)
                    <option value="{{ $creator->id }}" {{ ((($video) && ($video->contact_id == $creator->id)) || (old('creator_id') == $creator->id)) ? 'selected="selected"' : '' }}>
                        {{ $creator->full_name }}
                    </option>
                @endforeach
            </select>
        </div>
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Create Contract</button>
    </div>
</div>

