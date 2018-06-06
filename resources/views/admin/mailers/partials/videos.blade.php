@foreach($mailer->videos as $video)
    <tr>
        <td width="60%">
            <h4>{{ TextHelper::shorten($video['title'], 250) }}</h4><br />
            <img src="@if($video['thumb']){{ $video['thumb'] }}@else /assets/frontend/images/placeholder.png @endif" border="0" style="display: flex; height: 200px; width: auto; margin-top: 15px;" />
        </td>
        <td>
            <br />{{ $video['excerpt'] }}
            <br /><br /><a href="#" style="background:#000;color:#fff;padding:10px 6px;border-radius:5px;display:inherit;margin-top:20px;font-weight:bold;">View Video</a>
        </td>
    </tr>
@endforeach