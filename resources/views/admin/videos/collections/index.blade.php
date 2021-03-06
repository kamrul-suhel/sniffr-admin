@extends('admin.master')

@section('content')

	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-md-12">
				<h3><i class="fa fa-youtube-play"></i> Video Collections <a href="javascript:;" onclick="jQuery('#add-new').modal('show');" class="btn btn-success pull-right"><i class="fa fa-plus-circle"></i> Add New</a></h3>
			</div>
		</div>
	</div>

	<!-- Add New Modal -->
	<div class="modal fade" id="add-new">
		<div class="modal-dialog">
			<div class="modal-content">
				
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">New Video Collection</h4>
				</div>
				
				<div class="modal-body">
					<form id="new-cat-form" accept-charset="UTF-8" action="{{ url('admin/videos/collections/store') }}" method="post">
				        <label for="name">Enter the new collection name below</label>

				        <input name="name" id="name" placeholder="Collection Name" class="form-control" value="" /><br />
				        <input type="hidden" name="_token" value="<?= csrf_token() ?>" />
				    </form>
				</div>
				
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-info" id="submit-new-cat">Save changes</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Add New Modal -->
	<div class="modal fade" id="update-collection">
		<div class="modal-dialog">
			<div class="modal-content">
				
			</div>
		</div>
	</div>

	<div class="clear"></div>
		
		
		<div class="panel panel-primary collection-panel" data-collapsed="0">
					
			<div class="panel-heading">
				<div class="panel-title">
					Organize the Collections below: (max of 3 levels)
				</div>
				
				<div class="panel-options">
					<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
				</div>
			</div>
			
			
			<div class="panel-body">
		
				<div id="nestable" class="nested-list dd with-margins">

					<ol class="dd-list">

					<?php $previous_cat = array(); ?>
					<?php $first_parent_id = 0; ?>
					<?php $second_parent_id = 0; ?>
					<?php $depth = 0; ?>
					@foreach($video_collections as $collection)

						@if( (isset($previous_cat->id) && $collection->parent_id == $previous_cat->parent_id) || $collection->parent_id == NULL )
							</li>
						@endif

						@if( (isset($previous_cat->parent_id) && $previous_cat->parent_id !== $collection->parent_id) && $previous_cat->id != $collection->parent_id )
							@if($depth == 2)
								</li></ol>
								<?php $depth -= 1; ?>
							@endif
							@if($depth == 1 && $collection->parent_id == $first_parent_id)
								</li></ol>
								<?php $depth -= 1; ?>
							@endif
							
						@endif

						@if(isset($previous_cat->id) && $collection->parent_id == $previous_cat->id && $collection->parent_id !== $previous_cat->parent_id )
							<?php if($first_parent_id != 0):
								$first_parent_id = $collection->parent_id;
							else:
								$second_parent_id = $collection->parent_id;
							endif; ?>
							<ol class="dd-list">
							<?php $depth += 1; ?>
						@endif


						<li class="dd-item" data-id="{{ $collection->id }}">
							<div class="dd-handle">{{ $collection->name}}<span class="slug">videos/collections/{{ $collection->slug }}</span></div>
							<div class="actions"><a href="/admin/videos/collections/edit/{{ $collection->id }}" class="edit">Edit</a> <a href="/admin/videos/collections/delete/{{ $collection->id }}" class="delete">Delete</a></div>

						<?php $previous_cat = $collection; ?>

					@endforeach
						
						

					</ol>
						
				</div>
		
			</div>
		
		</div>

	<input type="hidden" id="_token" name="_token" value="<?= csrf_token() ?>" />


	@section('javascript')

		<script src="{{ '/application/assets/admin/js/jquery.nestable.js' }}"></script>

		<script type="text/javascript">

		jQuery(document).ready(function($){


			$('#nestable').nestable({ maxDepth: 3 });

			// Add New collection
			$('#submit-new-cat').click(function(){
				$('#new-cat-form').submit();
			});

			$('.actions .edit').click(function(e){
				$('#update-collection').modal('show', {backdrop: 'static'});
				e.preventDefault();
				href = $(this).attr('href');
				$.ajax({
					url: href,
					success: function(response)
					{
						$('#update-collection .modal-content').html(response);
					}
				});
			});

			$('.actions .delete').click(function(e){
				e.preventDefault();
				if (confirm("Are you sure you want to delete this collection?")) {
			       window.location = $(this).attr('href');
			    }
			    return false;
			});

			$('.dd').on('change', function(e) {
    			$('.collection-panel').addClass('reloading');
    			$.post('/admin/videos/collections/order', { order : JSON.stringify($('.dd').nestable('serialize')), _token : $('#_token').val()  }, function(data){
    				console.log(data);
    				$('.collection-panel').removeClass('reloading');
    			});

			});


		});
		</script>

	@stop

@stop