<div id="dim-screen">
    <div class="menu-animated-background">
        <img src="<?= THEME_URL . '/assets/img/hamster_wheel.gif';?>" border="0" />
        <!-- <div class="sk-folding-cube">
            <div class="sk-cube1 sk-cube"></div>
            <div class="sk-cube2 sk-cube"></div>
            <div class="sk-cube4 sk-cube"></div>
            <div class="sk-cube3 sk-cube"></div>
        </div> -->
        <br />
        <p>we're just uploading your video..</p>
    </div>
</div>

<form method="POST" action="/upload" name="upload-form" id="upload-form" class="slick-form" accept-charset="UTF-8" enctype="multipart/form-data">
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

        <h2>Your Contact Details</h2>

        <div class="form-group">
            <label for="full_name">Full Name: <span>*</span></label>

            <div class="input-group">
                <div class="input-group-addon icon-profile"></div>
                <input type="text" class="form-control" id="full_name" name="full_name" placeholder="Name" value="<?php echo old('full_name'); ?>" >
            </div>
        </div>

        <div class="form-group">
            <label for="email">Email Address: <span>*</span></label>

            <div class="input-group">
                <div class="input-group-addon icon-envelope"></div>
                <input type="email" class="form-control" id="email" name="email" placeholder="Email" value="<?php echo old('email'); ?>" >
            </div>
        </div>

        <div class="form-group">
            <label for="tel">Phone Number:</label>

            <div class="input-group">
                <div class="input-group-addon icon-phone"></div>
                <input type="tel" id="tel" class="form-control" placeholder="Phone" name="tel" value="<?php echo old('tel'); ?>">
            </div>
        </div>

        <h2>Your Video Details</h2>

        <div class="form-group">
            <label for="title">Video Title: <span>*</span></label>

            <div class="input-group">
                <div class="input-group-addon icon-video"></div>
                <input type="text" class="form-control" id="title" name="title" placeholder="Title" value="<?php echo old('title'); ?>">
            </div>
        </div>

        <h3>Please upload a link to the video, or the video file: </h3>

        <div class="form-group">
            <label for="file" class="file">Video File: </label>
            <span class="btn btn-success fileinput-button">
                <i class="fa fa-plus"></i>
                <span>Choose file...</span>
                <!-- The file input field used as target for the file upload widget -->
                <input class="files" type="file" id="file" name="file" data-url="/upload" value="<?php echo old('file'); ?>" />
            </span>
            <div id="filename"></div>
            <p class="small">Maximum file size: 500MB. Acceptable file types: avi, flv, mov, mp4, mpg, mkv, wmv, 3gp.</p>
        </div>

        <div class="form-group">
            <label for="url">Video Link/URL: </label>

            <div class="input-group">
                <div class="input-group-addon icon-link"></div>
                <input class="form-control files" type="text" id="url" name="url" placeholder="Link" value="<?php echo old('url'); ?>" placeholder="">
            </div>
        </div>

        <div class="form-check">
            <h2>Terms &amp; Conditions</h2>

            <div class="styled-checkbox">
                <input id="terms" name="terms" type="checkbox">
                <label class="form-check-label-left js-checkbox" for="terms"></label>
                <p class="terms-copy" data-attr="terms" style="">I agree to the <a href="<?php echo (isset($_GET['source']) ? 'https://www.unilad.co.uk/terms-use/' : '/terms/'); ?>" target="_blank">terms and conditions</a> <span>* </span></p>
            </div>
        </div>

        <input type="hidden" id="source" name="source" value="<?php echo (isset($_GET['source']) ? $_GET['source'] : ''); ?>">
        <input type="submit" class="btn btn-primary pull-right" value="Submit your video">
    </div>

    <?php if(isset($iframe) && $iframe == 'true'): ?>
    <input type="hidden" name="iframe" value="true">
    <?php endif; ?>
</form>

<?php include('content/themes/default/includes/mousestats.php'); ?>
