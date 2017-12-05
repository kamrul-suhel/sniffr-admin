<?php include('includes/header.php'); ?>

<div id="home-hero" class="vidbg-box" data-vidbg-bg="mp4: /content/themes/default/assets/video/ocean.mp4, webm: /content/themes/default/assets/video/ocean.webm, poster: /content/themes/default/assets/video/ocean.jpg"
  data-vidbg-options="loop: true, muted: true">
	<div id="dim-bg">
		<div class="container home-titles">
			<h1>Video Licensing Platform</h1>
			<h4>License viral videos viewed by millions around the world from UNILAD</h4>
			<?php if(Auth::guest()): ?>
				<button class="btn btn-primary" onClick="window.location='/signup'" href="/signup">View latest videos</button>
			<?php else: ?>
				<button class="btn btn-primary" onClick="window.location='/videos'" href="/videos">View latest videos</button>
			<?php endif; ?>
		</div>
	</div>
</div>

<div class="container">
	<div id="home-content">
		<h3>Checkout our Latest Videos Below</h3>
		<div class="row">
			<?php include('partials/video-loop.php'); ?>
		</div>
	</div>

	<?php include('partials/pagination.php'); ?>
</div>


<script type="text/javascript" src="<?= THEME_URL . '/assets/js/jquery.vidbg.min.js'; ?>"></script>
<!-- <script>
	$(document).ready(function(){
		$("#home-hero").bgswitcher({
		  images: ["<?= THEME_URL ?>/assets/img/home/1.jpg", "<?= THEME_URL ?>/assets/img/home/2.jpg", "<?= THEME_URL ?>/assets/img/home/3.jpg", "<?= THEME_URL ?>/assets/img/home/4.jpg"], // Background images
		  effect: "fade", // fade, blind, clip, slide, drop, hide
		  interval: 4200,
		  duration:1000
		});
	});
</script> -->

<?php include('includes/footer.php'); ?>
