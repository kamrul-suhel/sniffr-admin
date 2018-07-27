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
