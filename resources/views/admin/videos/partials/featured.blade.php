@if($video->state == 'licensed' && (Auth::user()->role == 'admin' || Auth::user()->role == 'manager'))
    <div class="form-group">
        <div class="input-group">
            <span class="input-group">Make Featured</span>
            <input type="checkbox" @if(isset($video->featured) && $video->featured==1)checked="checked"@endif value="1" name="featured" id="featured" />
        </div>
    </div>
@endif