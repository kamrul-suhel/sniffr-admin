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
            <label for="tel">Email Address: <span>*</span></label>

            <div class="input-group">
                <div class="input-group-addon icon-envelope"></div>
                <input type="email" class="form-control" id="email" name="email" placeholder="Email" value="<?php echo old('email'); ?>" >
            </div>
        </div>

        <div class="form-group">
            <label for="temp-tel">Phone Number:</label>

            <div class="input-group">
                <div class="input-group-addon icon-phone"></div>
                <input type="tel" class="form-control" id="temp-tel" name="temp-tel" placeholder="Phone" value="<?php echo old('tel'); ?>">
                <div class="input-group-addon">
                    <span id="valid-msg" class="hide">✓ Valid number</span>
                    <span id="error-msg" class="hide">Invalid number</span>
                </div>
                
                <input type="hidden" id="tel" name="tel" value="<?php echo old('tel'); ?>">
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

        <h3>Please upload a link to the video, or the video file:</h3>

        <div class="form-group">
            <label for="file" class="file">Video File:</label>
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

        <div class="col-md-12">
            <div id="video-error" style="display:none;"></div>
        </div>

        <div class="form-check">
            <h2>Terms &amp; Conditions</h2>

            <div class="scroll-box">I certify that I am the rights holder for the video(s) found at the link(s) above, or that I have the express permission of the rights holder to submit the video(s) to UNILAD for publishing on UNILAD web properties.

Video Publishing Acknowledgement (*)

I understand that the video(s) I am submitting may be published to UNILAD web properties including, but not limited to, UNILAD.co.uk, Twitter, Facebook, as determined by UNILAD according to the terms of this agreement, which I have read and agree to. UNILAD will not publish the video(s) to YouTube without my permission first.

I understand that where necessary, UNILAD may edit, crop or modify the video(s) in order to tailor the video to the UNILAD audience. No edits of the video(s) will be derogatory in any way towards myself or any third party seen in the video(s).

Termination Clause(*)

I understand that participation in the UNILAD video system is at will and I agree that this license may only be terminated by mutual agreement between all the parties*

Exclusivity(*)

I certify that I am the rights holder, capable of granting a non-exclusive license to UNILAD over my content submitted hereto.

The rights holder retains all rights in the submitted video(s), including without limitation, the right to copy, distribute, publish, display or modify the submitted video(s), and to transfer, assign or grant license of any such rights. Any such grant to third parties will be subject to the free and lawful grant of this license to UNILAD.
            </div>

            <div class="styled-checkbox">
                <input id="terms" name="terms" type="checkbox">
                <label class="form-check-label-left js-checkbox" for="terms"></label>
                <p class="terms-copy" data-attr="terms">I agree to the above terms and conditions <span>* </span></p>
            </div>
        </div>

        <input type="submit" class="btn btn-primary pull-right" value="Submit your video">
    </div>

    <?php if(isset($iframe) && $iframe == 'true'): ?>
    <input type="hidden" name="iframe" value="true">
    <?php endif; ?>
</form>
