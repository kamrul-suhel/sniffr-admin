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
                        <div style="display:inline-block;width:25px;height:25px;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABm0lEQVR4Ae3aAWYDARAF0AVWK0doUlioBDpzm4IeIjlD7BEaaKEAyRGaI+xCzxFLW5BsoT5AdWe74/P/AIh4/MgkO4WiKIqiDMlqbhs7+sn7f56THW2zmhdjZjnzg128n27s4oflrBgnVWmt99OPtVU5CsB23ueM7Yp4rLJzGuBsVRjgW+8TZxsGWJMJsDYM8K9MgH/EAX3uCCCAAH+LAPbon9SAorA7e58Q8NsLhrzhzZW/8gJ+giqxAlAlXgCqxAtAlZgBqBIvAFXiBaBKzABUiReAKvECUCVmAKrEC0CVeAGoEjMAVeIFoErUgBdVKAvgD8QfYr+2Z32RZQFQHUYAqqN1OgGA6jACUB39qE8AoDqMAFRHfy0mAFAdRgCqwwkgf8CB6jAAJhgBBBBAgC4V0AUB+SdncUCdCqjDgPvbzLNLXwwHIPaUevgaB1SlNVmnx1EAjr9tP/Xxt+1x/B0CIL7w9TTn9/7ma3Q/AGCJAAIIIEAsAnTkp8XWsANqcgD2fVYA9n1eAPZ9VgD2fQ5AYN9PByiKoijKN3P3T8TyoBKRAAAAAElFTkSuQmCC);"></div>
                        <div style="display:inline-block;width:25px;height:25px;">1
                    </div>
                </div>
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
