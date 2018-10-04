Hey {{ $video->contact->full_name }}!

Video Ref: {{ $video->alpha_id }}

Thanks for submitting your video to us.  On this occasion we won’t be using the video.

Please keep sending videos in, we are always on the lookout for great content.

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url(env('FRONTEND_URL').'/unsubscribe/' . base64_encode($video->contact->email)) }}
