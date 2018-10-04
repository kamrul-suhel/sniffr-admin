
Story Ref: {{ $story->alpha_id }}


Hi there!

We didn't hear back from you, just wondering if you had chance to take a look at what I sent you! Thanks.

Please reply directly to this email or email stories@unilad.co.uk

Regards,

{{ (isset($story->user->full_name) ? $story->user->full_name : '') }}
The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($story->contact->email)) }}
