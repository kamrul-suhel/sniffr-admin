<div class="col-md-2">
    <div class="form-group">
        <select id="state" name="state" class="form-control">
            <option value="all">State</option>
            @foreach(config('videos.states') as $state)
                <option value="{{ $state }}"{{ $chosen_state == $state ? ' selected' : ''}}>{{ ucwords($state) }}</option>
            @endforeach
            <option value="deleted"{{ $chosen_state == $state ? ' selected' : '' }}>Deleted</option>
        </select>
    </div>
</div>

<div class="col-md-1">
    <div class="form-group">
        <select id="category" name="category" class="form-control">
            <option value="">Vertical</option>
            @foreach($video_categories as $category)
                <option value="{{ $category->id }}"{{ $chosen_vertical == $category->id ? ' selected' : '' }}>{{ $category->name }}</option>
            @endforeach
        </select>
    </div>
</div>

<div class="col-md-1">
    <div class="form-group">
        <select id="collection" name="collection" class="form-control">
            <option value="">Collection</option>
            @foreach($video_collections as $collection)
                <option value="{{ $collection->id }}"{{ $chosen_collection == $collection->id ? ' selected' : '' }}>{{ $collection->name }}</option>
            @endforeach
        </select>
    </div>
</div>

<div class="col-md-1">
    <div class="form-group">
        <select id="shot_type" name="shottype" class="form-control">
            <option value="">ShotType</option>
            @foreach($video_shottypes as $shottype)
                <option value="{{ $shottype->id }}"{{ $chosen_shot_type == $shottype->id ? ' selected' : '' }}>{{ $shottype->name }}</option>
            @endforeach
        </select>
    </div>
</div>

<div class="col-md-1">
    <div class="form-group">
        <select id="rights" name="rights" class="form-control">
            <option value="">License</option>
            <option value="ex"{{ $chosen_rights == 'ex' ? ' selected="selected"' : '' }}>Ex Submission</option>
            <option value="exc"{{ $chosen_rights == 'exc' ? ' selected="selected"' : '' }}>Ex Chaser</option>
            <option value="excc"{{ $chosen_rights == 'excc' ? ' selected="selected"' : '' }}>Ex Chaser Channel</option>
            <option value="nonex"{{ $chosen_rights == 'nonex' ? ' selected="selected"' : '' }}>Non Ex</option>
            <option value="nonexc"{{ $chosen_rights == 'nonexc' ? ' selected="selected"' : '' }}>Non Ex Chaser</option>
        </select>
    </div>
</div>
