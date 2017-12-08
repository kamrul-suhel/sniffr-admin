<?php include('includes/header.php'); ?>

<div class="container user">

	<?php if(isset($type) && $type == 'profile'): ?>

		<div id="user-badge">
			<div class="row">
				<div class="col-md-2">
					<div class="user-img-area">
						<img src="<?= Config::get('site.uploads_url') . 'avatars/' . $user->avatar ?>" />
					</div>
				</div>
				<div class="col-md-7">
					<div class="user-text-area">
						<h2 class="form-signin-heading"><?= $user->username ?></h2>
						<div class="label label-info"><?= ucfirst($user->role) ?> User</div>
						<p class="member-since">Member since: <?= $user->created_at ?></p>

						<?php if(!Auth::guest() && Auth::user()->username == $user->username): ?>
							<a href="<?= ($settings->enable_https) ? secure_url('user') : URL::to('user') ?><?= '/' . $user->username . '/edit' ?>" class="btn btn-info"><i class="fa fa-edit"></i> Edit</a>
						<?php endif; ?>
					</div>
				</div>
				<div class="col-md-3">
					<div class="user-favorite-area">
						<h2><?= ucfirst($user->username) ?>'s Favorites </h2>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<?php include('partials/video-loop.php'); ?>
			<div class="clear"></div>
			<!-- <a class="user-favorites" href="/favorites">View All Favorites</a> -->
		</div>


	<?php elseif(isset($type) && $type == 'edit'): ?>

		<h4 class="subheadline"><i class="fa fa-edit"></i> Update Your Profile Info</h4>
		<div class="clear"></div>

		<form method="POST" action="<?= $post_route ?>" id="update_profile_form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">

			<div id="user-badge">
				<img src="<?= Config::get('site.uploads_url') . 'avatars/' . $user->avatar ?>" />
				<label for="avatar">Avatar</label>
				<input type="file" multiple="true" class="form-control" name="avatar" id="avatar" />
			</div>

			<div class="well">
				<?php if($errors->first('username')): ?><div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> <strong>Oh snap!</strong> <?= $errors->first('username'); ?></div><?php endif; ?>
				<label for="username">Username</label>
				<input type="text" class="form-control" name="username" id="username" value="<?php if(!empty($user->username)): ?><?= $user->username ?><?php endif; ?>" />
			</div>

			<div class="well">
				<?php if($errors->first('email')): ?><div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> <strong>Oh snap!</strong> <?= $errors->first('email'); ?></div><?php endif; ?>
				<label for="email">Email</label>
				<input type="text" class="form-control" name="email" id="email" value="<?php if(!empty($user->email)): ?><?= $user->email ?><?php endif; ?>" />
			</div>

			<div class="well">
				<label for="password">Password (leave empty to keep your original password)</label>
				<input type="password" class="form-control" name="password" id="password" value="" />
			</div>

			<input type="hidden" name="_token" value="<?= csrf_token() ?>" />
			<input type="submit" value="Update Profile" class="btn btn-primary" />

			<div class="clear"></div>
		</form>

	<?php elseif(isset($type) && $type == 'billing'): ?>

		<?php include('partials/user-billing.php'); ?>

	<?php elseif(isset($type) && $type == 'update_credit_card'): ?>

		<?php include('partials/user-update-billing.php'); ?>

	<?php elseif(isset($type) && $type == 'renew_subscription'): ?>

		<?php include('partials/renew-subscription.php'); ?>

	<?php elseif(isset($type) && $type == 'upgrade_subscription'): ?>

		<?php include('partials/upgrade-subscription.php'); ?>

	<?php endif; ?>
</div>

<?php include('includes/footer.php'); ?>
