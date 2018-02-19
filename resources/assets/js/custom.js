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

    $('.terms-copy').on('click',function(e){
        var selected_id = $(e.target).attr('data-attr');
        $('#'+selected_id).attr("checked", !$('#'+selected_id).attr("checked"));
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
                if($('#file').val()){
                    error.appendTo($('label[for=file]'));
                }else if($('#url').val()){
                    error.appendTo($('label[for=url]'));
                }else{
                    error.appendTo($('label[for=file]'));
                }
            }else if(element.is('#terms') ){
                error.appendTo('.terms-copy');
            }else{
                error.appendTo($('label[for='+element.attr('id')+']'));
            }
        },
        successHandler: function() {
            alert('valid!');
        }
    });

    //js form validations >> More details
    $('#details-form').validate({
        rules: {
            full_name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            date_filmed: {
                required: false
            },
            location: {
                required: false
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
            full_name: 'You must enter your full name',
            email: 'You must enter a valid email address',
            date_filmed: 'You must enter when the video was filmed',
            location: 'You must enter where the video was filmed',
            description: 'You must enter a short description or story behind the video',
            permission: 'You must confirm that you have permission from those who are featured in the video',
            submitted_elsewhere: 'You must select if you submitted the video elsewhere',
            submitted_where: 'You must enter where you submitted the video elsewhere',
            contact_is_owner: 'You must confirm you are the rightful owner',
            allow_publish: 'You must confirm you are happy to publish this video',
            is_exclusive: 'You must confirm you agree to this statement'
        },
        errorPlacement: function (error, element) {
            if(element.attr('name') == 'contact_is_owner') {
                error.appendTo('.terms-copy[data-attr=contact_is_owner]');
            } else if(element.attr('name') == 'allow_publish') {
                error.appendTo('.terms-copy[data-attr=allow_publish]');
            } else if(element.attr('name') == 'is_exclusive') {
                error.appendTo('.terms-copy[data-attr=is_exclusive]');
            } else if(element.attr('name') == 'permission') {
                error.appendTo('#permission_label');
            } else if(element.attr('name') == 'submitted_elsewhere') {
                error.appendTo('#submitted_elsewhere_label');
            } else {
                error.appendTo($('label[for='+element.attr('name')+']'));
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

    function errorMessage(data) {
        $('#dim-screen').hide();
        if(data&&data.responseJSON) {
            data.responseJSON.user_title = ($('#title').val()) ? $('#title').val() : '';
            data.responseJSON.user_email = ($('#email').val()) ? $('#email').val() : '';
            data.responseJSON.user_file = ($('#file').val()) ? $('#file').val() : '';
            data.responseJSON.user_url = ($('#url').val()) ? $('#url').val() : '';
            //console.log(data.responseJSON);
            $.ajax({
                type: 'POST',
                url: '/issue',
                dataType: 'json',
                data: data.responseJSON,
                success: function (data) {
                    //console.log(data);
                    // if(data.status=='success') {
                    //     swal({ title: 'Thanks! Our staff have been alerted', closeModal: false });
                    // }
                }
            });
        }

        swal({
            title: 'Dammit! Something went wrong. Our staff have been alerted',
            icon: 'error',
            buttons: {
                cancel: 'Try again'
            },
            closeModal: true,
            closeOnClickOutside: true
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
                         errorMessage(data);
                    }
                },
                error: function(data){
                    errorMessage(data);
                    //console.log('There was an error uploading your video');
                }
            });
        }
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
