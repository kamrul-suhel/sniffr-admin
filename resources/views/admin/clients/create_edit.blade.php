@extends('admin.master')

@section('css')
	<link rel="stylesheet" href="{{ '/application/assets/js/tagsinput/jquery.tagsinput.css' }}" />
@stop


@section('content')

<div id="admin-container">
<!-- This is where -->

	<ol class="breadcrumb"> <li> <a href="/admin/clients"><i class="fa fa-newspaper-o"></i>All Clients</a> </li> <li class="active">@if(!empty($client->id)) <strong>{{ $client->name }}</strong> @else <strong>New Client</strong> @endif</li> </ol>

	<div class="admin-section-title">
	@if(!empty($client->id))
		<h3>{{ $client->name }}</h3>
		<a href="{{ URL::to('client') . '/' . $client->slug }}" target="_blank" class="btn btn-info">
			<i class="fa fa-eye"></i> Preview <i class="fa fa-external-link"></i>
		</a>
	@else
		<h3><i class="entypo-plus"></i> Add New Client</h3>
	@endif
	</div>
	<div class="clear"></div>

		<form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">

			<div class="row">

				<div class="@if(!empty($client->created_at)) col-sm-6 @else col-sm-8 @endif">

					<div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
						<div class="panel-title">Client Name</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div></div>
						<div class="panel-body" style="display: block;">
							<p>Add the client name in the textbox below:</p>
							<input type="text" class="form-control" name="name" id="name" placeholder="Client Name" value="@if(!empty($client->name)){{ $client->name }}@endif" />
						</div>
					</div>

				</div>

				<div class="@if(!empty($client->created_at)) col-sm-3 @else col-sm-4 @endif">
					<div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
						<div class="panel-title">Slug</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div></div>
						<div class="panel-body" style="display: block;">
							<p>(example. /clients/slug-name)</p>
							<input type="text" class="form-control" name="slug" id="slug" placeholder="slug-name" value="@if(!empty($client->slug)){{ $client->slug }}@endif" />
						</div>
					</div>
				</div>

				@if(!empty($client->created_at))
					<div class="col-sm-3">
						<div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
							<div class="panel-title">Created Date</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div></div>
							<div class="panel-body" style="display: block;">
								<p>Select Date/Time Below</p>
								<input type="text" class="form-control" name="created_at" id="created_at" placeholder="" value="@if(!empty($client->created_at)){{ $client->created_at }}@endif" />
							</div>
						</div>
					</div>
				@endif

			</div>

			@if(isset($client->id))
				<input type="hidden" id="id" name="id" value="{{ $client->id }}" />
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
