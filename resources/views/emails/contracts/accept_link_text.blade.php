Hey {{ $video->contact->full_name }}!

Video Ref: {{ $video->alpha_id }}

You are receiving this email in reference to licensing your video. Before we can use your video we need to you to agree to an agreement which includes specific terms.

Please click the following link and then agree to the terms provided on the page:
{{ route('contract.accept', ['contract_id' => $contract->token]) }}

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($video->contact->email)) }}
