<table width="100%">
    @php $count = 0 @endphp
    @foreach($mailer->videos as $video)
        <tr style="background-color:{!! $count % 2 == 0 ? '#f9f9f9;' : '#fff;'  !!}">
            <td valign="top" style="padding: 20px;" width="60%">
                <h4>{{ TextHelper::shorten($video['title'], 250) }}</h4>

                <br />
                <img src="@if($video['thumb']){{ $video['thumb'] }}@else {{ env('APP_URL', 'https://sniffrmedia.co.uk') }}/assets/frontend/images/placeholder.png @endif" border="0" style="display: flex; height: 180px; width: auto; margin-top: 15px; margin-right: 15px;" />
            </td>
            <td valign="top" style="padding: 20px;">
                <br />{{ TextHelper::shorten($video['description'], 350) }}
                <br /><br /><a href="{{ url('client/video/show/'.$video['alpha_id'].'/?mailer_id='.$mailer->id) }}" style="background:#000;color:#fff;padding:10px 8px;border-radius:5px;display:inherit;margin-top:20px;margin-bottom:10px;font-weight:bold;">
                    View Video
                </a>
            </td>
        </tr>
        @php $count++ @endphp
    @endforeach
</table>