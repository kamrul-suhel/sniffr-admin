Hey submission admin person!

Video Ref: {{ $video->alpha_id }}

A new video has been submitted from the non-exclusive video form. It is currently waiting for your approval. Please click the link below to review the submitted video.

{{ $video->title }}
{{ url('admin/videos/edit/' . $video->alpha_id) }}

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($video->contact->email)) }}
