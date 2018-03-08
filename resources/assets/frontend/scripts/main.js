jQuery(document).ready(function(){
    var browserheight = window.innerHeight;
    $('#video').css('height', browserheight+'px');

    var first_nav_pos = $('#nav').position();
    var second_nav_pos = $('.second-navigation').position();
    var second_nav_height = $('.second-navigation').outerHeight();
    var hide_nav_position = browserheight - second_nav_height;

    $(window).scroll(function(e){
        if(window.pageYOffset > hide_nav_position){
            $('#nav').hide();
        }else{
            $('#nav').show();
        }
    });
});