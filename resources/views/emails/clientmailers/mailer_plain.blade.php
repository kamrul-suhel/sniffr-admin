Hi,

@if(!empty($mailer->note)) {{ $mailer->note }} @endif

@if($mailer->stories->count()))
    @foreach($mailer->stories as $story)
        {{ TextHelper::shorten($story['title'], 250) }}
        by {{ $story['author'] }}

        @if($story['thumb'])IMG: {{ $story['thumb'] }} @endif
        {{ TextHelper::shorten($story['excerpt'], 250) }}
        VIEW STORY: {{ url(env('FRONTEND_URL').'/client/story/show/'.$story['alpha_id']) }}
        --------

    @endforeach
@endif

@if($mailer->videos->count()))
    @foreach($mailer->videos as $video)
        {{ TextHelper::shorten($video['title'], 250) }}

        @if($video['image'])IMG: {{ $video['image'] }} @endif
        {{ TextHelper::shorten($video['description'], 250) }}
        VIEW STORY: {{ url(env('FRONTEND_URL').'/client/video/show/'.$video['alpha_id']) }}
        --------

    @endforeach
@endif

@if((!$mailer->stories->count()) && (!$mailer->videos->count()))
    No Stories or Videos have been selected.
@endif

Regards,

The UNILAD Team

(powered by Sniffr)
