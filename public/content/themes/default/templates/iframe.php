<!DOCTYPE html>
<html>
<head>
    <?php include('content/themes/default/includes/head.php'); ?>
</head>
<body <?php if(Request::is('/')) echo 'class="home"'; ?>>
    <?php include('content/themes/default/forms/'.$form.'.php'); ?>

    <?php include('content/themes/default/includes/mousestats.php'); ?>
</body>
</html>