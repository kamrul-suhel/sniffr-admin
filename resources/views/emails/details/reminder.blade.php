<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Reminder</title>

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
    <h1>Reminder to fill out additonal details: <a href="{{ URL::to('/details/' . $video->more_details_code) }}">Link to more details</a></h1>

    
</body>
</html>