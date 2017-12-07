<?php include('includes/header.php'); ?>

<form method="POST" action="/details/<?php echo Request::segment(2); ?>" accept-charset="UTF-8" enctype="multipart/form-data">
	<?php echo csrf_field(); ?>

	<div class="container">

		<?php if (count($errors)): ?>
		<div class="row">

			<div class="col-md-12 page">
				<div class="alert alert-danger">
						<p><strong>Please correct the errors below.</strong></p>
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

			<?php if(!$video): ?>

			<div class="col-md-12 page">

				<div class="panel panel-primary" data-collapsed="0">

					<div class="panel-heading">Sorry, we can't seem to find your video with the code you provided. Please contact <u>submissions@unilad.co.uk</u></div>

				</div>

			</div>

			<?php elseif(!$video->more_details): ?>

			<div class="col-md-6 page">

				<div class="panel panel-primary" data-collapsed="0">

					<div class="panel-heading">Your Video Details</div>

		            <div class="panel-body">

		                <div class="text-center">
		                    <h1><?php echo $video->title ?></h1>
		                    <div class="item-video">
		                        <?php if($key = $video->getKey()): ?>
		                        <iframe src="https://www.youtube.com/embed/<?php echo $key ?>" frameborder="0" allowfullscreen="1"></iframe>
		                        <?php elseif($source = $video->source): ?>
		                        <a href="<?php url('video/'.$video->id); ?>"><img src="<?php echo $video->thumb; ?>"></a>
		                        <?php endif; ?>
		                    </div>
		                </div>

	                    <div class="form-group">
	                        <label for="date_filmed">When was the video filmed?</label>
	                        <input type="date" class="form-control" id="date_filmed" name="date_filmed" value="<?php echo old('date_filmed'); ?>">
	                    </div>

	                    <div class="form-group">
	                        <label for="location">Where was the video filmed?</label>
	                        <input type="text" class="form-control" id="location" name="location" value="<?php echo old('location'); ?>">
	                    </div>

	                    <div class="form-group">
	                        <label for="description">Please provide us with any other information (what's the story behind your video?)</label>
	                        <textarea class="form-control" id="description" name="description"><?php echo old('description'); ?></textarea>
	                    </div>

	                    <!--div class="form-radio">
	                        <label class="form-radio-label" for="filmed_by_me">Who filmed the video?</label>
	                        <br>
	                        {{ Form::radio('filmed_by_me', 'yes') }} I filmed the video
	                        <br>
	                        {{ Form::radio('filmed_by_me', 'no') }} Someone else filmed it
	                    </div-->

	                    <div class="form-group form-radio">
	                        <label class="form-radio-label" for="permission">Have you received permission to film/submit this video from those who are featured? (Especially in cases where there are minors/children in the video)</label>
					        <input type="radio" name="permission" value="yes"> Yes
					        <input type="radio" name="permission" value="nes"> No
	                    </div>

	                    <div class="form-group form-radio">
	                        <label class="form-radio-label" for="submitted_elsewhere">Have you submitted this video through any other online form?</label>
					        <input type="radio" name="submitted_elsewhere" value="yes"> Yes
					        <input type="radio" name="submitted_elsewhere" value="no"> No
	                    </div>

	                    <div class="form-group form-group">
	                        <label for="submitted_where">Where else have you submitted this video?</label>
	                        <input type="text" class="form-control" id="submitted_where" name="submitted_where" value="<?php old('submitted_where'); ?>">
	                    </div>

					</div>

				</div>
			</div>

			<div class="col-md-6 page">

				<div class="panel panel-primary" data-collapsed="0">

					<div class="panel-heading">Your Contact Details</div>

		            <div class="panel-body">

						<div class="form-group">
	                        <label for="first_name">First Name</label>
	                        <input type="text" class="form-control" id="first_name" name="first_name" value="<?php echo $video->contact->first_name; ?>" disabled>
	                    </div>

	                    <div class="form-group">
	                        <label for="last_name">last Name</label>
	                        <input type="text" class="form-control" id="last_name" name="last_name" value="<?php echo $video->contact->last_name; ?>" disabled>
	                    </div>

	                    <div class="form-group">
	                        <label for="email">Email</label>
	                        <input type="email" class="form-control" id="email" name="email" value="<?php echo $video->contact->email; ?>" disabled>
	                    </div>

					</div>

				</div>

			</div>

			<div class="col-md-6">

				<div class="panel panel-primary" data-collapsed="0">

					<div class="panel-heading">Important Legal Stuff</div>

		            <div class="panel-body">

						<div class="form-group">
					        <label class="form-check-label-left"><input class="checkbox-push-left" id="contact_is_owner" name="contact_is_owner" type="checkbox" value="1">
					        <div class="checkbox-desc">I confirm that I filmed this video and/or I am the rightful owner to this video.</div></label>
						</div>

						<div class="form-group">
					       <label class="form-check-label-left"><input class="checkbox-push-left" id="allow_publish" name="allow_publish" type="checkbox" value="1">
					       <div class="checkbox-desc">I confirm that I am happy for this video to be published and viewed by potentially millions of people. (Especially in cases where there are minors/children in the video)</div></label>
						</div>

						<div class="form-group">
					        <label class="form-check-label-left"><input class="checkbox-push-left" id="is_exclusive" name="is_exclusive" type="checkbox" value="1">
					        <div class="checkbox-desc">I confirm that I am granting UNILAD an exclusive license to this video and understand that this means I cannot and will not enter into a discussion with any other company regarding this content. I understand that UNILAD are the new license holders and I will inform them of any contact I receive from another company regarding the use of this video.</div></label>
						</div>

					</div>

				</div>

			</div>

			<div class="col-md-12">

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-body">

						<div class="form-group">
							<input type="submit" value="Update Details" class="btn btn-primary">
						</div>

					</div>
				</div>

			</div>

			<?php else: ?>

			<div class="col-md-12 page">

				<div class="panel panel-primary" data-collapsed="0">

					<div class="panel-heading">Thanks for submitting the extra details.</div>

				</div>

			</div>

			<?php endif; ?>

		</div>

	</div>

</form>

<?php include('includes/footer.php'); ?>
