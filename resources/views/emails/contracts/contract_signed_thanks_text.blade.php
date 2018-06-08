Hey {{ $video->contact->full_name }}!

Thank you for signing the contract.

If you need it you can download it from this link.

{{ url('download/contract/'.$video->contracts->first()->reference_id) }}

If you have any questions you&rsquo;re more than welcome to contact the team here: licensing@unilad.co.uk

Please click the following link and then agree to the terms provided on the page:
{{ route('contract.accept', ['contract_id' => $contract->token]) }}

Regards,

The UNILAD Team

(powered by Sniffr)

Video Ref: {{ $video->alpha_id }}

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($video->contact->email)) }}
