Hey submission admin person!

Video Ref: {{ $video->alpha_id }}

A new video has been submitted. You need to review it in order to start the acceptance and licensing process. Please click the link below to review the submitted video.

{{ $video->title }}
{{ url(env('FRONTEND_URL').'/admin/videos/edit/' . $video->alpha_id) }}

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url(env('FRONTEND_URL').'/unsubscribe/' . base64_encode($video->contact->email)) }}
