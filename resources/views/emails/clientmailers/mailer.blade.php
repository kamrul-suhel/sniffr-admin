@extends('emails.template')

@section('content')

@if(!empty($mailer->note)) <div style="padding-top:20px;padding-bottom:20px;">{{ $mailer->note }}</div> @endif

@if(!empty($mailer->stories))
<table class="table table-striped pages-table">
    @foreach($mailer->stories as $story)
    <tr>
        <td>
            <h4>{{ TextHelper::shorten($story['title'], 250) }}</h4>
            by {{ $story['author'] }}
            <br />
            <img src="@if($story['thumb']){{ $story['thumb'] }}@else /assets/frontend/images/placeholder.png @endif" border="0" style="display: flex; height: 200px; width: auto; margin-top: 15px;" />
        </td>
        <td>
            <br />{{ $story['excerpt'] }}..
            <br /><br /><a href="#" style="background:#000;color:#fff;padding:10px 6px;border-radius:5px;display:inherit;margin-top:20px;">Request License</a>
        </td>
    </tr>
    @endforeach
</table>
@else
    <strong>No Stories have been selected</strong>
@endif

@stop
