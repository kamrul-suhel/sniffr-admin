Hey {{ $asset->contact->full_name }}!

{{ ucwords($type) }} Ref: {{ $asset->alpha_id }}

You are receiving this email in reference to licensing your {{ $type }}. Before we can use your {{ $type }} we need to you to agree to an agreement which includes specific terms.

Please click the following link and then agree to the terms provided on the page:
{{ url(env('FRONTEND_URL').'/contract.accept', ['contract_id' => $contract->token]) }}

Regards,

The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url(env('FRONTEND_URL').'/unsubscribe/' . base64_encode($asset->contact->email)) }}
