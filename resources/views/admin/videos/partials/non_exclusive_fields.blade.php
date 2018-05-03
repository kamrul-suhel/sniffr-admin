<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">
            Non Exclusive Information
        </div>
        <div class="panel-options">
            <a href="#" data-rel="collapse">
                <i class="fa fa-angle-down"></i>
            </a>
        </div>
    </div>
    <div class="panel-body" style="display: block;">
        <p>Notes for the video:</p>
        <textarea class="form-control" name="notes"
                  id="notes">{{ ($video->notes) ? $video->notes : '' }}</textarea>
    </div>

    <div class="panel-body" style="display: block;">
        <p>Credit link for the video:</p>
        <input class="form-control" name="credit" id="credit"
               value="{{ ($video->credit) ? $video->credit : '' }}"/>
    </div>

    <div class="panel-body" style="display: block;">
        <p>Referrer:</p>
        <input class="form-control" name="credit" id="credit" value="{{ ($video->referrer) ? $video->referrer : '' }}"/>
    </div>
</div>
