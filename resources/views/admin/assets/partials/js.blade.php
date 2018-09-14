<script type="text/javascript">
$(document).ready(function(){
    // TAGS
    var tagnames = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url: '/tags',
            filter: function(list) {
                return $.map(list, function(tagname) {
                    return { name: tagname }; });
            }
        }
    });
    tagnames.initialize();

    $('#tags').tagsinput({
        typeaheadjs: [{
            minLength: 1,
            highlight: true,
        },{
            minlength: 1,
            name: 'tagnames',
            displayKey: 'name',
            valueKey: 'name',
            source: tagnames.ttAdapter()
        }],
        freeInput: true,
        allowDuplicates: false
    });

    $('#tags').on('beforeItemAdd', function(event) {
        var tagsArray = $('#tags').val().split(",");
        var tagsCheck = false;
        event.item = event.item.toLowerCase();
        if(!event.item) {
            event.cancel = true;
        }
        for (i=0;i<tagsArray.length;i++){
            if(tagsArray[i].trim()==event.item){
                tagsCheck = true;
                $('.tt-input valid').val('');
                event.cancel = true;
            }
        }
    });

    $('#tags').on('itemRemoved', function(event) {
        console.log(event.item);
        if(event.item) {
            $('a[title="'+event.item+'"]').css('background', '#666');
            $('#video-analysis-tag-added').html('');
        }
    });
    // TAGS --->

    $("#sendContract").click(function () {
        $("#sendContract").attr("disabled", true);
    });

    $("#saveStory").click(function (e) {
        e.preventDefault();
        $('#js-story-form').submit();
    });

    $('#sourced_at').datetimepicker({
        // format: 'YYYY-MM-DD HH:MM:SS'
    });

    $('#duration').mask('00:00:00');


    // LISTENERS
    $('.js-video-init').click(function(e) {
        var videoId = $(this).parent('div').attr('data-id');
        var video = $('#card-video-'+videoId);
        $('#card-video-img-'+videoId).hide();
        $('#card-video-span-'+videoId).hide();
        video.show();
        video.attr('class', 'video-js vjs-default-skin vjs-big-play-centered');
        var myPlayer = videojs("card-video-"+videoId, {}, function(){
            // Player (this) is initialized and ready.
            var myPlayer = this;    // Store the video object
            var aspectRatio = 9/16; // Make up an aspect ratio

            function resizeVideoJS(){
                // Get the parent element's actual width
                var width = $('.video-container')[0].offsetWidth;
                // Set width to fill parent element, Set height
                myPlayer.width(width).height( width * aspectRatio );
            }

            resizeVideoJS(); // Initialize the function
            window.onresize = resizeVideoJS; // Call the function on resize

            myPlayer.play();
        });
    });

    $('.js-state').click(function(e){
        e.preventDefault();
        var state, alertType;
        var videoId = $(this).attr("data-id");
        var myClass = $(this).attr("class");

        console.log($(this));

        switch (true) {
            case /accepted/.test(myClass):
                state = 'accepted';
                alertType = 'success';
                break;
            case /licensed/.test(myClass):
                state = 'licensed';
                alertType = 'success';
                break;
            case /licensed/.test(myClass):
                state = 'restricted';
                alertType = 'warning';
                break;
            case /licensed/.test(myClass):
                state = 'problem';
                alertType = 'error';
                break;
            case /rejected/.test(myClass):
                state = 'rejected';
                alertType = 'error';
                break;
        }

        $(this).removeClass('js-state');

        swal({  title: 'loading..', icon: 'info', buttons: true, closeModal: true, closeOnClickOutside: false, closeOnEsc: false });
        $('.swal-button-container').css('display','none');

        if(state && videoId) {
            // console.log(state);
            $.ajax({
                type: 'GET',
                url: '/admin/videos/status/'+state+'/'+videoId,
                data: {},
                dataType: 'json',
                success: function (data) {
                    if(data.status=='success') {
                        if(data.remove=='yes'){
                            $('#asset-'+videoId).fadeOut();
                            $('#asset-'+videoId).remove();
                        }
                        swal({  title: data.message, icon: alertType, buttons: true, closeModal: true, closeOnClickOutside: true, closeOnEsc: true, buttons: { cancel: false, confirm: true } });
                        $('.swal-button-container').css('display','inline-block');
                    } else {
                        $('.swal-button-container').css('display','inline-block');
                    }
                }
            });
        }
    });

    $('.js-state-accept').click(function(e){
        e.preventDefault();
        var dataUrl = $(this).attr('href');
        var parseUrl = dataUrl.split('/');
        var state = parseUrl[6];
        var videoId = parseUrl[7];
        var alertType;

        $(this).removeAttr("href");

        swal({  title: 'loading..', icon: 'info', buttons: true, closeModal: true, closeOnClickOutside: false, closeOnEsc: false });
        $('.swal-button-container').css('display','none');

        if(dataUrl) {
            $.ajax({
                type: 'GET',
                url: dataUrl,
                data: { get_param: 'value' },
                dataType: 'json',
                success: function (data) {
                    if(data.status=='success') {
                        swal({  title: data.message, icon: 'success', buttons: true, closeModal: true, closeOnClickOutside: false, closeOnEsc: false, buttons: { cancel: false, confirm: true } }).then(() => {
                            //location.reload();
                            window.location.href = '/admin/videos/edit/'+data.video_alpha_id+'/?previous_state='+data.previous_state;
                        });

                        $('.swal-button-container').css('display','inline-block');
                    }
                }
            });
        }
    });

    $('.js-asset-update').change(function(e) {
        e.preventDefault();

        var assetId = $(this).attr("data-id");
        var assetType = $(this).attr("data-asset-type");
        var fieldId = $(this).attr("id");
        var fieldValue = $(this).val();

        if( assetId && fieldId && fieldValue ) {
            $.ajax({
                type: 'POST',
                url: '/admin/asset/update_field',
                data: { story_id: assetId, field_id: fieldId, field_value: fieldValue },
                dataType: 'json',
                success: function (data) {
                    // console.log('field: '+data.field_id+' | value: '+data.field_value+' | story: '+data.story_id);
                    if(data.status=='success') {
                        $('#asset-update-'+data.story_alpha_id).show().delay(2000).fadeOut('medium');
                        if(data.field_id=='priority') {
                            if(data.field_value=='high'){
                                $('#asset-'+data.story_alpha_id+' .album').removeClass('warning');
                                $('#asset-'+data.story_alpha_id+' .album').addClass('danger', 1000);
                            }else if(data.field_value=='medium'){
                                $('#asset-'+data.story_alpha_id+' .album').removeClass('danger');
                                $('#asset-'+data.story_alpha_id+' .album').addClass('warning', 1000);
                            } else {
                                $('#asset-'+data.story_alpha_id+' .album').removeClass('danger warning', 1000);
                            }
                        }
                        if(data.field_id=='state') {
                            window.location.reload();
                        }
                    } else {
                        $('#asset-update-error-'+data.story_alpha_id).show().delay(2000).fadeOut('medium');
                    }
                }
            });
        }
    });

    $('.js-story-state').click(function(e){
        e.preventDefault();
        var state, alertType;
        var storyId = $(this).attr("data-id");
        var myClass = $(this).attr("class");

        switch (true) {
            case /unapproved/.test(myClass):
                state = 'unapproved';
                alertType = 'info';
                break;
            case /unlicensed/.test(myClass):
                state = 'unlicensed';
                alertType = 'error';
                break;
            case /licensing/.test(myClass):
                state = 'licensing';
                alertType = 'info';
                break;
            case /licensed/.test(myClass):
                state = 'licensed';
                alertType = 'success';
                break;
            case /hacks-unassigned/.test(myClass):
                state = 'hacks-unassigned';
                alertType = 'warning';
                break;
            case /writing-inprogress/.test(myClass):
                state = 'writing-inprogress';
                alertType = 'info';
                break;
            case /writing-completed/.test(myClass):
                state = 'writing-completed';
                alertType = 'success';
                break;
            case /subs-unassigned/.test(myClass):
                state = 'subs-unassigned';
                alertType = 'warning';
                break;
            case /subs-inprogress/.test(myClass):
                state = 'subs-inprogress';
                alertType = 'info';
                break;
            case /subs-approved/.test(myClass):
                state = 'subs-approved';
                alertType = 'success';
                break;
            case /subs-rejected/.test(myClass):
                state = 'subs-rejected';
                alertType = 'error';
                break;
            case /published/.test(myClass):
                state = 'published';
                alertType = 'success';
                break;
            case /approved/.test(myClass):
                state = 'approved';
                alertType = 'success';
                break;
            case /purgatory/.test(myClass):
                state = 'purgatory';
                alertType = 'error';
                break;
            case /rejected/.test(myClass):
                state = 'rejected';
                alertType = 'error';
                break;
        }

        $(this).removeClass('js-story-state');
        $(this).attr("disabled", true);

        // swal({  title: 'loading..', icon: 'info', buttons: true, closeModal: true, closeOnClickOutside: false, closeOnEsc: false });
        // $('.swal-button-container').css('display','none');

        if(state && storyId) {
            console.log(state);
            $.ajax({
                type: 'GET',
                url: '/admin/stories/status/'+state+'/'+storyId,
                data: {},
                dataType: 'json',
                success: function (data) {
                    if(data.status=='success') {
                        if(data.remove=='yes'){
                            $('#asset-'+storyId).fadeOut();
                            $('#asset-'+storyId).remove();
                        } else {
                            window.location.reload();
                        }
                        // swal({  title: data.message, icon: alertType, buttons: true, closeModal: true, closeOnClickOutside: false, closeOnEsc: false, buttons: { cancel: false, confirm: true } });
                        // $('.swal-button-container').css('display','inline-block');
                    } else {
                        // $('.swal-button-container').css('display','inline-block');
                    }
                }
            });
        }
    });

    $('.js-story-refresh').click(function (e) {
        e.preventDefault();
        swal({
            title: 'Please wait while the stories update. This may take a few minutes.',
            icon: 'info',
            closeModal: false,
            closeOnClickOutside: false,
            closeOnEsc: false,
            buttons: {
                confirm: false,
                cancel: false,
            }
        });

        $('.swal-title').css('margin-bottom', '30px');

        var refreshUrl = '/admin/mailers/refresh';
        if (refreshUrl) {
            $('.js-story-refresh').css('display', 'none');
            $.ajax({
                type: 'GET',
                url: refreshUrl,
                data: {},
                dataType: 'json',
                success: function (data) {
                    if (data.dispatched == false) {
                        swal.close();
                        swal({
                            title: 'Stories are already up-to-date.',
                            icon: 'success',
                            closeModal: true,
                            closeOnClickOutside: true,
                            closeOnEsc: true
                        }).then(function() {
                            $('.js-story-refresh').css('display', 'block');
                        });
                    } else {
                        // jobs have been sent to queue so need to check the job queue
                        checkJobs();
                    }
                }
            });
        }
    });

    $('.js-story-add-video-button').click(function(e){ //on add input button click
        e.preventDefault();

        $('.js-video-inputs-wrapper').append('<div class="form-group input-group"><input type="text" class="form-control" placeholder="Search videos" /><input type="hidden" name="videos[]" /><span class="input-group-btn"><button class="js-remove-input btn btn-default"><i class="fa fa-times" aria-hidden="true"></i></button></span></div>');

        $('.js-video-inputs-wrapper').find('input[type=text]:last').autocomplete({
            source: '/admin/videos/autocomplete',
            minLength: 3,
            select: function(event, ui) {
                $(this).next().val(ui.item.id);
            }
        });
    });

    $('.js-story-show-asset').click(function (e) {
        e.preventDefault();
        var url = $.trim($(this).attr('href'));
        if(url!='#') {
            $('#story_asset_modal').modal('show');
            $('.modal .modal-content').css('overflow-y', 'auto');
            $('.modal .modal-content').css('background-color', '#000');
            $('.modal .modal-content').css('background-repeat', 'no-repeat');
            $('.modal .modal-content').css('background-position', '50% 50%');
            $('.modal .modal-content').css('background-image', 'url('+url+')');
            $('.modal .modal-dialogs').css('margin-top', '5%');
            $('.modal .modal-dialogs').css('width', '50%');
            $('.modal .modal-content').css('height', $(window).height() * 0.7+'px');
            $('#story_asset_modal_set_featured').val(url);
        }
    });

    $('.js-story-set-asset').click(function (e) {
        e.preventDefault();
        var url = $('#story_asset_modal_set_featured').val();
        $('#story_image_source').css('background-image', 'url('+url+')');
        $('#story_image_source_url').val(url);
        $('#story_asset_modal').modal('hide');
    });

    $('.js-story-get-source').change(function(e) {
        e.preventDefault();

        var storyId = $("#alpha_id").val();
        var url = $(this).val();

        if(url) {
            $.ajax({
                type: 'GET',
                url: '/admin/stories/get_source',
                data: { story_id: storyId, url: url },
                dataType: 'json',
                success: function (data) {
                    if(data.url) {
                        $('#story_image_source').css('background-image', 'url('+data.url+')');
                        $('#story_image_source_url').val(data.url);
                    }
                }
            });
        }
    });

    $('.js-story-show-source').click(function (e) {
        e.preventDefault();
        if($.trim($(this).attr("href"))!='#') {
            $('#sourceModal').modal('show')
            $("#sourceFrame").attr('src', $(this).attr("href"));
            $('.modal .modal-content').css('overflow-y', 'auto');
            $('.modal .modal-dialogs').css('width', '70%');
            $('.modal .modal-content').css('height', $(window).height() * 0.7+'px');
            $('#sourceFrame').css('height', $(window).height() * 0.7+'px');
        }
    });

    $('.js-problem-status').change(function(e) {
        e.stopPropagation();
        e.preventDefault();
        if($(this).val()) {
            $('#problem-box-status').removeClass('hidden').addClass('warning');
            $('#problem-box-status').text('Problem');
        } else {
            $('#problem-box-status').removeClass('warning').addClass('hidden');
        }
    });

    $('.js-video-inputs-wrapper').on("click",".js-remove-input",  function(e){ //user click on remove text
        e.preventDefault();
        $(this).parent().parent().remove();
    });
    // LISTENERS ------>



    // VALIDATE: js form validations >> Admin Create edit
    $('#video-form').validate({
        rules: {
            title: {
                required: true
            }
        },
        messages: {
            title: 'You must enter the video title',
            date_filmed: 'You must enter when the video was filmed',
            description: 'You must enter a short description or story behind the video'
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });

    //js form validations >> Admin Comment
    $('#comment-form').validate({
        rules: {
            comment: {
                required: true
            }
        },
        messages: {
            comment: 'You must enter a comment first'
        }
    });

    $('#js-story-form').validate({
        rules: {
            title: {
                required: true
            },
            contact: {
                required: true
            },
        },

        messages: {
            title: 'Please enter a story title',
            contact: 'Please add a contact'
        },

        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        },
    });

    $('#sniffr-create-contact').validate({
        rules: {
            full_name: {
                required: true
            },
            email: {
                email: true
            },
        },

        messages: {
            full_name: 'Please enter your full named',
            email: 'Please enter a valid email'
        },

        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        },

        submitHandler: function(form) {
            $.ajax({
                url: form.action,
                type: form.method,
                data: $(form).serialize(),
                success: function(response) {
                    var contact = response.contact_email ? response.contact_email : response.contact_name;
                    $('#js-autocomplete-contact').val(contact);
                    $('#js-contact-id').val(response.contact_id);
                    $('#add_contact_modal').modal('hide');
                },
                error: function(response){
                    alert(response.responseJSON.errors.email[0]);
                }
            });
        }
    });
    // VALIDATE ----->

    function checkJobs() {
        setTimeout(function() {
            $.ajax({
                type: 'GET',
                url: '/admin/mailers/checkjobs',
                data: {},
                dataType: 'json',
                success: function (data) {
                    if (data.jobs == 0) {
                        swal.close();
                        swal({
                            title: 'Stories are now up-to-date.',
                            icon: 'success',
                            closeModal: true,
                            closeOnClickOutside: true,
                            closeOnEsc: true
                        }).then(function() {
                            window.location.reload();
                        });
                    } else {
                        // jobs are still in the queue, so run again
                        checkJobs();
                    }
                }
            });
        }, 500);
    }

    // var mapPlacepicker = $(".placepicker").placepicker({placeChanged: function(place) {
    // 	var location_value = place.formatted_address +" Latitude" +this.getLocation().latitude + " Longitude" + this.getLocation().longitude;
    //
    // }});
    //
    // $(".placepicker").each(function() {
    // 	var target = this;
    // 	var $collapse = $(this).parents('.form-group').next('.collapse');
    // 	var $map = $collapse.find('.another-map-class');
    // 	var placepicker = $(this).placepicker({
    // 		map: $map.get(0),
    //
    // 	}).data('placepicker');
    // });
});
</script>