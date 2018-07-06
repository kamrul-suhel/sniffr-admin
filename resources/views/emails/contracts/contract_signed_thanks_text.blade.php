Hey {{ $video->contact->full_name }}!

Thank you for signing the contract.

If you need it you can download it from this link.

{{ route('contract.download.public', ['id' => $video->contracts->first()->reference_id]) }}

If you have any questions you&rsquo;re more than welcome to contact the team here: licensing@unilad.co.uk

Regards,

The UNILAD Team

(powered by Sniffr)

Video Ref: {{ $video->alpha_id }}

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($video->contact->email)) }}
