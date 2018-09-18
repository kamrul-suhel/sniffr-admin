<select id="priority" name="priority" data-type="{{ $asset_type }}" data-id="{{ $asset->alpha_id }}" class="js-asset-update" title="Priority">
    <option value="">Priority</option>
    @foreach(config('stories.priorities') as $priority)
        <option value="{{ $priority }}" @if($asset->priority==$priority) selected @endif>{{ ucwords(str_replace('-', ' ', $priority)) }}</option>
    @endforeach
</select>