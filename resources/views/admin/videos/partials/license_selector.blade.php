<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Rights Management</div>
        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>
    <div class="panel-body">
        <label for="rights">Select if the video is exclusive or non-exclusive</label>
        <select id="rights" name="rights">
            <option value="ex" {{ (($video) && ($video->rights == 'ex')) ? 'selected' : '' }}>
                Exclusive
            </option>
            <option value="nonex" {{ (($video) && ($video->rights == 'nonex')) ? 'selected' : '' }}>
                Non-Exclusive
            </option>
        </select>
    </div>
</div>