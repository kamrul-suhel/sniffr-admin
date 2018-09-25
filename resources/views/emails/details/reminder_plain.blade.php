Hey{{ $video->contact->full_name }}!

Video Ref: {{ $video->alpha_id }}

Thanks again for submitting your video to us!

We’ve received no response from you yet to verify your video and confirm your submission.

Please follow the link below to complete additional details, *we cannot feature your video if you do not fill out this form*:

{{ url(env('FRONTEND_URL').'/details/' . $video->more_details_code) }}

We’re really keen to use your video so please fill this in as soon as possible! Once you have done so,  our team will review the content and get in touch with further opportunities for you!

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url(env('FRONTEND_URL').'/unsubscribe/' . base64_encode($video->contact->email)) }}
