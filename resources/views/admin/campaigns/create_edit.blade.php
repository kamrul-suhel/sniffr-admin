@extends('admin.master')

@section('css')
	<link rel="stylesheet" href="{{ '/application/assets/js/tagsinput/jquery.tagsinput.css' }}" />
@stop


@section('content')

<div id="admin-container">
<!-- This is where -->

	<ol class="breadcrumb">
		<li><a href="/admin/campaigns"><i class="fa fa-newspaper-o"></i>All Campaigns</a></li>
		<li class="active"><strong><{{ !empty($campaign->id) ? $campaign->name : 'New Campaign' }}</strong></li>
	</ol>

	<div class="admin-section-title">
	@if(!empty($campaign->id))
		<h3>{{ $campaign->name }}</h3>
	@else
		<h3><i class="fa fa-plus"></i> Add New Campaign</h3>
	@endif
	</div>
	<div class="clear"></div>

		<form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">

			<div class="row">

				<div class="@if(!empty($campaign->created_at)) col-sm-6 @else col-sm-8 @endif">

					<div class="panel panel-primary" data-collapsed="0">
						<div class="panel-heading">
							<div class="panel-title">Campaign Name</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div></div>
						<div class="panel-body" style="display: block;">
							<p>Add the campaign name in the textbox below:</p>
							<input type="text" class="form-control" name="name" id="name" placeholder="Campaign Name" value="@if(!empty($campaign->name)){{ $campaign->name }}@endif" />
						</div>
					</div>

				</div>

				<div class="@if(!empty($campaign->created_at)) col-sm-3 @else col-sm-4 @endif">
					<div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
						<div class="panel-title">Slug</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div></div>
						<div class="panel-body" style="display: block;">
							<p>(example. slug-name)</p>
							<input type="text" class="form-control" name="slug" id="slug" placeholder="slug-name" value="@if(!empty($campaign->slug)){{ $campaign->slug }}@endif" />
						</div>
					</div>
				</div>

				@if(!empty($campaign->created_at))
				<div class="col-sm-3">
					<div class="panel panel-primary" data-collapsed="0">

						<div class="panel-heading">
							<div class="panel-title">Created Date</div>
							<div class="panel-options">
								<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
							</div>
						</div>

						<div class="panel-body" style="display: block;">
							<p>Select Date/Time Below</p>
							<input type="text" class="form-control" name="created_at" id="created_at" placeholder="" value="@if(!empty($campaign->created_at)){{ $campaign->created_at }}@endif" />
						</div>

					</div>
				</div>
				@endif

				<div class="col-sm-3">
					<div class="panel panel-primary" data-collapsed="0">
						<div class="panel-heading">
							<div class="panel-title">Client Name</div>
							
							<div class="panel-options">
								<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
							</div>
						</div>

						<div class="panel-body" style="display: block;">
							<select name="client_id" id="client_id" class="form-control">
								<option value="">Please select</option>
								@foreach($clients as $client)
									<option value="{{ $client->id }}"{{ isset($campaign) && $campaign->client_id == $client->id ? " selected" : "" }}>{{ $client->name }}</option>
								@endforeach
							</select>
						</div>
					</div>
				</div>
			</div>

			@if(isset($campaign->id))
				<input type="hidden" id="id" name="id" value="{{ $campaign->id }}" />
			@endif

			<input type="hidden" name="_token" value="<?= csrf_token() ?>" />
			<input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right" />

		</form>

		<div class="clear"></div>
<!-- This is where now -->
</div>




	@section('javascript')


	<script type="text/javascript" src="{{ '/application/assets/admin/js/tinymce/tinymce.min.js' }}"></script>
	<script type="text/javascript" src="{{ '/application/assets/js/jquery.mask.min.js' }}"></script>

	<script type="text/javascript">

	$ = jQuery;

	$(document).ready(function(){

		function slugify(text) {
		  return text.toString().toLowerCase()
		    .replace(/\s+/g, '-')           // Replace spaces with -
		    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
		    .replace(/^-+/, '')             // Trim - from start of text
		    .replace(/-+$/, '');            // Trim - from end of text
		}

		$('#name').on('input', function() {
		    $('#slug').val(slugify($('#name').val()));
		});

		$('#duration').mask('00:00:00');

		$('input[type="checkbox"]').change(function() {
			if($(this).is(":checked")) {
		    	$(this).val(1);
		    } else {
		    	$(this).val(0);
		    }
		    console.log('test ' + $(this).is( ':checked' ));
		});

		tinymce.init({
			relative_urls: false,
		    selector: '#body',
		    toolbar: "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview media | forecolor backcolor | code",
		    plugins: [
		         "advlist autolink link image code lists charmap print preview hr anchor pagebreak spellchecker code fullscreen",
		         "save table contextmenu directionality emoticons template paste textcolor code"
		   ],
		   menubar:false,
		 });

	});



	</script>

	@stop

@stop
