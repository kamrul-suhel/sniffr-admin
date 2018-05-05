@if($video)
    <input type="hidden" id="id" name="id" value="{{ $video->alpha_id }}"/>
    <input type="hidden" id="temp_filename" name="temp_filename" value="{{ basename($video->file) }}"/>
    <input type="hidden" id="temp_state" name="temp_state" value="{{ basename($video->state) }}"/>
@endif

{{ csrf_field() }}
<div id="video-error" class="error"></div>

<div class="row save_button">
    <input type="submit" value="{{ ($video) ? 'Update Video' : 'Create Video' }}" class="btn btn-success pull-right"/>
</div>
</form>