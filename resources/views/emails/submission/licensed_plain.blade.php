Hey{{ isset($video->contact->first_name) ? ' '.$video->contact->first_name : '' }}!

Thanks for sending over more details about your video, and confirming this with us!

Your video is now licensed: check it out here: {{ URL::to('video/' . $video->id) }}

Regards,

The UNILAD Team
