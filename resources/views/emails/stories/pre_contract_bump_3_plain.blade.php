
Story Ref: {{ $story->alpha_id }}



Hey,

Just checking if your still up for working ith us on the article? Did you get my previous messages. Thanks.

Please reply directly to this email or email stories@unilad.co.uk

Regards,

{{ (isset($story->user->full_name) ? $story->user->full_name : '') }}
The UNILAD Team

(powered by Sniffr)

Unsubscribe > {{ url('/unsubscribe/' . base64_encode($story->contact->email)) }}
