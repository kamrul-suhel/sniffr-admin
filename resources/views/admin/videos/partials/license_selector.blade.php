<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Rights Management</div>
        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>
    <div class="panel-body">
        <label for="rights">Select if the video is exclusive or non-exclusive</label>

        <select name="rights" class="selectpicker form-control">
            <option value="">License</option>
            <option value="ex"{{ $video->rights == 'ex' ? ' selected="selected"' : '' }}>Ex Submission</option>
            <option value="exc"{{ $video->rights == 'exc' ? ' selected="selected"' : '' }}>Ex Chaser</option>
            <option value="excc"{{ $video->rights == 'excc' ? ' selected="selected"' : '' }}>Ex Chaser Channel</option>
            <option value="nonex"{{ $video->rights == 'nonex' ? ' selected="selected"' : '' }}>Non Ex Submission</option>
            <option value="nonexc"{{ $video->rights == 'nonexc' ? ' selected="selected"' : '' }}>Non Ex Chaser</option>
        </select>
    </div>
</div>