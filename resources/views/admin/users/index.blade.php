@extends('admin.master')

@section('content')
	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-md-8">
				<h3>
					<i class="fa fa-user-circle"></i>
					Users
					<a href="{{ route('users.create') }}" class="btn btn-success pull-right">
						<i class="fa fa-plus-circle"></i>
						Add New
					</a>
				</h3>
			</div>
			<div class="col-md-4">
				<form method="get" role="form" class="search-form-full">
					<div class="form-group">
						<input type="text" class="form-control" name="s" id="search-input" value="{{ old('s') }}" placeholder="Search...">
						<i class="fa fa-search"></i>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="clear"></div>

	<table class="table table-striped">
		<tr class="table-header">
			<th>Username</th>
			<th>Email</th>
			<th>User Type</th>
			<th>Active</th>
			<th>Actions</th>
			@foreach($users as $user)
				<tr>
					<td>
						{{ (strlen($user->username) > 40) ? substr($user->username, 0, 40) . '...' : $user->username }}
					</td>
					<td>{{ $user->email }}</td>
					<td>
						@if($user->role == 'client')
							<div class="label label-success"><i class="fa fa-users"></i>
								Client
							</div>
						@elseif($user->role == 'manager')
							<div class="label label-info"><i class="fa fa-envelope"></i>
								Manager
							</div>
						@elseif($user->role == 'editorial')
							<div class="label label-info"><i class="fa fa-pencil"></i>
								Editorial
							</div>
						@elseif($user->role == 'admin')
							<div class="label label-primary"><i class="fa fa-star"></i>
								Admin
							</div>
						@endif
					</td>
					<td>
						{{ $user->active }}
					</td>
					<td>
						<a href="{{ route('users.edit', ['id' => $user->id]) }}" class="btn btn-xs btn-info">
							<span class="fa fa-edit"></span>
							Edit
						</a>
						<a href="{{ url('user.delete', ['id' => $user->id]) }}" class="btn btn-xs btn-danger delete">
							<span class="fa fa-trash"></span>
							Delete
						</a>
						@if($user->client_id)
							<a href="{{ route('users.stories.sent', ['id' => $user->id]) }}" class="btn btn-xs btn-info">
								<span class="fa fa-edit"></span>
								Stories Sent
							</a>
						@endif
					</td>
				</tr>
			@endforeach
	</table>
@endsection

@section('javascript')
		<script>
			$ = jQuery;
			$(document).ready(function(){
				$('.delete').click(function(e){
					e.preventDefault();
					if (confirm("Are you sure you want to delete this user?")) {
					   window.location = $(this).attr('href');
					}
					return false;
				});
			});
		</script>
@endsection
