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
                    $('#dim-screen').hide();
                    alert('There was an error uploading your video');
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

    $('#file, #url').on('change', function(e) {
        $('#video-error').css('display','none');
        $('#file').css('color','#333');
        var target =  $( e.target );
        if(target.is('#file')){
            $('#filename').html($('#file').prop('files')[0].name);
        }
    });

});
