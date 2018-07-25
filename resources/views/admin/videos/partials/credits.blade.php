<div class="row">
    <div class="col-md-6">
        <div class="form-group input-group">
            <span class="input-group-addon">Credit</span>
            <textarea class="form-control" name="credit" id="credit" rows="4" title="">{{
                $asset->credit or old('credit')
                }}</textarea>
        </div>
    </div>
</div>
