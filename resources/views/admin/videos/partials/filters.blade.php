<div class="col-md-1">
    <div class="form-group">
        <select id="state" name="state" class="form-control">
            <option value="">State</option>
            @foreach(config('videos.states') as $state)
                <option value="{{ $state }}"{{ isset($_GET['state']) && ($_GET['state'] == $state) ? ' selected="selected"' : '' }}>{{ ucwords($state) }}</option>
            @endforeach
            <option value="deleted"{{ isset($_GET['state']) && ($_GET['state'] == $state) ? ' selected="selected"' : '' }}>Deleted</option>
        </select>
    </div>
</div>

<div class="col-md-1">
    <div class="form-group">
        <select id="category" name="category" class="form-control">
            <option value="">Vertical</option>
            @foreach($video_categories as $category)
                <option value="{{ $category->id }}"{{ isset($_GET['category']) && ($_GET['category'] == $category->id) ? ' selected="selected"' : '' }}>{{ $category->name }}</option>
            @endforeach
        </select>
    </div>
</div>

<div class="col-md-1">
    <div class="form-group">
        <select id="collection" name="collection" class="form-control">
            <option value="">Collection</option>
            @foreach($video_collections as $collection)
                <option value="{{ $collection->id }}"{{ isset($_GET['collection']) && ($_GET['collection'] == $collection->id) ? ' selected="selected"' : '' }}>{{ $collection->name }}</option>
            @endforeach
        </select>
    </div>
</div>

<div class="col-md-1">
    <div class="form-group">
        <select id="shot_type" name="shottype" class="form-control">
            <option value="">ShotType</option>
            @foreach($video_shottypes as $shottype)
                <option value="{{ $shottype->id }}"{{ isset($_GET['shottype']) && ($_GET['shottype'] == $shottype->id) ? ' selected="selected"' : '' }}>{{ $shottype->name }}</option>
            @endforeach
        </select>
    </div>
</div>

<div class="col-md-1">
    <div class="form-group">
        <select id="rights" name="rights" class="form-control">
            <option value="">License</option>
            <option value="ex"{{ (app('request')->get('rights') == 'ex') ? ' selected="selected"' : '' }}>Ex Submission</option>
            <option value="exc"{{ (app('request')->get('rights') == 'exc') ? ' selected="selected"' : '' }}>Ex Chaser</option>
            <option value="excc"{{ (app('request')->get('rights') == 'excc') ? ' selected="selected"' : '' }}>Ex Chaser Channel</option>
            <option value="nonex"{{ (app('request')->get('rights') == 'nonex') ? ' selected="selected"' : '' }}>Non Ex</option>
            <option value="nonexc"{{ (app('request')->get('rights') == 'nonexc') ? ' selected="selected"' : '' }}>Non Ex Chaser</option>
        </select>
    </div>
</div>
