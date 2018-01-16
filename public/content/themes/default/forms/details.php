<form method="POST" action="/details/<?php echo Request::segment(2); ?>" name="details-form" id="details-form" accept-charset="UTF-8" enctype="multipart/form-data">
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
                                <div id="video_container" class="fitvid">
                                <?php if($video->youtube_id): ?>
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/<?php echo $video->youtube_id; ?>" frameborder="0" allowfullscreen></iframe>
                                <?php elseif($video->url && $key = $video->getKey()): ?>
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/<?php echo $key; ?>" frameborder="0" allowfullscreen></iframe>
                                <?php elseif(str_contains($video->url,'facebook')): ?>
                                    <div class="fb-video" data-href="<?php echo $video->url; ?>" data-allowfullscreen="true"></div>
                                <?php elseif($video->url): ?>
                                    <h1>We need to handle videoi urls (that aren't youtube)</h1>
                                <?php elseif($video->embed_code): ?>
                                    <?php echo $video->embed_code ?>
                                <?php elseif($video->file): ?>
                                    <video id="video_player" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" poster="<?= Config::get('site.uploads_url') . 'images/' . $video->image ?>" data-setup="{}" width="100%" style="width:100%;">
                                        <source src="<?php echo $video->file; ?>" type='video/mp4'>
                                        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
                                    </video>
                                <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">Your Contact Details</div>

                    <div class="panel-body">
                        <div class="form-group">
                            <label for="first_name">First Name</label>
                            <input type="text" class="form-control" id="first_name" name="first_name" value="<?php echo $video->contact->first_name; ?>" disabled>
                        </div>

                        <div class="form-group">
                            <label for="last_name">Last Name</label>
                            <input type="text" class="form-control" id="last_name" name="last_name" value="<?php echo $video->contact->last_name; ?>" disabled>
                        </div>

                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" name="email" value="<?php echo $video->contact->email; ?>" disabled>
                        </div>

                        <div class="form-group">
                            <label for="temp-tel">Phone Number</label>
                            <input type="tel" class="form-control" id="temp-tel" name="temp-tel" value="<?php if($video->contact->tel){ echo $video->contact->tel; } else { echo ''; } ?>">
                            <span id="valid-msg" class="hide">✓ Valid number</span>
                            <span id="error-msg" class="hide">Invalid number</span>
                            <input type="hidden" id="tel" name="tel" value="">
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 page">
                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">Additional Details</div>

                    <div class="panel-body">
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
                            <div><strong>Have you submitted this video through any other online form?<strong></div>
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
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">Important Legal Stuff</div>

                    <div class="panel-body">
                        <div class="form-group">
                            <label class="form-check-label-left"><input class="checkbox-push-left" id="contact_is_owner" name="contact_is_owner" type="checkbox" value="1" <?php if(old('contact_is_owner')==1) { echo 'checked'; } ?>>
                            <div class="checkbox-desc">I confirm that I filmed this video and/or I am the rightful owner to this video.</div></label>
                        </div>

                        <div class="form-group">
                           <label class="form-check-label-left"><input class="checkbox-push-left" id="allow_publish" name="allow_publish" type="checkbox" value="1" <?php if(old('allow_publish')==1) { echo 'checked'; } ?>>
                           <div class="checkbox-desc">I confirm that I am happy for this video to be published and viewed by potentially millions of people. (Especially in cases where there are minors/children in the video)</div></label>
                        </div>

                        <div class="form-group">
                            <label class="form-check-label-left"><input class="checkbox-push-left" id="is_exclusive" name="is_exclusive" type="checkbox" value="1" <?php if(old('is_exclusive')==1) { echo 'checked'; } ?>>
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

<link rel="stylesheet" href="/assets/css/intl-tel-input/css/intlTelInput.css">

<script type="text/javascript">
(function($){
    //internation phone numbers
    var telInput = $('#temp-tel'),
        errorMsg = $('#error-msg'),
        validMsg = $('#valid-msg');
    telInput.intlTelInput({
        utilsScript: '/assets/js/utils.js',
        initialCountry: 'gb',
        preferredCountries: ['gb', 'us', 'au', 'ie', 'ca'],
        excludeCountries: ['af', 'al', 'dz', 'as', 'ad', 'ao', 'ai', 'ag', 'am', 'az']
    });
    var reset = function() {
        telInput.removeClass('error');
        errorMsg.addClass('hide');
        validMsg.addClass('hide');
        telInput.val('');
    };
    telInput.on('propertychange input', function (e) {
        if ($.trim(telInput.val())) {
            if (telInput.intlTelInput("isValidNumber")) {
              validMsg.removeClass("hide");
              errorMsg.addClass("hide");
            } else {
              validMsg.addClass("hide");
              errorMsg.removeClass("hide");
            }
            $('#tel').val($(this).intlTelInput("getNumber"));
        }
    });
    telInput.on('countrychange', reset);

    //js form validations >> More details
    $('#details-form').validate({
        rules: {
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            date_filmed: {
                required: true
            },
            location: {
                required: true
            },
            description: {
                required: true
            },
            permission: {
                required: true
            },
            submitted_elsewhere: {
                required: true
            },
            submitted_where: {
                required: function(element){
                    return (!$("#submitted_elsewhere").val());
                }
            },
            contact_is_owner: {
                required: true
            },
            allow_publish: {
                required: true
            },
            is_exclusive: {
                required: true
            }
        },
        messages: {
            first_name: 'You must enter your first name',
            last_name: 'You must enter your last name (surname)',
            email: 'You must enter a valid email address',
            date_filmed: 'You must enter when the video was filmed',
            location: 'You must enter where the video was filmed',
            description: 'You must enter a short description or story behind the video',
            permission: 'You must confirm that you have permission from those who are featured in the video',
            submitted_elsewhere: 'You must select if you submitted the video elsewhere',
            submitted_where: 'You must enter where you submitted the video elsewhere',
            contact_is_owner: 'You must confirm and agree to the statement below',
            allow_publish: 'You must confirm and agree to the statement below',
            is_exclusive: 'You must confirm and agree to the statement below'
        },
        errorPlacement: function (error, element) {
            if(element.attr('name') == 'permission') {
                error.insertAfter('.permission-below');
            } else if(element.attr('name') == 'submitted_elsewhere') {
                error.insertAfter('.submitted_elsewhere-below');
            } else {
                error.insertAfter(element);
            }
        }
    });

    //hide or show where video was uploaded submitted_elsewhere
    $('input[name=submitted_elsewhere]').on('click', function() {
        if($(this).val()=='yes') {
            $('#submitted_where_container').show();
        } else {
            $('#submitted_where_container').hide();
        }
    });
})(jQuery);
</script>
