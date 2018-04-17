<?php

$sidebar_videos = \App\Video::where('active', '=', '1')->orderByRaw("RAND()")->take(6)->get();

?>

<div id="sidebar">

	<h3>Videos You May Like</h3>

	<div class="row">
		<?php foreach($sidebar_videos as $video): ?>

			<div class="col-md-6 col-sm-6 col-xs-12">
				<article class="block">
					<a class="block-thumbnail" href="<?= ($settings['enable_https']) ? secure_url('video') : URL::to('video') ?><?= '/' . $video->id ?>">
						<div class="thumbnail-overlay"></div>
						<span class="play-button"></span>
						<img src="<?= \App\Libraries\ImageHandler::getImage($video->image, 'medium')  ?>">
						<div class="details">
							<h2><?= $video->title; ?></h2>
						</div>
					</a>
				</article>
			</div>

		<?php endforeach; ?>
	</div>
</div>
