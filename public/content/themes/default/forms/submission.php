<div id="dim-screen">
    <div class="menu-animated-background">
        <img src="<?= THEME_URL . '/assets/img/hamster_wheel.gif';?>" border="0" />
        <br />
        <p>we're just uploading your video..</p>
    </div>
</div>

<form method="POST" action="/submission" name="upload-form" id="upload-form" class="slick-form" accept-charset="UTF-8" enctype="multipart/form-data">
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
            <label for="email">Email: <span>*</span></label>

            <div class="input-group">
                <div class="input-group-addon icon-envelope"></div>
                <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelpBlock" placeholder="Just in case we need to contact you again" value="<?php echo old('email'); ?>" >
            </div>
        </div>

        <h2>Your Video Details</h2>

        <div class="form-group">
            <label for="title">Video Title <span>*</span></label>

            <div class="input-group">
                <div class="input-group-addon icon-video"></div>
                <input type="text" class="form-control" id="title" name="title" placeholder="Describe your video in a few words." value="<?php echo old('title'); ?>">
            </div>
        </div>

        <h3>Please upload a link to the video, or the video file: </h3>

        <div class="form-group">
            <label for="url">Video Link/URL: </label>

            <div class="input-group">
                <div class="input-group-addon icon-link"></div>
                <input class="form-control files" type="text" id="url" name="url" placeholder="Link" value="<?php echo old('url'); ?>" placeholder="">
            </div>
        </div>

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
            <label for="notes">Notes</label>
            <textarea class="form-control" rows="2" id="notes" name="notes" aria-describedby="notesHelpBlock" placeholder="If we need to know anything about the video, let us know here"><?php echo old('notes'); ?></textarea>
        </div>

        <div class="form-group">
            <label for="credit">Credit Link</label>
            <input type="text" class="form-control" id="credit" name="credit" aria-describedby="creditHelpBlock" placeholder="Credits are placed in the pinned comment (unless alternative method is agreed)" value="<?php echo old('credit'); ?>">
        </div>

        <div class="form-group">
            <label for="referrer">UNILAD Referrer </label>
            <input type="text" class="form-control" id="referrer" name="referrer" aria-describedby="referrerHelpBlock" placeholder="Who at UNILAD asked you to fill in this form?" value="<?php echo old('referrer'); ?>" >
        </div>

        <div class="form-check">
            <h2>Terms &amp; Conditions</h2>

            <div class="scroll-box">
                <p><strong>Ownership</strong></p>
                <p>I certify that I am the sole owner of all intellectual property rights for this video or have the express permission of the rights holder to submit this video to UNILAD for exclusive publishing on UNILAD.</p>
                <p>I agree to submit and licence this video and its content to UNILAD and their associated companies for their use at their sole discretion, in exchange for entry into their £300 monthly prize draw. </p>
                <p><strong>Video Publishing Acknowledgement</strong></p>
                <p>I understand that the video I am submitting may be published to UNILAD web properties including, but not limited to, YouTube, UNILAD.co.uk, Twitter, Facebook, and any other avenues of promotion, as determined by UNILAD according to the terms of this agreement, which I have read and agree to.</p>
                <p><strong>Exclusive Licensing</strong></p>
                <p>I agree that UNILAD as the ‘License Holder’ be granted the exclusive, unlimited right to use, and to exhibit, distribute, and hereafter devise, in any manner upon all UNILAD platforms throughout the world, in perpetuity, for any purpose whatsoever as UNILAD in its sole discretion may determine (the “Licensed Rights”).  I do hereby irrevocably appoint UNILAD as its attorney-in-fact in relation to the rights over these images.</p> 
                <p>I certify that I act with full lawful authority to grant this license, and warrant that there has not been any previous grant of any other license to third parties in relation to these images and it is expressly understood that UNILAD has not assumed any obligations under any other contracts entered into by myself.</p>
                <p>I further undertake not to enter any future agreements over this content with any third parties, as required by the exclusivity of this agreement and will promptly forward any communications regarding my content to UNILAD, as the new License Holder. </p>
                <p>I hereby agree to indemnify, release and hold harmless UNILAD, its successors, in any action arising from the use of the images, resulting from any breach by Licensor of any warranty, representation or any other provision of these Terms.</p>
                <p><strong>Publicity/Confidentiality</strong></p>
                <p>I shall not release, or cause the release, of any information concerning the Licensed Rights, UNILAD or the terms of this License.  I will inform UNILAD if there are any changes to my personal details for the duration of this agreement.  UNILAD undertakes to maintain personal details confidentially and in accordance with all relevant data protection laws and the Privacy Policy available on our Website and incorporated herein.</p>
                <p><strong>Terms &amp; Services</strong></p>
                <p>I acknowledged, understands and agree to the additional terms and services displayed on the UNILAD website which are incorporated herein by this reference and subject to change.</p>
                <p><strong>Termination Clause</strong></p>
                <p>The License shall only be terminable upon the mutual agreement of the parties with 5 months’ notice, I agree to indemnify UNILAD for any losses from third party contracts arising due to termination.  Termination will have no effect on any prior use or treatment of the images by UNILAD, which may continue in perpetuity.</p>
                <p>I understand that participation in the UNILAD video system is at will and I agree that this license may only be terminated by mutual agreement between UNILAD and I as set out above.</p>
            </div>

            <div class="styled-checkbox">
                <input id="terms" name="terms" type="checkbox">
                <label class="form-check-label-left js-checkbox" for="terms"></label>
                <p class="terms-copy" data-attr="terms">By clicking the submit button, I agree to terms &amp; conditions. <span>* </span></p>
            </div>

            <input type="hidden" id="source" name="source" value="<?php echo (isset($_GET['source']) ? $_GET['source'] : ''); ?>">
            <input type="submit" class="btn btn-primary pull-right" value="Submit your video">
        </div>
    </div>

    <?php if(isset($iframe) && $iframe == 'true'): ?>
    <input type="hidden" name="iframe" value="true">
    <?php endif; ?>
</form>

<?php include('content/themes/default/includes/mousestats.php'); ?>
