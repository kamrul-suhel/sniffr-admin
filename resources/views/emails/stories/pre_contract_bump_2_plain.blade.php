
Story Ref: {{ $story->alpha_id }}


Hey,

Just wondered if you would still interested in working with us on the story? Thanks!

Please reply directly to this email or email stories@unilad.co.uk

Regards,

{{ (isset($story->user->full_name) ? $story->user->full_name : '') }}
The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($story->contact->email)) }}
