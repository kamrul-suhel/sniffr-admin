@extends('admin.master')

@section('content')
<div id="admin-container">
	<div class="admin-section-title">
		<h3><i class="fa fa-upload"></i> CSV Upload</h3>
	</div>

	<div class="clear"></div>

    <form method="POST" action="{{ $post_route }}" id="upload-form" name="upload-form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
		<div class="row">
			<div class="col-md-6">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">CSV File</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<label for="csv">Select a csv file (title, link, category):</label>
						<input type="file" class="form-control" name="csv" id="csv" accept="text/csv" placeholder="CSV File" />
					</div>
				</div>
			</div>
		</div>

		<input type="hidden" name="_token" value="<?= csrf_token() ?>" />
		<input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right" />
	</form>

	<div class="clear"></div>
</div>

@section('javascript')
	<script type="text/javascript">
		(function($){
			 //js form validations >> Admin Create edit
	 		$('#upload-form').validate({
	 			rules: {
	 				csv: {
	         			required: true,
	         			extension: "csv"
	         		},
	 			},
				errorPlacement: function (error, element) {
					error.insertAfter(element);
				}
	 		});
		})(jQuery);
	</script>
@stop
@include ('partials.videojs')

@stop
