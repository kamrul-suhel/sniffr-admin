<!-- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAuut3P8ipXPBhj93RZiymyThtzovaswws&libraries=places"></script>
<script type="text/javascript" src="https://benignware.github.io/jquery-placepicker/js/jquery.placepicker.min.js"></script> -->

<script type="text/javascript">
$(document).ready(function(){
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

    $("#saveStory").click(function (e) {
        e.preventDefault();
        $('#js-story-form').submit();
    });

    $('#sourced_at').datetimepicker({
        // format: 'YYYY-MM-DD HH:MM:SS',
        defaultDate: @if(!empty($story->sourced_at)) '{{ $story->sourced_at }}' @else $.now() @endif
    });

    $("#sendContract").click(function () {
        $("#sendContract").attr("disabled", true);
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

        if(state&&storyId) {
            console.log(state);
            $.ajax({
                type: 'GET',
                url: '/admin/stories/status/'+state+'/'+storyId,
                data: {},
                dataType: 'json',
                success: function (data) {
                    if(data.status=='success') {
                        if(data.remove=='yes'){
                            $('#story-'+storyId).fadeOut();
                            $('#story-'+storyId).remove();
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

    $('.js-story-update').change(function(e) {
        e.preventDefault();

        var storyId = $(this).attr("data-id");
        var fieldId = $(this).attr("id");
        var fieldValue = $(this).val();

        if( storyId && fieldId && fieldValue ) {
            $.ajax({
                type: 'GET',
                url: '/admin/stories/update_field',
                data: { story_id: storyId, field_id: fieldId, field_value: fieldValue },
                dataType: 'json',
                success: function (data) {
                    // console.log('field: '+data.field_id+' | value: '+data.field_value+' | story: '+data.story_id);
                    if(data.status=='success') {
                        $('#story-update-'+data.story_alpha_id).show().delay(2000).fadeOut('medium');
                        if(data.field_id=='priority') {
                            if(data.field_value=='high'){
                                $('#story-'+data.story_alpha_id+' .album').removeClass('warning');
                                $('#story-'+data.story_alpha_id+' .album').addClass('danger', 1000);
                            }else if(data.field_value=='medium'){
                                $('#story-'+data.story_alpha_id+' .album').removeClass('danger');
                                $('#story-'+data.story_alpha_id+' .album').addClass('warning', 1000);
                            } else {
                                $('#story-'+data.story_alpha_id+' .album').removeClass('danger warning', 1000);
                            }
                        }
                        if(data.field_id=='state') {
                            window.location.reload();
                            // if(data.field_value=='published') {
                            // 	$('#story-'+storyId).fadeOut();
                            // 	$('#story-'+storyId).remove();
                            // }
                        }
                    } else {
                        $('#story-update-error-'+data.story_alpha_id).show().delay(2000).fadeOut('medium');
                    }
                }
            });
        }
    });

    $('.js-submitted-to').change(function(e) {
        e.stopPropagation();
        e.preventDefault();
        var arr = $(this).val();
        if(arr.length>0) {
            if($.inArray('UNILAD', arr) !== -1) {
                $('#rights').val('exclusive');
                $('#rights-box-status').removeClass('danger').addClass('success');
                $('#rights-box-status').text('Exclusive');
                $('#rights-status').html('<h5 class="text-success"><i class="fa fa-check-square-o"></i> Exclusive rights </h5>');
            } else {
                $('#rights').val('');
                $('#rights-box-status').removeClass('success').removeClass('danger');
                $('#rights-box-status').text('Pending');
                $('#rights-status').html('<h5 class="text-danger"><i class="fa fa-square-o"></i> Rights status pending </h5>');
            }
            if(arr.length>1) {
                $('#submitted-status').html('<h5 class="text-success"><i class="fa fa-check-square-o"></i> Submitted to multiple </h5>');
                $('#rights').val('non-exclusive');
                $('#rights-box-status').removeClass('success').addClass('danger');
                $('#rights-box-status').text('Non-Exclusive');
                $('#rights-status').html('<h5 class="text-warning"><i class="fa fa-check-square-o"></i> Non-Exclusive rights </h5>');
            } else {
                $('#submitted-status').html('<h5 class="text-success"><i class="fa fa-check-square-o"></i> Submitted to '+arr[0].replace('-', ' ')+' </h5>');
            }
        } else {
            $('#submitted-status').html('<h5 class="text-danger"><i class="fa fa-square-o"></i> Submitted to pending </h5>');
        }
    });

    $('.js-permission').click(function(e){
        if ($(this).is(':checked')) {
            $('#permission-status').html('<h5 class="text-success"><i class="fa fa-check-square-o"></i> Has permission </h5>');
        } else {
            $('#permission-status').html('<h5 class="text-danger"><i class="fa fa-square-o"></i> Permission pending </h5>');
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

    $('.js-allow-publish').click(function(e){
        if ($(this).is(':checked')) {
            $('#publish-status').html('<h5 class="text-success"><i class="fa fa-check-square-o"></i> Happy to publish </h5>');
        } else {
            $('#publish-status').html('<h5 class="text-danger"><i class="fa fa-square-o"></i> Publication status pending </h5>');
        }
    });

    $('.js-contact-is-owner').click(function(e){
        if ($(this).is(':checked')) {
            $('#owner-status').html('<h5 class="text-success"><i class="fa fa-check-square-o"></i> Contact is owner </h5>');
        } else {
            $('#owner-status').html('<h5 class="text-danger"><i class="fa fa-square-o"></i> Owner pending </h5>');
        }
    });

    $('.add-video-button').click(function(e){ //on add input button click
        e.preventDefault();

        $('.video-inputs-wrapper').append('<div class="form-group input-group"><input type="text" class="form-control" placeholder="Search videos" /><input type="hidden" name="videos[]" /><span class="input-group-btn"><button class="js-remove-input btn btn-default"><i class="fa fa-times" aria-hidden="true"></i></button></span></div>');

        $('.video-inputs-wrapper').find('input[type=text]:last').autocomplete({
            source: '/admin/videos/autocomplete',
            minLength: 3,
            select: function(event, ui) {
                $(this).next().val(ui.item.id);
            }
        });
    });

    $('.js-rights-status').change(function(e) {
        if($(this).val()=='exclusive') {
            $('#rights-box-status').removeClass('danger').addClass('success');
            $('#rights-box-status').text('Exclusive');
            $('#rights-status').html('<h5 class="text-success"><i class="fa fa-check-square-o"></i> Exclusive rights </h5>');
        }
        if($(this).val()=='non-exclusive') {
            $('#rights-box-status').removeClass('success').addClass('danger');
            $('#rights-box-status').text('Non-Exclusive');
            $('#rights-status').html('<h5 class="text-warning"><i class="fa fa-check-square-o"></i> Non-Exclusive rights </h5>');
        }
        if(!$(this).val()) {
            $('#rights-box-status').removeClass('success').removeClass('danger');
            $('#rights-box-status').text('Pending');
            $('#rights-status').html('<h5 class="text-danger"><i class="fa fa-square-o"></i> Rights status pending </h5>');
        }
    });

    $('.video-inputs-wrapper').on("click",".js-remove-input",  function(e){ //user click on remove text
        e.preventDefault();
        $(this).parent().parent().remove();
    });

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
