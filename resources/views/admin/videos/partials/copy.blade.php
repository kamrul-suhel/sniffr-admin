<div class="row">
    <div class="col-md-12">
        <div class="input-group">
            <span class="input-group-addon">Title</span>
            <input type="text" class="form-control" name="title" id="title" value="{{
            ($video) ? $video->title : ''
            }}" title="title" maxlength="200"/>
        </div>
    </div>

    <div class="col-md-12">
        <div class="input-group">
            <span class="input-group-addon">Description</span>
            <textarea class="form-control" name="description" id="description" rows="9" title="description">{{
                      $video->description or old('description')
          }}</textarea>
        </div>
    </div>
</div>