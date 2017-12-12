<?php include('includes/header.php'); ?>

	<?php if($type == 'login'): ?>

		<h2 class="form-signin-heading">Please Login</h2>
		<form method="post" action="<?= ($settings->enable_https) ? secure_url('login') : route('login') ?>" class="form-signin">
		    <input type="text" class="form-control" placeholder="Email address or Username" tabindex="0" id="email" name="email" value="">
		    <input type="password" class="form-control" placeholder="Password" id="password" name="password" value="">
		    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
		    <br />
		    <input type="hidden" id="redirect" name="redirect" value="" />
			<input type="hidden" name="_token" value="<?= csrf_token() ?>" />
		</form>

	<?php elseif($type == 'signup'): ?>

		<?php include('partials/signup.php'); ?>

	<!-- SHOW FORGOT PASSWORD FORM -->
	<?php elseif($type == 'forgot_password'): ?>

		<?php include('partials/form-forgot-password.php'); ?>

	<!-- SHOW RESET PASSWORD FORM -->
	<?php elseif($type == 'reset_password'): ?>

		<?php include('partials/form-reset-password.php'); ?>

	<?php endif; ?>

<?php include('includes/footer.php'); ?>