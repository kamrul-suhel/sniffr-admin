<?php include('includes/header.php'); ?>

<form method="POST" action="/upload" name="upload-form" id="upload-form" accept-charset="UTF-8" enctype="multipart/form-data">
	<?php echo csrf_field(); ?>

	<div class="container">

		<?php if (count($errors)): ?>
		<div class="row">

			<div class="col-md-12 page">
				<div class="alert alert-danger">
						<p><strong>Please correct the errors below and click 'Submit Video' again.</strong></p>
						<ul>
								<?php foreach ($errors->all() as $error){
										echo '<li>'. $error .'</li>';
								} ?>
						</ul>
				</div>
			</div>

		</div>
		<?php endif; ?>

		<div class="row">

			<div class="col-md-6 page">

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">Your Contact Details</div>
		        <div class="panel-body">

							<div class="form-group">
									<label for="first_name">First Name <span>*</span></label>
									<input type="text" class="form-control" id="first_name" name="first_name" value="<?php echo old('first_name'); ?>" >
							</div>

							<div class="form-group">
									<label for="last_name">Last Name <span>*</span></label>
									<input type="text" class="form-control" id="last_name" name="last_name" value="<?php echo old('last_name'); ?>" >
							</div>

							<div class="form-group">
									<label for="tel">Email <span>*</span></label>
									<input type="email" class="form-control" id="email" name="email" value="<?php echo old('email'); ?>" >
							</div>

						</div>
					</div>

				</div>

				<div class="col-md-6 page">

					<div class="panel panel-primary" data-collapsed="0">
						<div class="panel-heading">Your Video Details</div>
			      <div class="panel-body">

							<div class="form-group">
									<label for="title">Video Title <span>*</span></label>
									<input type="text" class="form-control" id="title" name="title" value="<?php echo old('title'); ?>">
							</div>

							<p>Please use either send us your video link <strong>OR</strong> upload your video file below <span>*</span></p>

							<div class="row">

								<div class="col-md-6">

									<div class="form-group shaded" id="make-shaded-file">
										<div class="radio pull-right">
											<div class="circle-file circle-shaded"></div>
										</div>
										<label for="file">Video File</label>
										<input class="files" type="file" id="file" name="file" value="<?php echo old('file'); ?>" />
										<br />
									</div>

								</div>

								<div class="col-md-6">

									<div class="form-group unshaded" id="make-shaded-url">
										<div class="radio pull-right">
											<div class="circle-url circle-unshaded"></div>
										</div>
										<label for="url">Video Url</label>
										<input class="form-control files" type="text" id="url" name="url" value="<?php echo old('url'); ?>" placeholder="https://www.youtube.com/watch?v=q4cjNYGUaoA">
									</div>

								</div>

								<div class="col-md-12">
									<div id="video-error" style="display:none;">Either a video file or video url is required.</div>
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
