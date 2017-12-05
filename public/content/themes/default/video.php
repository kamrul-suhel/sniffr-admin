<?php include('includes/header.php'); ?>
	<div id="video_title">
		<div class="container">
			<span class="label">You're watching:</span> <h1><?= $video->title ?></h1>
		</div>
	</div>

	<div id="video_bg">
		<div class="container text-center">
			<?php if($video->access == 'guest' || ( ($video->access == 'subscriber' || $video->access == 'registered') && !Auth::guest() ) || (!Auth::guest() && (Auth::user()->role == 'demo' || Auth::user()->role == 'admin')) || (!Auth::guest() && $video->access == 'registered' && $settings->free_registration && Auth::user()->role == 'registered') ): ?>
				<div id="video_container" class="fitvid">
				<?php if($key = $video->getKey()): ?>
					<iframe width="560" height="315" src="https://www.youtube.com/embed/<?php echo $key; ?>" frameborder="0" allowfullscreen></iframe>
				<?php elseif(str_contains($video->url,'facebook')): ?>
					<div class="fb-video" data-href="<?php echo $video->url; ?>" data-allowfullscreen="true"></div>
				<?php elseif($video->url): ?>
					<h1>We need to handle videoi urls (that aren't youtube)</h1>
				<?php elseif($video->embed_code): ?>
					<?= $video->embed_code ?>
				<?php elseif($video->file): ?>
					<video id="video_player" class="video-js vjs-default-skin" controls preload="auto" poster="<?= Config::get('site.uploads_url') . 'images/' . $video->image ?>" data-setup="{}" width="100%" style="width:100%;">
						<source src="<?php echo $video->file; ?>" type='video/mp4'>
						<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
					</video>
				<?php endif; ?>
			<?php else: ?>
				<div id="subscribers_only">
					<h2>Sorry, this video is only available to <?php if($video->access == 'subscriber'): ?>Subscribers<?php elseif($video->access == 'registered'): ?>Registered Users<?php endif; ?></h2>
					<div class="clear"></div>
					<?php if(!Auth::guest() && $video->access == 'subscriber'): ?>
						<form method="get" action="/user/<?= Auth::user()->username ?>/upgrade_subscription">
							<button id="button">Become a subscriber to watch this video</button>
						</form>
					<?php else: ?>
						<form method="get" action="/signup">
							<button id="button">Signup Now <?php if($video->access == 'subscriber'): ?>to Become a Subscriber<?php elseif($video->access == 'registered'): ?>for Free!<?php endif; ?></button>
						</form>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>
	</div>

	<div class="container video-details">
		<h3>
			<?= $video->title ?>
			<span class="view-count"><i class="fa fa-eye"></i> <?php if(isset($view_increment) && $view_increment == true ): ?><?= $video->views + 1 ?><?php else: ?><?= $video->views ?><?php endif; ?> Views </span>
			<div class="favorite btn btn-default <?php if(isset($favorited->id)): ?>active<?php endif; ?>" data-authenticated="<?= !Auth::guest() ?>" data-videoid="<?= $video->id ?>"><i class="fa fa-heart"></i> Favorite</div>
		</h3>

		<div class="video-details-container"><?= $video->details ?></div>

		<div class="clear"></div>

		<h2 id="tags">Tags:
		<?php foreach($video->tags as $key => $tag): ?>
			<span><a href="/videos/tag/<?= $tag->name ?>"><?= $tag->name ?></a></span><?php if($key+1 != count($video->tags)): ?>,<?php endif; ?>
		<?php endforeach; ?>
		</h2>

		<div class="clear"></div>
		<div id="social_share">
	    	<p>Share This Video:</p>
			<?php include('partials/social-share.php'); ?>
		</div>

		<div><p></p></div>

		<div class="clear"></div>

	</div>

	<script src="<?= THEME_URL . '/assets/js/jquery.fitvid.js'; ?>"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$('#video_container').fitVids();
			$('.favorite').click(function(){
				if($(this).data('authenticated')){
					$.post('/favorite', { video_id : $(this).data('videoid'), _token: '<?= csrf_token(); ?>' }, function(data){});
					$(this).toggleClass('active');
				} else {
					window.location = '/signup';
				}
			});
		});
	</script>

	<!-- RESIZING FLUID VIDEO for VIDEO JS -->
	<script type="text/javascript">
	  // Once the video is ready
	  videojs("video_player").ready(function(){

	    var myPlayer = this;    // Store the video object
	    var aspectRatio = 9/16; // Make up an aspect ratio

	    function resizeVideoJS(){
	    	console.log(myPlayer.id);
	      	// Get the parent element's actual width
	      	var width = document.getElementById('video_container').offsetWidth;
	      	// Set width to fill parent element, Set height
	      	myPlayer.width(width).height( width * aspectRatio );
	    }

	    resizeVideoJS(); // Initialize the function
	    window.onresize = resizeVideoJS; // Call the function on resize
	  });
	</script>

	<script src="<?= THEME_URL . '/assets/js/rrssb.min.js'; ?>"></script>

	<script>(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.11&appId=151068855526504';
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>
<?php include('includes/footer.php'); ?>
