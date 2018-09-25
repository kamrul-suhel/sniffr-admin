Hey submission admin person!

Video Ref: {{ $video->alpha_id }}

A video now has additional details provided. Please click the link below to review the additional details of the video.

{{ $video->title }}
{{ url(env('FRONTEND_URL').'/admin/videos/edit/' . $video->alpha_id) }}

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url(env('FRONTEND_URL').'/unsubscribe/' . base64_encode($video->contact->email)) }}
