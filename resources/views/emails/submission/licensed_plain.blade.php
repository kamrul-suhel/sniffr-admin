Hey{{ isset($video->contact->first_name) ? ' '.$video->contact->first_name : '' }}!

Video Ref: {{ $video->alpha_id }}

Thanks for sending over more details about your video, and confirming this with us!

Your video is now licensed: check it out here: {{ url('video/' . $video->alpha_id) }}

Regards,

The UNILAD Team
