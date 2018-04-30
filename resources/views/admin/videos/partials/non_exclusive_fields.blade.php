@if(($video) && ($video->rights == 'nonex'))
    <div class="row">
        <div class="col-md-4">
            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">
                        Notes {{ $video->referrer ? 'for '.$video->referrer : '' }}</div>
                    <div class="panel-options">
                        <a href="#" data-rel="collapse">
                            <i class="fa fa-angle-down"></i>
                        </a>
                    </div>
                </div>
                <div class="panel-body" style="display: block;">
                    <p>Notes for the video:</p>
                    <textarea class="form-control" name="notes"
                              id="notes">@if(!empty($video->notes)){{ htmlspecialchars($video->notes) }}@endif</textarea>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Credit Link</div>
                    <div class="panel-options"><a href="#" data-rel="collapse"><i
                                    class="fa fa-angle-down"></i></a></div>
                </div>
                <div class="panel-body" style="display: block;">
                    <p>Credit link for the video:</p>
                    <input class="form-control" name="credit" id="credit"
                           value="@if(!empty($video->credit)){{ htmlspecialchars($video->credit) }}@endif"/>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Referrer</div>
                    <div class="panel-options">
                        <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                    </div>
                </div>

                <div class="panel-body" style="display: block;">
                    <p>Referrer:</p>
                    <input class="form-control" name="credit" id="credit"
                           value="@if(!empty($video->referrer)){{ htmlspecialchars($video->referrer) }}@endif"/>
                </div>
            </div>
        </div>
    </div>
@endif
