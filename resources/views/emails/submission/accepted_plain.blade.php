Hey {{ $video->contact->full_name }}!

Video Ref: {{ $video->alpha_id }}

Thanks again for submitting your video to us!

We’d just like to confirm a few more details with you which will improve your chances of being featured on our page and for making some money!

Please click the link below to confirm additional details, this is just to verify details with you and confirm everything we need to know before we do anything with your video:

{{ url('/details/' . $video->more_details_code) }}

Once you have filled this in with the correct answers, our team will review the details and get in touch with what happens next!

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($video->contact->email)) }}
