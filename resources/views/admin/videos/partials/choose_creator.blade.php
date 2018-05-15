<div class="row">
    <div class="col-md-4">
        <div class="input-group">
            <span class="input-group-addon">Creators</span>
            <select type="text" class="selectpicker form-control selected" id="creator_id" name="creator_id"
                    title="search" data-live-search="true"
                    @if(session('note_type') == 'success') data-style="btn-success" @endif>
                <option value="">--</option>
                <option value="">UNILAD</option>
                <option value="">--</option>
                <option value="">Unassigned</option>
                <option value="">--</option>
                @foreach($creators as $creator)
                    <option value="{{ $creator->id }}" {{
                    ((($video) && ($video->contact_id == $creator->id)) || (old('creator_id') == $creator->id) || (session('contact_id') == $creator->id)) ? 'selected="selected"' : ''
                    }}>
                        {{ $creator->full_name }}
                    </option>
                @endforeach
            </select>
        </div>
    </div>
    @if(!$video)
        <div class="col-md-4">
            <div class="input-group">OR &nbsp;
                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#add_creator_modal">
                    Add a New Creator
                </button>
            </div>
        </div>
    @endif
</div>