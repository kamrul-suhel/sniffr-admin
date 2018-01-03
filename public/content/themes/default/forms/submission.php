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
        <p>we're just uploading your awesome video..</p>
    </div>
</div>

<form method="POST" action="/submission" name="upload-form" id="upload-form" accept-charset="UTF-8" enctype="multipart/form-data">
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
                    <div class="panel-heading">Your Video Details</div>

                    <div class="panel-body">
                        <div class="form-group">
                            <label for="title">Video Title <span>*</span></label>
                            <input type="text" class="form-control" id="title" name="title" placeholder="Describe your video in a few words." value="<?php echo old('title'); ?>">
                        </div>

                        <p>Please use either send us your video link <strong>OR</strong> upload your video file below <span>*</span></p>

                        <div class="row">
                            <div class="col-xs-6">
                                <div class="form-group shaded" id="make-shaded-url">
                                    <div class="radio pull-right">
                                        <div class="circle-url circle-shaded"></div>
                                    </div>

                                    <label for="url">Video Link</label>
                                    <input class="form-control files" type="text" id="url" name="url" value="<?php echo old('url'); ?>" placeholder="">
                                </div>
                            </div>

                            <div class="col-xs-6">
                                <div class="form-group unshaded" id="make-shaded-file">
                                    <div class="radio pull-right">
                                        <div class="circle-file circle-unshaded"></div>
                                    </div>
                                    <label for="file">Video File</label>
                                    <span class="btn btn-success fileinput-button">
                                    <i class="fa fa-plus"></i>
                                    <span>Add file...</span>
                                    <!-- The file input field used as target for the file upload widget -->
                                    <input class="files" type="file" id="file" name="file" data-url="/upload" value="<?php echo old('file'); ?>" />
                                    </span>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div id="video-error" style="display:none;"></div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="notes">Notes</label>
                                    <textarea class="form-control" rows="2" id="notes" name="notes" aria-describedby="notesHelpBlock" placeholder="If we need to know anything about the video, let us know here"><?php echo old('notes'); ?></textarea>
                                    <!-- <p id="notesHelpBlock" class="form-text text-muted">If we need to know anything about the video, let us know here.</p> -->
                                </div>

                                <div class="form-group">
                                    <label for="credit">Credit Link</label>
                                    <input type="text" class="form-control" id="credit" name="credit" aria-describedby="creditHelpBlock" placeholder="Credits are placed in the pinned comment (unless alternative method is agreed)" value="<?php echo old('credit'); ?>">
                                    <!-- <p id="creditHelpBlock" class="form-text text-muted">Credits are placed in the pinned comment (unless alternative method is agreed on).</p> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 page">
                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">Your Contact Details</div>

                    <div class="panel-body">
                        <div class="form-group">
                            <label for="first_name">First Name <span>*</span></label>
                            <input type="text" class="form-control" id="first_name" name="first_name" placeholder="Enter your First Name" value="<?php echo old('first_name'); ?>" >
                        </div>

                        <div class="form-group">
                            <label for="last_name">Last Name <span>*</span></label>
                            <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Enter your Last Name" value="<?php echo old('last_name'); ?>" >
                        </div>

                        <div class="form-group">
                            <label for="email">Email <span>*</span></label>
                            <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelpBlock" placeholder="Just in case we need to contact you again" value="<?php echo old('email'); ?>" >
                            <!-- <p id="emailHelpBlock" class="form-text text-muted">Just incase we need to contact you again.</p> -->
                        </div>

                        <div class="form-group">
                            <label for="referrer">UNILAD Referrer </label>
                            <input type="text" class="form-control" id="referrer" name="referrer" aria-describedby="referrerHelpBlock" placeholder="Who at UNILAD asked you to fill in this form?" value="<?php echo old('referrer'); ?>" >
                            <!-- <p id="referrerHelpBlock" class="form-text text-muted">Who at UNILAD asked you to fill in this form?</p> -->
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
                            <textarea class="form-control" rows="4" id="terms_text" name="terms_text">Terms & Conditions:

I certify that I am the rights holder for the video(s) found at the link(s) above, or that I have the express permission of the rights holder to submit the video(s) to UNILAD for publishing on UNILAD web properties.

Video Publishing Acknowledgement (*)

I understand that the video(s) I am submitting may be published to UNILAD web properties including, but not limited to, UNILAD.co.uk, Twitter, Facebook, as determined by UNILAD according to the terms of this agreement, which I have read and agree to. UNILAD will not publish the video(s) to YouTube without my permission first.

I understand that where necessary, UNILAD may edit, crop or modify the video(s) in order to tailor the video to the UNILAD audience. No edits of the video(s) will be derogatory in any way towards myself or any third party seen in the video(s).

Termination Clause(*)

I understand that participation in the UNILAD video system is at will and I agree that this license may only be terminated by mutual agreement between all the parties*

Exclusivity(*)

I certify that I am the rights holder, capable of granting a non-exclusive license to UNILAD over my content submitted hereto.

The rights holder retains all rights in the submitted video(s), including without limitation, the right to copy, distribute, publish, display or modify the submitted video(s), and to transfer, assign or grant license of any such rights. Any such grant to third parties will be subject to the free and lawful grant of this license to UNILAD.
                            </textarea>

                            <label class="form-check-label-left" for="terms" id="terms-checkbox">
                                <input id="terms" name="terms" type="checkbox" value="1">By clicking the submit button, I agree to terms & conditions. <span>*</span>
                            </label>
                        </div>

                        <div class="clear"></div>

                        <input type="submit" class="btn btn-primary pull-right" value="Submit your video">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php if(isset($iframe) && $iframe == 'true'): ?>
    <input type="hidden" name="iframe" value="true">
    <?php endif; ?>
</form>