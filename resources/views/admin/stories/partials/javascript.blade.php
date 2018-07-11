@section('javascript')

<!-- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAuut3P8ipXPBhj93RZiymyThtzovaswws&libraries=places"></script>
<script type="text/javascript" src="https://benignware.github.io/jquery-placepicker/js/jquery.placepicker.min.js"></script> -->

<script type="text/javascript">

$ = jQuery;

$(document).ready(function(){
    $('.js-contact-is-owner').click(function(e){
        if ($(this).is(':checked')) {
            $('#owner-status').html('<h5 class="text-success"><i class="fa fa-check-square-o"></i> Contact is owner </h5>');
        } else {
            $('#owner-status').html('<h5 class="text-danger"><i class="fa fa-square-o"></i> Owner pending </h5>');
        }
    });

    $('.js-allow-publish').click(function(e){
        if ($(this).is(':checked')) {
            $('#publish-status').html('<h5 class="text-success"><i class="fa fa-check-square-o"></i> Happy to publish </h5>');
        } else {
            $('#publish-status').html('<h5 class="text-danger"><i class="fa fa-square-o"></i> Publication status pending </h5>');
        }
    });

    $('.js-permission').click(function(e){
        if ($(this).is(':checked')) {
            $('#permission-status').html('<h5 class="text-success"><i class="fa fa-check-square-o"></i> Has permission </h5>');
        } else {
            $('#permission-status').html('<h5 class="text-danger"><i class="fa fa-square-o"></i> Permission pending </h5>');
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

    $('#sourced_at').datetimepicker({
        // format: 'YYYY-MM-DD HH:MM:SS',
        defaultDate: @if(!empty($story->sourced_at)) '{{ $story->sourced_at }}' @else $.now() @endif
    });

    $("#sendContract").click(function () {
        $("#sendContract").attr("disabled", true);
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

    tinymce.init({
        relative_urls: false,
        selector: '#description',
        toolbar: "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview media | forecolor backcolor | code",
        plugins: [
             "advlist autolink link image code lists charmap print preview hr anchor pagebreak spellchecker code fullscreen",
             "save table contextmenu directionality emoticons template paste textcolor code"
       ],
       menubar:false,
     });

});

</script>

@stop
