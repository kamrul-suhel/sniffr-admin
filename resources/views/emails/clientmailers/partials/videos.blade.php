<table width="100%">
    @php $count = 0 @endphp
    @foreach($mailer->videos as $video)
        <tr style="background-color:{!! $count % 2 == 0 ? '#f9f9f9;' : '#fff;'  !!}">
            <td valign="top" style="padding: 20px;" width="60%">
                <h4>{{ TextHelper::shorten($video['title'], 250) }}</h4>
                <img src="@if($video['image']) {{ $video['image'] }} @elseif($video['thumb']) {{ $video['thumb'] }}@else {{ env('APP_URL', 'https://sniffrmedia.co.uk') }}/assets/frontend/images/placeholder.png @endif" border="0" style="display: flex; height: 200px; width: auto; margin-top: 15px;" />
                <br />
                <div style="display:inline-block;">
                    <div style="display:inline-block;">
                        <img src="{{ url('assets/frontend/images/video_library.png') }}" border="0" />
                        <div style="display:inline-block;width:25px;height:25px;">1</div>
                    </div>
                </div>
            </td>
            <td valign="top" style="padding: 20px;">
                <br />{{ TextHelper::shorten($video['description'], 350) }}
                <br /><br /><a href="{{ url('client/videos/'.$video['alpha_id']) }}" style="background:#000;color:#fff;padding:10px 8px;border-radius:5px;display:inherit;margin-top:20px;margin-bottom:10px;font-weight:bold;">
                    View Video
                </a>
            </td>
        </tr>
        @php $count++ @endphp
    @endforeach
</table>
