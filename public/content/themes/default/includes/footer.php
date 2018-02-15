		</div>

		<footer>
			<div class="container">
				<div class="footer-wrapper">
					<div class="footer-copy">
						<h3><?php echo $settings->website_name; ?></h3>
						<p>Sniffr is your Video Licensing Platform. Browse our huge catalogue of videos.</p>
					</div>

					<div class="icons-social">
						<?php if($settings->facebook_page_id): ?><a href="http://facebook.com/<?php echo $settings->facebook_page_id; ?>" target="_blank" class="facebook social-link"><i class="fa fa-facebook"></i></a><?php endif; ?>
						<?php if($settings->twitter_page_id): ?><a href="http://twitter.com/<?php echo $settings->twitter_page_id; ?>" target="_blank" class="twitter social-link"><i class="fa fa-twitter"></i></a><?php endif; ?>
						<?php if($settings->google_page_id): ?><a href="http://plus.google.com/<?php echo $settings->google_page_id; ?>" target="_blank" class="google social-link"><i class="fa fa-google-plus"></i></a><?php endif; ?>
						<?php if($settings->youtube_page_id): ?><a href="http://youtube.com/<?php echo $settings->youtube_page_id; ?>" target="_blank" class="youtube social-link"><i class="fa fa-youtube"></i></a><?php endif; ?>
					</div>
				</div>

				<hr />
				<p class="copyright">Copyright &copy; <?= date('Y'); ?> <?= $settings->website_name; ?></p>
			</div>
		</footer>
	</div>

	<script type="text/javascript">

	$('document').ready(function(){
		//previous code for right side admin dropdown (if logged in)
		$('.dropdown').hover(function(){
			$(this).addClass('open');
		}, function(){
			$(this).removeClass('open');
		});

		//previous code so looks like something for nav menu
	    $('#nav-toggle').click(function(){
			$(this).toggleClass('active');
			$('.navbar-collapse').toggle();
			$('body').toggleClass('nav-open');
	    });

	    $('#mobile-subnav').click(function(){
	    	if($('.second-nav .navbar-left').css('display') == 'block'){
	    		$('.second-nav .navbar-left').slideUp(function(){
	    			$(this).addClass('not-visible');
	    		});
	    		$(this).html('<i class="fa fa-bars"></i> Open Submenu');
	    	} else {
	    		$('.second-nav .navbar-left').slideDown(function(){
	    			$(this).removeClass('not-visible');
	    		});
	    		$(this).html('<i class="fa fa-close"></i> Close Submenu');
	    	}
	    });
	});

	/********** LOGIN MODAL FUNCTIONALITY **********/
	var loginSignupModal = $('<div class="modal fade" id="loginSignupModal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="myModalLabel">Login Below</h4></div><div class="modal-body"></div></div></div></div>');

	$(document).ready(function(){
		// Load the Modal Window for login signup when they are clicked
		$('.login-desktop a').click(function(e){
			e.preventDefault();
			$('body').prepend(loginSignupModal);
			$('#loginSignupModal .modal-body').load($(this).attr('href') + '?redirect=' + document.URL + ' .form-signin', function(){
				$('#loginSignupModal').show(200, function(){
					setTimeout(function() { $('#email').focus() }, 300);
				});

				$('#loginSignupModal').modal();
			});

			// Be sure to remove the modal from the DOM after it is closed
			$('#loginSignupModal').on('hidden.bs.modal', function (e) {
		    	$('#loginSignupModal').remove();
			});
		});
	});
	/********** END LOGIN MODAL FUNCTIONALITY **********/
	</script>

	<?php if(isset($settings->google_tracking_id) && $settings->google_tracking_id != ''): ?>
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', '<?= $settings->google_tracking_id ?>', 'auto');
		ga('send', 'pageview');
	</script>
	<?php endif; ?>
	<script>(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.11&appId=151068855526504';
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	</script>
	<?php include('content/themes/default/includes/mousestats.php'); ?>
</body>
</html>
