<<<<<<< HEAD
You've not filled out additonal details: {{ URL::to('/details/' . $video->more_details_code) }}
=======
Hey{{ isset($video->contact->first_name) ? ' '.$video->contact->first_name : '' }}!

Thanks again for submitting your video to us - we love it!

We’ve received no response from you yet to verify your video and confirm your submission.

Please answer the online questionnaire below, *we cannot feature your video if you do not fill out this form*:

{{ URL::to('/details/' . $video->more_details_code) }}

We’re really keen to use your video so please fill this in as soon as possible! Once you have done so,  our team will review the content and get in touch with further opportunities for you!

Regards,

The UNILAD Team
>>>>>>> dba84b3c9b512710331d4a9034dbb1d69ed5cf43
