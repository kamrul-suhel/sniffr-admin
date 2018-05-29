Hi,

@if(!empty($mailer->note)) {{ $mailer->note }} @endif

@if(!empty($mailer->stories))
    @foreach($mailer->stories as $story)
        {{ TextHelper::shorten($story['title'], 250) }}
        by {{ $story['author'] }}

        @if($story['thumb'])IMG: {{ $story['thumb'] }} @endif
        {{ $story['excerpt'] }}..
        REQUEST LICENSE: {{ url('client/story/show/'.$story['alpha_id'] ) }}
        --------

    @endforeach
@else
    No Stories have been selected.
@endif

Regards,

The UNILAD Team

(powered by Sniffr)
