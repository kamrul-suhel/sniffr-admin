<div class="row">
    <div class="col-sm-4">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">Shot Type</div>
                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>
            <div class="panel-body" style="display: block;">
                <p>Select a Shot Type Below:</p>
                <select id="video_shottype_id" name="video_shottype_id">
                    <option value="0">Please Select</option>
                    @foreach($video_shottypes as $shottype)
                        <option value="{{ $shottype->id }}"
                                {{ (($video) && ($video->video_shottype_id == $shottype->id)) ? 'selected="selected"' : '' }}>
                            {{ $shottype->name }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>
</div>