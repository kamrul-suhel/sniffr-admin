Hey {{ $video->contact->full_name }}!

Video Ref: {{ $video->alpha_id }}

Thanks for sending over more details about your video, and confirming this with us!

Your video is now licensed: check it out here: {{ url('videos/' . $video->alpha_id) }}

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($video->contact->email)) }}
