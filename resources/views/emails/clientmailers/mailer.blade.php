@extends('emails.template')

@section('content')

@if(!empty($mailer->note)) <div style="padding-top:20px;padding-bottom:20px;">{{ $mailer->note }}</div> @endif

@if(!empty($mailer->stories))
<p><a href="{{ url('/client/mail') }}" style="color:#000;text-decoration:underline;margin-bottom:15px;">Checkout all your stories here</a></p>

<table>
    @php $count = 0 @endphp
    @foreach($mailer->stories as $story)
        <tr style="background-color:{!! $count % 2 == 0 ? '#f9f9f9;' : '#fff;'  !!}">
            <td valign="top" style="padding: 20px;">
                <h4>{{ TextHelper::shorten($story['title'], 250) }}</h4>
                by {{ $story['author'] }}
                <br />
                <img src="@if($story['thumb']){{ $story['thumb'] }}@else /assets/frontend/images/placeholder.png @endif" border="0" style="display: flex; height: 180px; width: auto; margin-top: 15px; margin-right: 15px;" />
            </td>
            <td valign="top" style="padding: 20px;">
                <br />{{ TextHelper::shorten($story['excerpt'], 350) }}..
                <br /><br /><a href="{{ url('client/story/show/'.$story['alpha_id'] ) }}" style="background:#000;color:#fff;padding:10px 8px;border-radius:5px;display:inherit;margin-top:20px;margin-bottom:10px;font-weight:bold;">View story</a>
            </td>
        </tr>
        @php $count++ @endphp
    @endforeach
</table>
@else
    <strong>No Stories have been selected</strong>
@endif

@stop
