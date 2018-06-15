<div class="row">
    <div class="col-md-12">
        <div class="form-group">
            <div class="input-group">
                <span class="input-group-addon">Title</span>
                <input type="text" class="form-control" name="title" id="title" value="{{
                $video->title or old('title')
                }}" title="title" maxlength="200"/>
            </div>
        </div>

        <div class="form-group">
            <div class="input-group">
                <span class="input-group-addon">Description</span>
                <textarea class="form-control" name="description" id="description" rows="9" title="description">{{
                          $video->description or old('description')
              }}</textarea>
            </div>
        </div>

        @if($video->state == 'licensed' && (Auth::user()->role == 'admin' || Auth::user()->role == 'manager'))
        <div class="form-group">
            <div class="input-group">
                <span class="input-group">Make Featured</span>
                <input type="checkbox" @if(isset($video->featured) && $video->featured==1)checked="checked"@endif value="1" name="featured" id="featured" />
            </div>
        </div>
        @endif
    </div>
</div>
