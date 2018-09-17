<select id="assign_to" name="assign_to" data-type="{{ $assetType }}" data-id="{{ $asset->alpha_id }}" class="js-asset-update" title="Assign To">
    <option value="">Select User</option>
	<?php $userId = $asset->user()->first() ? $asset->user()->first()->id : 0; ?>
    @foreach($users as $user)
        <option value="{{ $user->id }}" @if($userId == $user->id) selected @endif>@if($user->full_name) {{ $user->full_name }} @else {{ $user->username }} @endif</option>
    @endforeach
</select>