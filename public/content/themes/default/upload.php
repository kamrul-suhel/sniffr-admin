<?php include('includes/header.php'); ?>

<form method="POST" action="/upload" accept-charset="UTF-8" enctype="multipart/form-data">
	<?php echo csrf_field(); ?>

	<div class="container">

		<div class="row">

			<div class="col-md-6 page">

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">Your Contact Details</div>
		        <div class="panel-body">
							<?php if (count($errors)): ?>
									<div class="alert alert-danger">
											<ul>
													<?php foreach ($errors->all() as $error){
															echo '<li>'. $error .'</li>';
													} ?>
											</ul>
									</div>
									<div class="heading-divider"></div>
							<?php endif; ?>

							<div class="form-group">
									<label for="first_name">First Name <span>*</span></label>
									<input type="text" class="form-control" id="first_name" name="first_name" value="<?php echo old('first_name'); ?>">
							</div>

							<div class="form-group">
									<label for="last_name">Last Name <span>*</span></label>
									<input type="text" class="form-control" id="last_name" name="last_name" value="<?php echo old('last_name'); ?>">
							</div>

							<div class="form-group">
									<label for="tel">Email <span>*</span></label>
									<input type="email" class="form-control" id="email" name="email" value="<?php echo old('email'); ?>">
							</div>

						</div>
					</div>

				</div>

				<div class="col-md-6 page">

					<div class="panel panel-primary" data-collapsed="0">
						<div class="panel-heading">Your Video</div>
			      <div class="panel-body">

							<div class="form-group">
									<label for="title">Video Title <span>*</span></label>
									<input type="text" class="form-control" id="title" name="title" value="<?php echo old('title'); ?>">
							</div>

							<p>Please use the boxes below to send us either your video link<br /><strong>OR</strong> upload a video file (MOV, MP4, MPEG, etc) <span>*</span></p>

							<hr>

							<div class="row border-between">

								<div class="col-md-6">

									<div class="form-group">
											<label for="url">Video Url</label>
											<input type="text" class="form-control" id="url" name="url" value="<?php echo old('url'); ?>">
									</div>

								</div>

								<div class="col-md-6">

									<div class="form-group">
											<label for="file">Video File</label>
											<input type="file" id="file" name="file" value="<?php echo old('file'); ?>" />
									</div>

								</div>

							</div>

						</div>
				</div>

			</div>

		</div>

		<div class="row">

			<div class="col-md-12">

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-body">

						<div class="form-check">
								<label class="form-check-label" for="terms"><input id="terms" name="terms" type="checkbox" value="1">I agree to the <a href="">terms and conditions</a></label>
						</div>

						<hr />

						<input type="submit" value="Submit your video" class="btn btn-primary">

					</div>

			</div>

		</div>

	</div>

</form>

<hr>

<?php include('includes/footer.php'); ?>
