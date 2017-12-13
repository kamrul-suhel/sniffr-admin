<!DOCTYPE html>
<html>
<head>
    <?php include('includes/head.php'); ?>
</head>
<body class="bg-404">

<div class="container">
	<div class="area-404">
		<h1>Oops, looks like you broke the internet.</h1>
		<a href="<?= url('/') ?>"><img src="/content/uploads/settings/logo-unilad-white.png" border="0" /></a>
		<div class="clear"></div>
	</div>
</div>
<br /><br />

<script type="text/javascript">
$('document').ready(function(){
	$('footer').css('display','none')
});
</script>


<?php include('includes/footer.php'); ?>
