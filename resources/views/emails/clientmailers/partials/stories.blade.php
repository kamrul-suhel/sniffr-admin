<table width="100%">
    @php $count = 0 @endphp
    @foreach($mailer->stories as $story)
        <tr style="background-color:{!! $count % 2 == 0 ? '#f9f9f9;' : '#fff;'  !!}">
            <td valign="top" style="padding: 20px;" width="60%">
                <h4>{{ TextHelper::shorten($story['title'], 250) }}</h4>
                by {{ $story['author'] }}
                <br />
                <img src="@if($story['thumb']){{ $story['thumb'] }}@else {{ env('APP_URL', 'https://sniffrmedia.co.uk') }}/assets/frontend/images/placeholder.png @endif" border="0" style="display: flex; height: 180px; width: auto; margin-top: 15px; margin-right: 15px;" />
                <br />
                <div style="display:inline-block;">
                    <img src="{{ url('assets/frontend/images/picture_as_pdf.png') }}" border="0" />
                    <div style="display:inline-block;width:25px;height:25px;">1</div>
                </div>
                @if($story->assets()->count()>0)<div style="display:inline-block;">
                    <img src="{{ url('assets/frontend/images/photo_library.png') }}" border="0" />
                    <div style="display:inline-block;width:25px;height:25px;">{{ $story->assets()->count() }}</div>
                </div>@endif
                @if($story->assets()->where('jw_player_code', '!=', NULL)->count()>0)<div style="display:inline-block;">
                    <div style="display:inline-block;">
                        <img src="{{ url('assets/frontend/images/video_library.png') }}" border="0" />
                        <div style="display:inline-block;width:25px;height:25px;">{{ $story->assets()->where('jw_player_code', '!=', NULL)->count() }}</div>
                    </div>@endif
            </td>
            <td valign="top" style="padding: 20px;">
                <br />{{ TextHelper::shorten($story['excerpt'], 350) }}..
                <br /><br /><a href="{{ url('client/stories/'.$story['alpha_id']) }}" style="background:#000;color:#fff;padding:10px 8px;border-radius:5px;display:inherit;margin-top:20px;margin-bottom:10px;font-weight:bold;">View story</a>
            </td>
        </tr>
        @php $count++ @endphp
    @endforeach
</table>
