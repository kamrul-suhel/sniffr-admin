<form method="POST" action="/details/<?php echo Request::segment(2); ?>" name="details-form" id="details-form" class="slick-form" accept-charset="UTF-8" enctype="multipart/form-data">
    <?php echo csrf_field(); ?>

    <?php if(empty($video->more_details)): ?>

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
            <?php if(!isset($video->id)): ?>
            <div class="col-md-12 page">
                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">Sorry, we can't seem to find your video with the code you provided. Please contact <u>submissions@unilad.co.uk</u></div>
                </div>
            </div>

            <?php elseif(!isset($video->more_details)): ?>

            <h2>Your Video Details</h2>

            <div class="text-center" style="max-width:300px; margin:0 auto;">
                <div class="item-video">
                    <?php echo App\Libraries\VideoHelper::getVideoHTML($video, true, 'edit'); ?>
                </div>
                <h3><?php echo $video->title ?></h3>
            </div>

            <h2>Your Contact Details</h2>

            <div class="form-group">
                <label for="full_name">Name</label>
                <input type="text" class="form-control" id="full_name" name="full_name" value="<?php echo $video->contact->full_name; ?>" disabled>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email" value="<?php echo $video->contact->email; ?>" disabled>
            </div>

            <div class="form-group">
                <label for="temp-tel">Phone Number:</label>

                <?php if($video->contact->tel): ?>
                    <input type="tel" class="form-control" id="tel" name="tel" value="<?php echo $video->contact->tel; ?>" disabled>
                <?php else: ?>
                <div class="input-group">
                    <div class="input-group-addon icon-phone"></div>
                    <input type="tel" class="form-control" id="temp-tel" name="temp-tel" placeholder="Phone" value="<?php echo old('tel'); ?>">
                    <div class="input-group-addon">
                        <span id="valid-msg" class="hide">✓ Valid number</span>
                        <span id="error-msg" class="hide">Invalid number</span>
                    </div>

                    <input type="hidden" id="tel" name="tel" value="<?php echo old('tel'); ?>">
                </div>
                <?php endif; ?>
            </div>

            <h2>Additional Details</h2>

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
                <div><strong>Have you received permission to film/submit this video from those who are featured? (Especially in cases where there are minors/children in the video)</strong></div>
                <label class="radio-inline">
                    <input type="radio" name="permission" value="yes" <?php if(old('permission')=='yes') { echo 'checked'; } ?>> Yes
                </label>
                <label class="radio-inline">
                    <input type="radio" name="permission" value="no" <?php if(old('permission')=='no') { echo 'checked'; } ?>> No
                </label>
                <div class="permission-below error"></div>
            </div>

            <div class="form-group form-radio">
                <div><strong>Have you submitted this video through any other online form?</strong></div>
                <label class="radio-inline">
                    <input type="radio" name="submitted_elsewhere" value="yes" <?php if(old('submitted_elsewhere')=='yes') { echo 'checked'; } ?>> Yes
                </label>
                <label class="radio-inline">
                    <input type="radio" name="submitted_elsewhere" value="no" <?php if(old('submitted_elsewhere')=='no') { echo 'checked'; } ?>> No
                </label>
                <div class="submitted_elsewhere-below error"></div>
            </div>

            <div class="form-group form-group" id="submitted_where_container">
                <label for="submitted_where">Where else have you submitted this video?</label>
                <input type="text" class="form-control" id="submitted_where" name="submitted_where" value="<?php old('submitted_where'); ?>">
            </div>

            <h2>Important Legal Stuff</h2>

            <div class="styled-checkbox">
                <input id="contact_is_owner" name="contact_is_owner" type="checkbox" value="1">
                <label class="form-check-label-left" for="contact_is_owner"></label>
                <p class="terms-copy" data-attr="contact_is_owner">I confirm that I filmed this video and/or I am the rightful owner to this video. <span>* </span></p>
            </div>

            <div class="styled-checkbox">
                <input id="allow_publish" name="allow_publish" type="checkbox" value="1">
                <label class="form-check-label-left" for="allow_publish"></label>
                <p class="terms-copy" data-attr="allow_publish">I confirm that I am happy for this video to be published and viewed by potentially millions of people. (Especially in cases where there are minors/children in the video) <span>* </span></p>
            </div>

            <div class="styled-checkbox">
                <input id="is_exclusive" name="is_exclusive" type="checkbox" value="1">
                <label class="form-check-label-left" for="is_exclusive"></label>
                <p class="terms-copy" data-attr="is_exclusive">I confirm that I am granting UNILAD an exclusive license to this video and understand that this means I cannot and will not enter into a discussion with any other company regarding this content. I understand that UNILAD are the new license holders and I will inform them of any contact I receive from another company regarding the use of this video. <span>* </span></p>
            </div>

            <div class="form-group">
                <input type="submit" value="Update Details" class="btn btn-primary">
            </div>
            <?php endif; ?>
        </div>
    </div>

    <?php else: ?>

    <div class="container bg-404">
    	<div class="area-404">
    		<h1>Thanks for the extra info buddy!</h1>
    		<img src="/content/themes/default/assets/img/hamster_thanks.png" class="hamster_thanks" border="0" />
    		<div class="clear"></div>
    	</div>
    </div>

    <?php endif; ?>
</form>
