<?php include('includes/header.php'); ?>

<div class="container">
	<div>
		<h1>Unsubscribe</h1>
		<?php if (isset($contact->id)) { ?>
			<p>Please review your email adddress below and click 'unsubscribe' to delete your details from our platform. <strong>Warning:</strong> This action cannot be undone and will be permanent.</p>
			<p><br /><?= $contact->email ?></p>
			<form method="post" action="/unsubscribe">
				<input type="hidden" name="key" value="<?= $key ?>">
				<?= csrf_field() ?>
				<input type="submit" name="submit" class="pull-left" value="Unsubscribe">
			</form>
		<?php } elseif($success==true) { ?>
			<p>Your details have been deleted from our platform.</p>
		<?php } else { ?>
			<p>Sorry, we cannot find the email associated with your account. Please contact <u>submissions@unilad.co.uk</u></p>
		<?php } ?>
	</div>
</div>

<?php include('includes/footer.php'); ?>
