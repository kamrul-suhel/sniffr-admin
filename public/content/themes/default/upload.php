<?php include('includes/header.php'); ?>


<?php var_dump(old()); ?>

<div class="container">
	<div class="row">
		<div class="col-md-12 page">
			<div class="panel-heading">Upload</div>

			<div class="heading-divider"></div>

            <div class="panel-body">
                <form method="POST" action="/upload" accept-charset="UTF-8" enctype="multipart/form-data">
                    <?php echo csrf_field(); ?>

                    <?php if (count($errors)): ?>?
                        <div class="alert alert-danger">
                            <ul>
                                <?php foreach ($errors->all() as $error): ?>
                                    <li>{{ $error }}</li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endif; ?>

                    <div class="form-group">
                        <label for="first_name">First Name *</label>
                        <input type="text" class="form-control" id="first_name" name="first_name" value="">
                    </div>

                    <div class="form-group">
                        <label for="last_name">last Name *</label>
                        <input type="text" class="form-control" id="last_name" name="last_name" value="">
                    </div>

                    <div class="form-group">
                        <label for="tel">Email *</label>
                        <input type="email" class="form-control" id="email" name="email" value="">
                    </div>

                    <div class="form-group">
                        <label for="title">Video Title *</label>
                        <input type="text" class="form-control" id="title" name="title" value="">
                    </div>

                    <div class="form-group">
                        <label for="url">Video Url</label>
                        <input type="text" class="form-control" id="url" name="url" value="">
                    </div>

                    <div class="form-group">
                        <label for="file">Video File</label>
                        <input type="file" id="file" name="file" value="" />
                    </div>

                    <div class="form-check">
                        <label class="form-check-label" for="terms"><input id="terms" name="terms" type="checkbox" value="1">I agree to the <a href="">terms and conditions</a></label>
                    </div>

                    <hr />

                   	<input type="submit" value="Submit" class="btn btn-primary">
                </form>
			</div>
		</div>
	</div>
</div>

<?php include('includes/footer.php'); ?>