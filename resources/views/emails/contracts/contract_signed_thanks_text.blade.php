Hey {{ $this->asset->contact->full_name }}!

Thank you for signing the contract.

If you need it you can download it from this link.

{{ route('contract.download.public', ['id' => $this->asset->contracts->first()->reference_id]) }}

If you have any questions you&rsquo;re more than welcome to contact the team here: licensing@unilad.co.uk

Regards,

The UNILAD Team

(powered by Sniffr)

Video Ref: {{ $this->asset->alpha_id }}

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($this->asset->contact->email)) }}
