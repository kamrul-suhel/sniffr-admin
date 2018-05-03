<div class="row">

    <div class="col-sm-3">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">Filmed Date</div>

                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>

            <div class="panel-body" style="display: block;">
                <p>Select Date/Time Below</p>
                <input type="date" class="form-control" name="date_filmed" id="date_filmed" placeholder=""
                       value="{{ ($video) ? $video->date_filmed : '' }}"/>
            </div>
        </div>
    </div>

    <div class="col-sm-3">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">Uploaded Date</div>

                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>

            <div class="panel-body" style="display: block;">
                <p>Select Date/Time Below</p>
                <input type="text" class="form-control" name="created_at" id="created_at" disabled
                       value="{{ ($video) ? ($video->created_at)->format('d/m/Y') : '' }}"/>
            </div>
        </div>
    </div>
</div>