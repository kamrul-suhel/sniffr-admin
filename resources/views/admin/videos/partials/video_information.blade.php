<div class="row">
    <span class="col-md-6">
        <span class="input-group">
            <span class="input-group-addon">
                Filmed Date
            </span>
            <input type="date" class="form-control" name="date_filmed" id="date_filmed" disabled="disabled" value="{{
            ($video) ? $video->date_filmed : ''
            }}" title="date filmed"/>
        </span>
    </span>
</div>
<div class="row">
    <span class="col-md-6">
        <span class="input-group">
            <span class="input-group-addon">
                Uploaded Date
            </span>
            <input type="text" class="form-control" name="created_at" id="created_at" disabled="disabled" value="{{
            ($video) ? ($video->created_at)->format('d/m/Y') : ''
            }}"/>
        </span>
    </span>
</div>