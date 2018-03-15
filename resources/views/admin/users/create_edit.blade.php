@extends('admin.master')

@section('content')

<div id="admin-container">
<!-- This is where -->

	<div class="admin-section-title">
	@if(!empty($user->id))
		<h3><i class="fa fa-users"></i> {{ $user->username }}</h3>

		<a href="{{ url('user') . '/' . $user->username }}" target="_blank" class="btn btn-info">
			<i class="fa fa-eye"></i> Preview <i class="fa fa-external-link"></i>
		</a>
	@else
		<h3><i class="fa fa-users"></i> Add New User</h3>
	@endif
	</div>

	<div class="clear"></div>

	<form method="POST" action="<?= $post_route ?>" id="update_profile_form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
		<div id="user-badge">
			@if(isset($user->avatar))<?php $avatar = $user->avatar; ?>@else<?php $avatar = 'default.jpg'; ?>@endif
			<img src="<?= Config::get('site.uploads_url') . 'avatars/' . $avatar ?>" />
			<label for="avatar">@if(isset($user->username))<?= ucfirst($user->username). '\'s'; ?>@endif Profile Image</label>
			<input type="file" multiple="true" class="form-control" name="avatar" id="avatar" />
		</div>

		<div class="panel panel-primary" data-collapsed="0">
			<div class="panel-heading">
				<div class="panel-title">Username</div>

				<div class="panel-options">
					<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
				</div>
			</div>

			<div class="panel-body" style="display: block;">
				<?php if($errors->first('username')): ?>
				<div class="alert alert-danger">
					<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> <strong>Oh snap!</strong>
					<?= $errors->first('username'); ?>
				</div>

				<?php endif; ?>
				<p>User's Username</p>
				<input type="text" class="form-control" name="username" id="username" autocomplete="off" value="<?php if(!empty($user->username)): ?><?= $user->username ?><?php endif; ?>" />
			</div>
		</div>

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
					<strong>Oh snap!</strong> <?= $errors->first('email'); ?></div>
				@endif

				<p>User's Email Address</p>
				<input type="text" class="form-control" name="email" id="email" autocomplete="off" value="{{ isset($user->email) ? $user->email : old('email') }}" />
			</div>
		</div>

		<div class="panel panel-primary" data-collapsed="0">
			<div class="panel-heading">
				<div class="panel-title">Password</div>
				<div class="panel-options">
					<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
				</div>
			</div>

			<div class="panel-body" style="display: block;">
				@if(isset($user->password))
					<p>(leave empty to keep your original password)</p>
				@else
					<p>Enter users password:</p>
				@endif
				<input type="password" class="form-control" name="password" id="password" autocomplete="off" value="" />
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
							<option value="manager"{{ isset($user) && $user->role == 'manager' ? ' selected' : '' }}>Manager</option>
							<option value="admin"{{ isset($user) && $user->role == 'admin' ? ' selected' : '' }}>Admin</option>
							<option value="client"{{ isset($user) && $user->role == 'client' ? ' selected' : '' }}>Client</option>
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
						<p>Select user client</p>
						<select id="client_id" name="client_id">
							@if(isset($clients))
								<option value="">Please Select</option>
								@foreach($clients as $client)
								<option value="{{ $client->id }}"{{ isset($user) && ($client->id == $user->client_id) ? ' selected' : '' }}>{{ $client->name }}</option>
								@endforeach
							@endif
						</select>
					</div>
				</div>
			</div>

			<div class="col-sm-4">
				<div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
					<div class="panel-title">User Active Status</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div></div>
					<div class="panel-body" style="display: block;">
						<label>User Active Status </label>
						<input type="checkbox" id="active" name="active" @if(isset($user->active) && $user->active == 1)checked="checked" value="1" @else value="0" @endif />
					</div>
				</div>
			</div>
		</div><!-- row -->

		@if(isset($user->id))
			<input type="hidden" id="id" name="id" value="{{ $user->id }}" />
		@endif

		<input type="hidden" name="_token" value="<?= csrf_token() ?>" />
		<input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right" />

		<div class="clear"></div>
	</form>
</div>

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
@stop

@stop
