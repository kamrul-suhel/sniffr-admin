Hey{{ isset($video->contact->first_name) ? ' '.$video->contact->first_name : '' }}!

Thanks again for submitting your video to us - we love it!

We’d just like to confirm a few more details with you which will improve your chances of being featured on our page and for making some money!

Please click the link below to access our online questionnaire, this is just to verify details with you and confirm everything we need to know before we do anything with your video:

{{ URL::to('/details/' . $video->more_details_code) }}

Once you have filled this in with the correct answers, our team will review the details and get in touch with what happens next!

Regards,

The UNILAD Team