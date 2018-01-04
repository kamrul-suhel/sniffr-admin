
(function($){
	$('.ajax').click(function(e){
		e.preventDefault();
		url = $(this).attr('href');
		$('#main-admin-content').load(url);
	});

	function display_mobile_menu(){
    	if($(window).width() < 768){
    		$('.sidebar-collapsed').removeClass('sidebar-collapsed');
    	}
    }

	display_mobile_menu();

	$('.tlink').click(function(e){
		console.log(this);
		var alink = $(this).attr('href');
		if(alink){
			window.location.href = alink;
		}
	});

})(jQuery);
