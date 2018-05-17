Hey {{ $video->contact->full_name }}!

Video Ref: {{ $video->alpha_id }}

If you would like to submit any more content to us, you can do so by following this link:
{{ route('contract.accept', ['contract_id' => $contract->token]) }}

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($video->contact->email)) }}
