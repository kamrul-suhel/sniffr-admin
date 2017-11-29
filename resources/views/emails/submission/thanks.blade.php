<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Thanks</title>

    <style>
        table{
            border:1px solid grey;
        }

        th, td{
            text-align: left;
            border: 1px solid grey;
            padding: 5px 2px;
        }
    </style>
</head>
<body class="container">
    <h1>Thanks for your video submission</h1>

    {{ $video->title }}
</body>
</html>