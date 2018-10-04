Hey {{ $asset->contact->full_name }}!

{{ ucwords($type) }} Ref: {{ $asset->alpha_id }}

Hey! Are you having issues viewing the contract? Let me know, I can re send if so. Thanks!

Please click the following link and then agree to the terms provided on the page:
{{ route('contract.accept', ['contract_id' => $contract->token]) }}

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($asset->contact->email)) }}
