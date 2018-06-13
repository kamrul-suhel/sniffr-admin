@extends('admin.master')

@section('content')

<div id="admin-container">
	<div class="admin-section-title">
		@if($user)
			<h3>
				<i class="fa fa-users"></i> {{ $user->username }}
			</h3>
		@else
			<h3><i class="fa fa-users"></i> Add New User</h3>
		@endif
	</div>

	@include('admin.users.partials.errors')

	<div class="clear"></div>
	<?php
	if (Auth::user()->role == 'client') {
		$update_path = 'client.users.update';
		$store_path = 'client.users.store';
	} else {
		$update_path = 'users.update';
		$store_path = 'users.store';
	}
	?>

	<form method="POST" action="{{ ($user) ? route($update_path, ['id' => $user->id]) : route($store_path) }}" id="update_profile_form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
		<div id="user-badge">
			<img src="{{ Config::get('site.uploads_url') }}{{ ($user && $user->avatar) ? $user->avatar : 'default.jpg' }}" />
			<label for="avatar">{{ ($user) ? ucfirst($user->username) . '\'s' : '' }} Profile Image</label>
			<input type="file" multiple="true" class="form-control" name="avatar" id="avatar" />
		</div>

		<div class="row">

			<div class="col-sm-4">

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">
							Username
						</div>
						<div class="panel-options">
							<a href="#" data-rel="collapse">
								<i class="fa fa-angle-down"></i>
							</a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						@if($errors->first('username'))
							<div class="alert alert-danger">
								<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
								{{ $errors->first('username') }}
							</div>
						@endif
						<p>User's Username</p>
						<input type="text" class="form-control" name="username" id="username" autocomplete="off" value="{{
						($user) ? $user->username : old('username')
						}}" />
					</div>
				</div>

			</div>

			<div class="col-sm-4">

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">
							Full Name
						</div>
						<div class="panel-options">
							<a href="#" data-rel="collapse">
								<i class="fa fa-angle-down"></i>
							</a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						@if($errors->first('full_name'))
							<div class="alert alert-danger">
								<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
								{{ $errors->first('full_name') }}
							</div>
						@endif
						<p>User's Full Name</p>
						<input type="text" class="form-control" name="full_name" id="full_name" autocomplete="off" value="{{
						($user) ? $user->full_name : old('full_name')
						}}" />
					</div>
				</div>

			</div>

			<div class="col-sm-4">

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">
							Job Title
						</div>
						<div class="panel-options">
							<a href="#" data-rel="collapse">
								<i class="fa fa-angle-down"></i>
							</a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						@if($errors->first('job_title'))
							<div class="alert alert-danger">
								<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
								{{ $errors->first('job_title') }}
							</div>
						@endif
						<p>User's Job Title</p>
						<input type="text" class="form-control" name="job_title" id="job_title" autocomplete="off" value="{{
						($user) ? $user->job_title : old('job_title')
						}}" />
					</div>
				</div>

			</div>

		</div>

		<div class="row">

			<div class="col-sm-4">

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Email</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						@if($errors->first('email'))
							<div class="alert alert-danger">
								<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
								{{ $errors->first('email') }}
							</div>
						@endif

						<p>User's Email Address</p>
						<input type="text" class="form-control" name="email" id="email" autocomplete="off" value="{{
						($user) ? $user->email : old('email')
						}}" readonly onfocus="this.removeAttribute('readonly');"/>
					</div>
				</div>

			</div>

			<div class="col-sm-4">

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">
							Phone Number
						</div>
						<div class="panel-options">
							<a href="#" data-rel="collapse">
								<i class="fa fa-angle-down"></i>
							</a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						@if($errors->first('tel'))
							<div class="alert alert-danger">
								<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
								{{ $errors->first('tel') }}
							</div>
						@endif
						<p>User's Phone Number</p>
						<input type="text" class="form-control" name="tel" id="tel" autocomplete="off" value="{{
						($user) ? $user->tel : old('tel')
						}}" />
					</div>
				</div>

			</div>

		</div>

		@if(Auth::user()->role != 'client')
			<div class="row">
				<div class="col-sm-4">
					<div class="panel panel-primary" data-collapsed="0">
						<div class="panel-heading">
							<div class="panel-title">Password</div>
							<div class="panel-options">
								<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
							</div>
						</div>

						<div class="panel-body" style="display: block;">
							@if($errors->first('password'))
								<div class="alert alert-danger">
									<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
									{{ $errors->first('password') }}
								</div>
							@endif

							<p>
								{{ ($user) ? '(leave empty to keep your original password)' : 'Enter users password:' }}
							</p>
							<input type="password" class="form-control" name="password" id="password" autocomplete="off" value=""
								   readonly onfocus="this.removeAttribute('readonly');"  title="password"/>
						</div>
					</div>
				</div>

				<div class="col-sm-4">
					<div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
						<div class="panel-title">Active</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div></div>
						<div class="panel-body" style="display: block;">
							<label>Active</label>
							<input type="checkbox" id="active" name="active" {{ ((($user) && ($user->active)) || (!$user)) ? 'checked="checked" value=1' : '' }} />
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-4">
					<div class="panel panel-primary" data-collapsed="0">
						<div class="panel-heading">
							<div class="panel-title">User Role</div>

							<div class="panel-options">
								<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
							</div>
						</div>

						<div class="panel-body" style="display: block;">
							<p>Select the user's role below</p>
							<select id="role" name="role">
								<option value="editorial"{{ ((($user) && ($user->role == 'editorial')) || (old('role') == 'editorial')) ? ' selected' : '' }}>
									Editorial
								</option>
								<option value="manager"{{ ((($user) && ($user->role == 'manager')) || (old('role') == 'manager')) ? ' selected' : '' }}>
									Manager
								</option>
								<option value="admin"{{ ((($user) && ($user->role == 'admin')) || (old('role') == 'admin')) ? ' selected' : '' }}>
									Admin
								</option>
								<option value="client"{{ ((($user) && ($user->role == 'client')) || (old('role') == 'client')) ? ' selected' : '' }}>
									Client
								</option>
								<option value="client_admin"{{ ((($user) && ($user->role == 'client_admin')) || (old('role') == 'client_admin')) ? ' selected' : '' }}>
									Client Admin
								</option>
							</select>
						</div>
					</div>
				</div>

				<div class="col-sm-4" id="client-box">

					<div class="panel panel-primary" data-collapsed="0">
						<div class="panel-heading">
							<div class="panel-title">Client</div>

							<div class="panel-options">
								<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
							</div>
						</div>

						<div class="panel-body" style="display: block;">
							@if($errors->first('client_id'))
								<div class="alert alert-danger">
									<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
									{{ $errors->first('client_id') }}
								</div>
							@endif
							<p>Select user client</p>
							<select id="client_id" name="client_id">
								@if(isset($clients))
									<option value="">Please Select</option>
									@foreach($clients as $client)
									<option value="{{ $client->id }}" {{
									(($user) && ($client->id == $user->client_id) || (($client->id == old('client_id')))) ? 'selected' : ''
									}}>{{ $client->name }}</option>
									@endforeach
								@endif
							</select>
						</div>
					</div>
				</div>
			</div>
		@endif

		@if($user)
			<input type="hidden" id="id" name="id" value="{{ $user->id }}" />
		@endif

		<input type="hidden" name="_token" value="{{ csrf_token() }}" />
        {{ ($user) ? method_field('PUT') : method_field('POST') }}
		<input type="submit" value="{{ ($user) ? 'Update' : 'Create' }} User" class="btn btn-success pull-right" />
	</form>

	@if($user)
		{!! Form::open(['method' => 'DELETE', 'route' => ['users.destroy', $user->id], 'id' => 'form-delete-users-' . $user->id]) !!}
		<button class="btn btn-danger delete" data-form="users-{{ $user->id }}">
			<i class="fa fa-trash-o"></i>
			Delete
		</button>
		{!! Form::close() !!}
	@endif
	@if(isset($user->id))
		{!! Form::open(['method' => 'DELETE', 'route' => ['users.destroy', $user->id], 'id' => 'form-delete-users-' . $user->id]) !!}
	    <a href="" class="btn btn-danger delete" data-form="users-{{ $user->id }}">
	        <i class="fa fa-trash-o"></i>
	        Delete
	    </a>
	    {!! Form::close() !!}
	@endif
</div>
@endsection
@section('javascript')
	<script type="text/javascript">
		$ = jQuery;

		$(document).ready(function(){
			$('#role').change(function(){
				if($(this).val() == 'client'){
					$('#client-box').show();
				} else {
					$('#client-box').hide();
				}
			});

			if($('#role').val() != 'client'){
				$('#client-box').hide();
			}

			$('#active, #disabled').change(function() {
				if($(this).is(":checked")) {
			    	$(this).val(1);
			    } else {
			    	$(this).val(0);
			    }
			    console.log('test ' + $(this).is( ':checked' ));
			});
		});
	</script>
@endsection
