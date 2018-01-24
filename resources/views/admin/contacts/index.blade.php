@extends('admin.master')

@section('content')
	<div class="admin-section-title">
		<div class="row">
			<div class="col-md-8">
				<h3><i class="fa fa-address-book"></i> Contacts</h3><a href="{{ url('admin/contacts/create') }}" class="btn btn-success"><i class="fa fa-plus-circle"></i> Add New</a>
			</div>
			<div class="col-md-4">
				<form method="get" role="form" class="search-form-full"> <div class="form-group"> <input type="text" class="form-control" name="s" id="search-input" placeholder="Search..." value="{{ Request::get('s') }}"> <i class="fa fa-search"></i> </div> </form>
			</div>
		</div>
	</div>
	<div class="clear"></div>


	<table class="table table-striped pages-table">
		<tr class="table-header">
			<th>Videos</th>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Email</th>
			<th>Actions</th>
			@foreach($contacts as $contact)
			<tr>
				<td>{{ count($contact->videos) }}</td>
				<td>{{ TextHelper::shorten($contact->full_name, 250) }}</td>
				<td>{{ TextHelper::shorten($contact->email, 250) }}</td>
				<td>
					<p>
						<a href="{{ url('admin/contacts/edit') . '/' . $contact->id }}" class="btn btn-xs btn-info"><span class="fa fa-edit"></span> Edit</a>
						<a href="{{ url('admin/contacts/delete') . '/' . $contact->id }}" class="btn btn-xs btn-danger delete"><span class="fa fa-trash"></span> Delete</a>
					</p>
				</td>
			</tr>
			@endforeach
	</table>

	<div class="clear"></div>

	<div class="text-center"><?= $contacts->render(); ?></div>

	<script>

		$ = jQuery;
		$(document).ready(function(){
			$('.delete').click(function(e){
				e.preventDefault();
				if (confirm("Are you sure you want to delete this contact?")) {
			       window.location = $(this).attr('href');
			    }
			    return false;
			});
		});

	</script>


@stop
