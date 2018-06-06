Hey {{ $video->contact->full_name }}!

Video Ref: {{ $video->alpha_id }}

Thanks for sending over more details about your video, and confirming this with us!

We’re really keen to get going with this so be sure to keep an eye out on the page to see if/when your video is featured.

We may also allow some other Facebook pages to use the video to ensure it has the best chance of going viral. If you see any uploads you’re unsure of, please do send them our way and we’ll check them!

If you would like to submit any more content to us, you can do so by following this link: {{ url('/upload/') }}

If you have any questions you’re more than welcome to contact the team here: licensing@unilad.co.uk

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($video->contact->email)) }}
