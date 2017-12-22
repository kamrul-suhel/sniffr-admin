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
                            <input type="text" class="form-control" id="first_name" name="first_name" value="<?php echo 'yo'; //old('first_name'); ?>" >
                        </div>

                        <div class="form-group">
                            <label for="last_name">Last Name <span>*</span></label>
                            <input type="text" class="form-control" id="last_name" name="last_name" value="<?php echo 'yo'; //old('last_name'); ?>" >
                        </div>

                        <div class="form-group">
                            <label for="tel">Email <span>*</span></label>
                            <input type="email" class="form-control" id="email" name="email" value="<?php echo 'test@exmaple.com'; //old('email'); ?>" >
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
                            <input type="text" class="form-control" id="title" name="title" value="<?php echo 'yo'; //old('title'); ?>">
                        </div>

                        <p>Please use either send us your video link <strong>OR</strong> upload your video file below <span>*</span></p>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group shaded" id="make-shaded-file">
                                    <div class="radio pull-right">
                                        <div class="circle-file circle-shaded"></div>
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

                            <div class="col-md-6">
                                <div class="form-group unshaded" id="make-shaded-url">
                                    <div class="radio pull-right">
                                        <div class="circle-url circle-unshaded"></div>
                                    </div>
                                    
                                    <label for="url">Video Link</label>
                                    <input class="form-control files" type="text" id="url" name="url" value="<?php echo old('url'); ?>" placeholder="">
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div id="video-error" style="display:none;"></div>
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
                        <div class="form-check text-right">
                            <label class="form-check-label" for="terms" id="terms-checkbox">
                                <input id="terms" name="terms" type="checkbox" value="1">I agree to the <a href="">terms and conditions</a>
                            </label>
                        </div>

                        <div class="progress_output"></div>
                        <!-- <div id="progress">
                            <div class="bar" style="width: 0%;"></div>
                        </div> -->

                        <!--a id="video-submit" class="btn btn-primary pull-right">Submit your video</a-->

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

<script type="text/javascript">
$('document').ready(function(){
    //js form validations >> Video upload
    $('#upload-form').validate({
        groups: {  // consolidate messages into one
            names: 'file url'
        },
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
            title: {
                required: true
            },
            file: {
                require_from_group: [1, '.files'],
                extension: "flv|ogg|mp4|qt|avi|wmv|m4v|webm|mov"
            },
            url: {
                require_from_group: [1, '.files'],
                url: true
            },
            terms: {
                required: true
            }
        },
        messages: {
            first_name: 'You must enter your first name',
            last_name: 'You must enter your last name (surname)',
            email: 'You must enter a valid email address',
            title: 'You must enter your video title',
            terms: 'You must check the box agreeing to our terms'
        },
        errorPlacement: function (error, element) {
            if(element.is('#file') || element.is('#url')) {
                $('#video-error').css('display','block');
                if($('#file').val()){
                    $('#video-error').text('The file must be a valid video file: flv,ogg,mp4,qt,avi,wmv,m4v,webm');
                }else{
                    $('#video-error').text('Either a video file or video url is required');
                }
            }else if(element.is('#terms') ){
                error.insertAfter('#terms-checkbox');
            }else{
                error.insertAfter(element);
            }
        },
        successHandler: function() {
            alert('valid!');
        }
    });


    $("#upload-form").on('submit', function(e){
        e.preventDefault();

        var validator = $(this).validate();
        validator.form();

        if(validator.valid()){
            $('.progress_output').css('display','block');
            $('#dim-screen').show();

            var formData = new FormData($(this)[0]);  

            $.ajax({
                url: $(this).attr('action'),
                type: $(this).attr('method'),
                cache: false,
                processData: false,
                contentType: false,
                data: formData ,
                success: function(data) { // je récupère la réponse du fichier PHP
                    if(data.status == 'success'){
                        if(data.iframe == 'true'){
                            window.top.location.href = data.href; 
                        }else{
                            window.location.href = '/thanks';
                        }
                    }else{
                         console.log(data.message);
                    }
                },
                error: function(data){
                    console.log('There was an error uploading your video');
                } 
            }); 
        }
    });

    // make video url or file area shaded/unshaded
    $('#make-shaded-url').on('click', function() {
        $('#make-shaded-file').removeClass('shaded');
        $('#make-shaded-file').addClass('unshaded');
        $('#make-shaded-url').removeClass('unshaded');
        $('#make-shaded-url').addClass('shaded');
        $('.circle-url').removeClass('circle-unshaded');
        $('.circle-url').addClass('circle-shaded');
        $('.circle-file').removeClass('circle-shaded');
        $('.circle-file').addClass('circle-unshaded');
    });

    $('#make-shaded-file').on('click', function() {
        $('#make-shaded-url').removeClass('shaded');
        $('#make-shaded-url').addClass('unshaded');
        $('#make-shaded-file').removeClass('unshaded');
        $('#make-shaded-file').addClass('shaded');
        $('.circle-file').removeClass('circle-unshaded');
        $('.circle-file').addClass('circle-shaded');
        $('.circle-url').removeClass('circle-shaded');
        $('.circle-url').addClass('circle-unshaded');
    });

    $('#file, #url').on('change', function() {
        $('#video-error').css('display','none');
        $('#file').css('color','#333');
    });
});
</script>
