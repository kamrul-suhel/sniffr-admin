<?php include('includes/header.php'); ?>

<div id="video_title">
	<div class="container">
		<span class="label">You're watching:</span> <h1><?= $video->title ?></h1>
	</div>
</div>

<div id="video_bg">
	<div class="container text-center">
		<?php if($video->access == 'guest' || ( ($video->access == 'subscriber' || $video->access == 'registered') && !Auth::guest() ) || (!Auth::guest() && (Auth::user()->role == 'demo' || Auth::user()->role == 'admin')) || (!Auth::guest() && $video->access == 'registered' && $settings['free_registration'] && Auth::user()->role == 'registered') ): ?>
			<?php echo \App\Libraries\VideoHelper::getVideoHTML($video, true); ?>
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
		<span class="pull-right">
			<span class="view-count"><i class="fa fa-eye"></i> <?php if(isset($view_increment) && $view_increment == true ): ?><?= $video->views + 1 ?><?php else: ?><?= $video->views ?><?php endif; ?> Views </span>
			<div class="favorite btn btn-default <?php if(isset($favorited->id)): ?>active<?php endif; ?>" data-authenticated="<?= !Auth::guest() ?>" data-videoid="<?= $video->id ?>"><i class="fa fa-heart"></i> Favorite</div>
			<?php if(Auth::user() && Auth::user()->role == 'client' && $video->file): ?><a href="/download/<?php echo $video->alpha_id; ?>" class="download btn btn-primary"><i class="fa fa-download"></i> Download</a><?php endif; ?>
		</span>
	</h3>

	<div class="video-details-container"><?= $video->details ?></div>

	<?php

	if(count($video->tags)): ?>
	<h2 id="tags">Tags:
	<?php foreach($video->tags as $key => $tag): ?>
		<span><a href="/videos/tag/<?= $tag->name ?>"><?= $tag->name ?></a></span><?php if($key+1 != count($video->tags)): ?>,<?php endif; ?>
	<?php endforeach; ?>
	</h2>
	<?php endif; ?>

	<!--div id="social_share">
    	<p>Share This Video:</p>
		<?php //include('partials/social-share.php'); ?>
	</div-->
</div>

<script src="/assets/admin/js/video.js"></script>
<script src="/assets/admin/js/videojs-vimeo.js"></script>

<script type="text/javascript">
	$(document).ready(function(){
		$('.favorite').click(function(){
			if($(this).data('authenticated')){
				$.post('/favorite', { video_id : $(this).data('videoid'), _token: '<?= csrf_token(); ?>' }, function(data){});
				$(this).toggleClass('active');
			} else {
				window.location = '/login';
			}
		});

        var massVideo = $('.video-js');
        for(var i = 0; i < massVideo.length; i++){
            videojs(massVideo[i]).ready(function(){
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
            });
        }

        TwitterWidgetsLoader.load(function(twttr) {
            var tweets = jQuery(".tweet");
            
            jQuery(tweets).each( function( t, tweet ) {
                var id = jQuery(this).attr('id');
                twttr.widgets.createVideo(id,tweet).then( function( el ) {
                    //console.log('Video added.');
                });
            });
        });
	});
</script>

<?php include('includes/footer.php'); ?>
