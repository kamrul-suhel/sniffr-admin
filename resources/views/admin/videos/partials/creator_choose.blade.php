<form method="POST" action="{{ route('videos.store') }}" id="video-create-form" name="video-create-form"
      accept-charset="UTF-8" file="1" enctype="multipart/form-data">
    <div class="row">
        <div class="col-md-12">
            <h2>1- Add/Choose a Creator</h2>
        </div>
    </div>
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
        <div class="col-md-4">
            <div class="input-group">OR &nbsp;
                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#add_creator_modal">
                    Add a New Creator
                </button>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <h2>2- Initial Copy</h2>
            @include('admin.videos.partials.copy')
            <input type="submit" class="btn btn-primary btn-lg" value="Save &rarr;"/>
        </div>
    </div>
    {{ csrf_field() }}
</form>