<div class="row">
	<div class="col-md-6">
		<div class="form-group input-group">
			<span class="input-group-addon">Notes</span>
			<textarea class="form-control" name="notes" id="notes" rows="4" title="notes">{{
				$video->notes or old('notes')
				}}</textarea>
		</div>
	</div>
</div>