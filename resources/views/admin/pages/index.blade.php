@extends('admin.master')

@section('content')

	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-md-12">
				<h3><i class="fa fa-book"></i> Page <a href="{{ url('admin/pages/create') }}" class="btn btn-success pull-right"><i class="fa fa-plus-circle"></i> Add New</a></h3>
			</div>
			<!--div class="col-md-4">	
				<form method="get" role="form" class="search-form-full"> <div class="form-group"> <input type="text" class="form-control" name="s" id="search-input" placeholder="Search..."> <i class="fa fa-search"></i> </div> </form>
			</div-->
		</div>
	</div>
	<div class="clear"></div>


	<table class="table table-striped pages-table">
		<tr class="table-header">
			<th>Page</th>
			<th>URL</th>
			<th>Active</th>
			<th>Actions</th>
			@foreach($pages as $page)
			<tr>
				<td>
					<a href="{{ url('page') . '/' . $page->slug }}" target="_blank">{{ TextHelper::shorten($page->title, 80) }}</span></a>
				</td>
				<td valign="bottom"><p>{{ $page->slug }}</p></td>
				<td><p>{{ $page->active }}</p></td>
				<td>
					<p>
						<a href="{{ url('admin/pages/edit') . '/' . $page->id }}" class="btn btn-xs btn-info"><span class="fa fa-edit"></span> Edit</a>
						<a href="{{ url('admin/pages/delete') . '/' . $page->id }}" class="btn btn-xs btn-danger delete"><span class="fa fa-trash"></span> Delete</a>
					</p>
				</td>
			</tr>
			@endforeach
	</table>

	<div class="clear"></div>

	<div class="text-center"><?= $pages->render(); ?></div>
@stop

