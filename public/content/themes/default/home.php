<?php include('includes/header.php'); ?>

<div id="home-hero" class="vidbg-box">
    <video src="/assets/video/ocean.mp4" autoplay muted loop></video>
    
	<div id="dim-bg">
		<div class="container home-titles">
			<h1>Video Licensing Platform</h1>
			<h4>License viral videos viewed by millions around the world from UNILAD</h4>
			<?php if(Auth::guest()): ?>
				<button class="btn btn-primary" onClick="window.location='/videos'" href="/videos">View latest videos</button>
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

<script>
    $('.vidbg-box').videoBackground();
</script>

<?php include('includes/footer.php'); ?>
