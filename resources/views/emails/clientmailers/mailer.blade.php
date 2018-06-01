@extends('emails.template_sniffr')

@section('content')

@if(!empty($mailer->note)) <div style="padding-top:20px;padding-bottom:20px;">{{ $mailer->note }}</div> @endif

@if(!empty($mailer->stories))
<p><a href="{{ url('/client/stories') }}" style="display:block;color:#000;text-decoration:underline;margin-bottom:15px;">Checkout all your stories here</a></p>

<table>
    @php $count = 0 @endphp
    @foreach($mailer->stories as $story)
        <tr style="background-color:{!! $count % 2 == 0 ? '#f9f9f9;' : '#fff;'  !!}">
            <td valign="top" style="padding: 20px;">
                <h4>{{ TextHelper::shorten($story['title'], 250) }}</h4>
                by {{ $story['author'] }}
                <br />
                <img src="@if($story['thumb']){{ $story['thumb'] }}@else {{ env('APP_URL', 'https://sniffrmedia.co.uk') }}/assets/frontend/images/placeholder.png @endif" border="0" style="display: flex; height: 180px; width: auto; margin-top: 15px; margin-right: 15px;" />
                <br />
                <div style="display:inline-block;">
                    <div style="display:inline-block;width:25px;height:25px;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABj0lEQVR4Ae3agWZCcRTH8T8QZG9QYy5mNdbvINtz1TMkAAbFeoR6hPUI9RADIDEb1B3gYIj9bvfs8PseIP/iQ+794xT1l5RSSg17mGJrB6uvPAdsMR32SpMNurbB2er2BmfbDLqlmaoO9la3P9hXndJEWFodM1gWPlQ4hQFOqAqbzawOnFlhwy4SgH1hs69IgH3ygDp2BBBAAAGuOwJc+IIAAghw8cce7/CKb/6c1xrAGz3ggzgXB/CeXnAizsUBPLxR5+IBNqbOxQOqG+Jc+4DmP/MRQIAMgN8NugTg/z5GEwGwSg0YPeOcGGD3fkmLB/DX6QwA/9Qn/jEqAP++SACwcXIAVqkB/r5ICfD3RTqAvy8CAJEjgAACCBA6AggggADHUMCRBsSvnLGAeShgTgNGt5Frl9anAaVgEb/4SgGqDnZRq8cUwBt0sW57+RtrX/4mAJ71bdLO+r2928T/+yQgQQIIIIAAXAIck2/mYpcdME8O4O/7PIAMi1SA4Ps+Dwi+7/OAuPs+D1BKKaV+ALo6isIclyX1AAAAAElFTkSuQmCC);"></div>
                    <div style="display:inline-block;width:25px;height:25px;">1</div>
                </div>
                @if($story->assets()->count()>0)<div style="display:inline-block;">
                    <div style="display:inline-block;width:25px;height:25px;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACHklEQVR4Ae3agWYcURTG8aMVW7WU0gJJg6F01rbzHehTVEELENAnSJ4hFiiobkq6T5C8QGkoqsAuBCgUpUBsbVslmUYFI1+7IXdy71y+/wXMLH7rHAbXlFJKqcs0WMUWDvzI6ys+RzjA1mDV2qzs+z5OvI53cOL7Zd/aqehh5nX8g1nRszbCjtdpDnYsPBQ4TgY4RmGh+bbXCc+2hYZpSgBmFpr/TAnwRTigTnsEEEAAAa72CMA/aB8ggAACCCCAAAIIIIAAAggggAAC4DXGOQM++Yqv4GOugK/VHTtteBffMgTg18PKzsJj/901wARvLwA8t0Z40SkADv3m+g0cLnnjpZ0Lu90BLKoHdhoKX/znjQ923c7Fy5wMgA07C8/++caX8rZxvMyJABNr5G/o+Y/hwCha5ngAnn5rxJvgT42iZY4J4OlvRJuAkXG8zKkA2DCusQl4Z9eM4mWOC6Dp5/zV3+ef/ZZRS5Y5HoCmn//VKb4P7xu1ZJkjAmj6uUfr1ROjli1zXABNf3jYjQmYWAvxMkcA0PQHxcscA8DTHx4vc3uA8OkPW+ZwwNzrhGceDEh/5SwUMEoKGAUDqnspr136WjDADOP0F1+DAEUP0w5fPWYAV/axF/vyN/bKvlkgoJmv+Wac6/f+3jd59oMB8RNAAAEEiJIA88xv5mKaO2CUHYC/97MCcBhnB+Dv/QwB/L2fMYC/97sJUEoppf4AxF4KMk77RSYAAAAASUVORK5CYII=);"></div>
                    <div style="display:inline-block;width:25px;height:25px;">{{ $story->assets()->count() }}</div>
                </div>@endif
                @if($story->videos()->count()>0)<div style="display:inline-block;">
                <div style="display:inline-block;">
                    <div style="display:inline-block;width:25px;height:25px;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABm0lEQVR4Ae3aAWYDARAF0AVWK0doUlioBDpzm4IeIjlD7BEaaKEAyRGaI+xCzxFLW5BsoT5AdWe74/P/AIh4/MgkO4WiKIqiDMlqbhs7+sn7f56THW2zmhdjZjnzg128n27s4oflrBgnVWmt99OPtVU5CsB23ueM7Yp4rLJzGuBsVRjgW+8TZxsGWJMJsDYM8K9MgH/EAX3uCCCAAH+LAPbon9SAorA7e58Q8NsLhrzhzZW/8gJ+giqxAlAlXgCqxAtAlZgBqBIvAFXiBaBKzABUiReAKvECUCVmAKrEC0CVeAGoEjMAVeIFoErUgBdVKAvgD8QfYr+2Z32RZQFQHUYAqqN1OgGA6jACUB39qE8AoDqMAFRHfy0mAFAdRgCqwwkgf8CB6jAAJhgBBBBAgC4V0AUB+SdncUCdCqjDgPvbzLNLXwwHIPaUevgaB1SlNVmnx1EAjr9tP/Xxt+1x/B0CIL7w9TTn9/7ma3Q/AGCJAAIIIEAsAnTkp8XWsANqcgD2fVYA9n1eAPZ9VgD2fQ5AYN9PByiKoijKN3P3T8TyoBKRAAAAAElFTkSuQmCC);"></div>
                    <div style="display:inline-block;width:25px;height:25px;">{{ $story->videos()->count() }}</div>
                </div>@endif
            </td>
            <td valign="top" style="padding: 20px;">
                <br />{{ TextHelper::shorten($story['excerpt'], 350) }}..
                <br /><br /><a href="{{ url('client/story/show/'.$story['alpha_id'].'/?mailer_id='.$mailer->id) }}" style="background:#000;color:#fff;padding:10px 8px;border-radius:5px;display:inherit;margin-top:20px;margin-bottom:10px;font-weight:bold;">View story</a>
            </td>
        </tr>
        @php $count++ @endphp
    @endforeach
</table>
@else
    <strong>No Stories have been selected</strong>
@endif

@stop
