<div class="row">
    <div class="col-sm-4">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">Vertical</div>

                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>

            <div class="panel-body" style="display: block;">
                <label for="video_category_id">Select a Vertical Below:</label>
                <select id="video_category_id" name="video_category_id">
                    <option value="">
                        Please Select
                    </option>
                    @foreach($video_categories as $category)
                        <option value="{{ $category->id }}" {{ (($video) && ($video->video_category_id == $category->id)) ? 'selected="selected"' : '' }}>
                            {{ $category->name }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>
</div>