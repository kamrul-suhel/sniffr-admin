$('document').ready(function(){
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

    $('.terms-copy').on('click',function(){
        $('#terms').attr("checked", !$('#terms').attr("checked"));
    });

    //js form validations >> Video upload
    $('#upload-form').validate({
        groups: {  // consolidate messages into one
            names: 'file url'
        },
        rules: {
            full_name: {
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
            full_name: 'You must enter your full name',
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
                error.appendTo('.terms-copy');
            }else{
                error.insertBefore(element);
            }
        },
        successHandler: function() {
            alert('valid!');
        }
    });

    function errorMessage() {
        $('#dim-screen').hide();
        swal({
            title: 'Dammit! Something went wrong',
            icon: 'error',
            buttons: {
                cancel: 'Try again',
                alert: {
                    text: 'Report issue',
                    value: 'alert'
                }
            },
            closeModal: true,
            closeOnClickOutside: true
        })
        .then((value) => {
            if(value=='alert') {
                $.ajax({
                    type: 'GET',
                    url: '/issue/upload-form',
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if(data.status=='success') {
                            swal({ title: 'Thanks! Our staff have been alerted', closeModal: false });
                        }
                    }
                });
            }
        });
    }

    $("#upload-form").on('submit', function(e){
        e.preventDefault();

        var validator = $(this).validate();
        validator.form();

        if(validator.valid()){
            $('#dim-screen').show().css('display','flex');

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
                         errorMessage();
                    }
                },
                error: function(data){
                    errorMessage();
                    //console.log('There was an error uploading your video');
                }
            });
        }
    });

    // make video url or file area shaded/unshaded
    // $('#make-shaded-url').on('click', function() {
    //     $('#make-shaded-file').removeClass('shaded');
    //     $('#make-shaded-file').addClass('unshaded');
    //     $('#make-shaded-url').removeClass('unshaded');
    //     $('#make-shaded-url').addClass('shaded');
    //     $('.circle-url').removeClass('circle-unshaded');
    //     $('.circle-url').addClass('circle-shaded');
    //     $('.circle-file').removeClass('circle-shaded');
    //     $('.circle-file').addClass('circle-unshaded');
    // });

    // $('#make-shaded-file').on('click', function() {
    //     $('#make-shaded-url').removeClass('shaded');
    //     $('#make-shaded-url').addClass('unshaded');
    //     $('#make-shaded-file').removeClass('unshaded');
    //     $('#make-shaded-file').addClass('shaded');
    //     $('.circle-file').removeClass('circle-unshaded');
    //     $('.circle-file').addClass('circle-shaded');
    //     $('.circle-url').removeClass('circle-shaded');
    //     $('.circle-url').addClass('circle-unshaded');
    // });

    $('#file, #url').on('change', function(e) {
        $('#video-error').css('display','none');
        $('#file').css('color','#333');
        var target =  $( e.target );
        if(target.is('#file')){
            $('#filename').html($('#file').prop('files')[0].name);
        }
    });

});
