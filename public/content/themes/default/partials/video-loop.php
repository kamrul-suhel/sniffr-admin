<?php 

$currentDay = '';
foreach($videos as $video):
	$date = date('jS M Y',strtotime($video->licensed_at));
	if(isset($day_sort) && $currentDay != $date){
		$currentDay = $date;

		echo '<div class="col-xs-12"><h1>'.$date.'</h1></div>';
	}
?>
<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
	<article class="block">
		<a class="block-thumbnail" href="<?= url('video') ?><?= '/' . $video->id ?>">
			<div class="thumbnail-overlay"></div>
			<span class="play-button"></span>
			<span class="label label-<?php echo $video->state == 'licensed' ? 'success' : 'danger'; ?>"><?php echo ucfirst($video->state); ?></span>
					
			<img src="<?= \App\Libraries\ImageHandler::getVideoImage($video, 'medium')  ?>">
			<div class="details">
				<h2><?= $video->title; ?></h2>
				<span><?= \App\Libraries\TimeHelper::convert_seconds_to_HMS($video->duration); ?></span>
			</div>
		</a>
		<div class="block-contents">
			<p class="desc"><?php if(strlen($video->description) > 90){ echo substr($video->description, 0, 90) . '...'; } else { echo $video->description; } ?></p>
		</div>
	</article>
</div>
<?php endforeach; ?>
