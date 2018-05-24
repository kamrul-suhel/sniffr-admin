<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Rights Management</div>
        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>
    <div class="panel-body">
        <label for="is_exclusive">Select if the video is exclusive or non-exclusive</label>
        <select id="is_exclusive" name="is_exclusive">
            <option value="1" {{ (($video) && ($video->is_exclusive)) ? 'selected' : '' }}>
                Exclusive
            </option>
            <option value="0" {{ (($video) && (!$video->is_exclusive)) ? 'selected' : '' }}>
                Non-Exclusive
            </option>
        </select>
    </div>
</div>