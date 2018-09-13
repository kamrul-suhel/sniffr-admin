<script type="text/javascript">
    function clickAndDisable(link) {
        link.onclick = function(event) {
            event.preventDefault();
        }
    }
    $(document).ready(function(){
        $("#sendContract").click(function () {
            $("#sendContract").attr("disabled", true);
        });

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
    });

    //video analysis function for labels from dynamodb API
    function videoAnalysis(tempFile) {

       if(tempFile) {
           //initialize video analysis + message
           $("#video-analysis").html('<p>Analysing video<span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></p>');

           //copy over video file for analysis (this is now executed when video accepted)
           // $.ajax({
            //    type: 'GET',
            //    url: '/admin/analyse/?f='+tempFile,
            //    data: { get_param: 'value' },
            //    dataType: 'json',
            //    success: function (data) {
            // 	   if(data.status=='success') {
            // 		   //do nothing at the moment
            // 	   }
            //    }
           // });

           //wait 2 seconds for analysis and then get the video labels (if available)
           timeout = setTimeout(function(){
               $.ajax({
                   type: 'GET',
                   url: '/admin/labels/?f='+tempFile,
                   data: { get_param: 'value' },
                   dataType: 'json',
                   success: function (data) {
                       if(data.status=='success') {
                           $("#video-analysis").html('<p>Suggested Tags: <span id="video-analysis-tag-added"></span> </p>');
                           for(var i=0;i<data.labels.length;i++) {
                                var label_output='<a href="#" title="'+data.labels[i]['Name'].toLowerCase()+'" class="tag label label-info copy-tag">'+data.labels[i]['Name'].toLowerCase()+'</a> ';
                                $("#video-analysis").append(label_output);
                           }
                           if(data.labels.length>0) {
                               $('.copy-tag').click(function(e){
                                   e.preventDefault();
                                   var tag = $(this).attr('title');
                                   $('#tags').tagsinput('add', tag);
                                   $('#video-analysis-tag-added').html(tag+' tag added. You can also add your own tags if you like.');
                                   $(this).css('background', '#337ab7');
                               });
                           }
                       } else {
                           //$('#video-analysis').css('display','none');
                           $("#video-analysis").html('<p>No suggested tags found but you can still add your own <span id="video-analysis-tag-added"></span> </p>');
                       }
                   }
               });
           }, 2000);
       }

    }

(function($){
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

    $('#duration').mask('00:00:00');

    $('#type').change(function(){
        if($(this).val() == 'file'){
            $('.new-video-file').show();
            $('.new-video-embed').hide();
            $('.new-video-url').hide();
        }else if($(this).val() == 'embed'){
            $('.new-video-embed').show();
            $('.new-video-file').hide();
            $('.new-video-url').hide();
        }else{
            $('.new-video-url').show();
            $('.new-video-embed').hide();
            $('.new-video-file').hide();
        }
    });

    $('.js-state').click(function(e){
        e.preventDefault();
        var state, alertType;
        var videoId = $(this).attr("data-id");
        var myClass = $(this).attr("class");

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

        if(state&&videoId) {
            // console.log(state);
            $.ajax({
                type: 'GET',
                url: '/admin/videos/status/'+state+'/'+videoId,
                data: {},
                dataType: 'json',
                success: function (data) {
                    if(data.status=='success') {
                        if(data.remove=='yes'){
                            $('#video-'+videoId).fadeOut();
                            $('#video-'+videoId).remove();
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

     //js form validations >> Admin Create edit
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

    //execute video analysis onload
    // var dataFile = $('#temp_filename').val();
    // var dataState = $('#temp_state').val();
    // console.log(dataFile);
    // console.log(dataState);
    // if(dataFile!=null&&dataState!='new'){
    //     videoAnalysis(dataFile);
    // }


})(jQuery);
</script>
