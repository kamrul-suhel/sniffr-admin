Hey {{ $asset->contact->full_name }}!

{{ ucwords($type) }} Ref: {{ $asset->alpha_id }}

Hi There, did you get a chance to look over the contract? Please find the link below:

{{ route('contract.accept', ['contract_id' => $contract->token]) }}

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($asset->contact->email)) }}
