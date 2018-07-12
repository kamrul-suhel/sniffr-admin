
<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Story Assets</div>

        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body" style="display: block;">
        <div id="story_image_source" style="background-image:url('{{ (!empty($story->thumb) ? $story->thumb : '/assets/frontend/images/placeholder.png') }}');">
            <div class="story_image_asset_icon">
                <div style="display:inline-block;width:25px;height:25px;border-radius:4px;background-color:#fff;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACHklEQVR4Ae3agWYcURTG8aMVW7WU0gJJg6F01rbzHehTVEELENAnSJ4hFiiobkq6T5C8QGkoqsAuBCgUpUBsbVslmUYFI1+7IXdy71y+/wXMLH7rHAbXlFJKqcs0WMUWDvzI6ys+RzjA1mDV2qzs+z5OvI53cOL7Zd/aqehh5nX8g1nRszbCjtdpDnYsPBQ4TgY4RmGh+bbXCc+2hYZpSgBmFpr/TAnwRTigTnsEEEAAAa72CMA/aB8ggAACCCCAAAIIIIAAAggggAAC4DXGOQM++Yqv4GOugK/VHTtteBffMgTg18PKzsJj/901wARvLwA8t0Z40SkADv3m+g0cLnnjpZ0Lu90BLKoHdhoKX/znjQ923c7Fy5wMgA07C8/++caX8rZxvMyJABNr5G/o+Y/hwCha5ngAnn5rxJvgT42iZY4J4OlvRJuAkXG8zKkA2DCusQl4Z9eM4mWOC6Dp5/zV3+ef/ZZRS5Y5HoCmn//VKb4P7xu1ZJkjAmj6uUfr1ROjli1zXABNf3jYjQmYWAvxMkcA0PQHxcscA8DTHx4vc3uA8OkPW+ZwwNzrhGceDEh/5SwUMEoKGAUDqnspr136WjDADOP0F1+DAEUP0w5fPWYAV/axF/vyN/bKvlkgoJmv+Wac6/f+3jd59oMB8RNAAAEEiJIA88xv5mKaO2CUHYC/97MCcBhnB+Dv/QwB/L2fMYC/97sJUEoppf4AxF4KMk77RSYAAAAASUVORK5CYII=);"></div>
            </div>
        </div>
        @if(isset($story)&&$story->assets()->count()>0)
        <div class="row">
            @foreach($story->assets()->get() as $asset)
                <div class="col-md-4">
                    <a id="story_image_asset_{{ $asset->alpha_id }}" title="{{ $asset->alpha_id }}" class="js-story-show-asset" href="{{ (!empty($asset->thumbnail) ? $asset->thumbnail : ($asset->url ? $asset->url : '/assets/frontend/images/placeholder.png')) }}">
                        <div class="story_image_asset" style="background:url('{{ (!empty($asset->thumbnail) ? $asset->thumbnail : ($asset->url ? $asset->url : '/assets/frontend/images/placeholder.png')) }}');">
                            <div class="story_image_asset_icon">
                                @if(!$asset->jw_player_code)
                                <div style="display:inline-block;width:25px;height:25px;border-radius:4px;background-color:#fff;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACHklEQVR4Ae3agWYcURTG8aMVW7WU0gJJg6F01rbzHehTVEELENAnSJ4hFiiobkq6T5C8QGkoqsAuBCgUpUBsbVslmUYFI1+7IXdy71y+/wXMLH7rHAbXlFJKqcs0WMUWDvzI6ys+RzjA1mDV2qzs+z5OvI53cOL7Zd/aqehh5nX8g1nRszbCjtdpDnYsPBQ4TgY4RmGh+bbXCc+2hYZpSgBmFpr/TAnwRTigTnsEEEAAAa72CMA/aB8ggAACCCCAAAIIIIAAAggggAAC4DXGOQM++Yqv4GOugK/VHTtteBffMgTg18PKzsJj/901wARvLwA8t0Z40SkADv3m+g0cLnnjpZ0Lu90BLKoHdhoKX/znjQ923c7Fy5wMgA07C8/++caX8rZxvMyJABNr5G/o+Y/hwCha5ngAnn5rxJvgT42iZY4J4OlvRJuAkXG8zKkA2DCusQl4Z9eM4mWOC6Dp5/zV3+ef/ZZRS5Y5HoCmn//VKb4P7xu1ZJkjAmj6uUfr1ROjli1zXABNf3jYjQmYWAvxMkcA0PQHxcscA8DTHx4vc3uA8OkPW+ZwwNzrhGceDEh/5SwUMEoKGAUDqnspr136WjDADOP0F1+DAEUP0w5fPWYAV/axF/vyN/bKvlkgoJmv+Wac6/f+3jd59oMB8RNAAAEEiJIA88xv5mKaO2CUHYC/97MCcBhnB+Dv/QwB/L2fMYC/97sJUEoppf4AxF4KMk77RSYAAAAASUVORK5CYII=);"></div>
                                @else
                                <div style="display:inline-block;width:25px;height:25px;border-radius:4px;background-color:#fff;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABm0lEQVR4Ae3aAWYDARAF0AVWK0doUlioBDpzm4IeIjlD7BEaaKEAyRGaI+xCzxFLW5BsoT5AdWe74/P/AIh4/MgkO4WiKIqiDMlqbhs7+sn7f56THW2zmhdjZjnzg128n27s4oflrBgnVWmt99OPtVU5CsB23ueM7Yp4rLJzGuBsVRjgW+8TZxsGWJMJsDYM8K9MgH/EAX3uCCCAAH+LAPbon9SAorA7e58Q8NsLhrzhzZW/8gJ+giqxAlAlXgCqxAtAlZgBqBIvAFXiBaBKzABUiReAKvECUCVmAKrEC0CVeAGoEjMAVeIFoErUgBdVKAvgD8QfYr+2Z32RZQFQHUYAqqN1OgGA6jACUB39qE8AoDqMAFRHfy0mAFAdRgCqwwkgf8CB6jAAJhgBBBBAgC4V0AUB+SdncUCdCqjDgPvbzLNLXwwHIPaUevgaB1SlNVmnx1EAjr9tP/Xxt+1x/B0CIL7w9TTn9/7ma3Q/AGCJAAIIIEAsAnTkp8XWsANqcgD2fVYA9n1eAPZ9VgD2fQ5AYN9PByiKoijKN3P3T8TyoBKRAAAAAElFTkSuQmCC);"></div>
                                @endif
                            </div>
                        </div>
                    </a>
                </div>
            @endforeach
        </div>
        <hr />
        @endif
        <span class="input-group">
            <span class="input-group-addon">
                Upload Image
            </span>
            <input type="text" class="form-control" id="story_image_source_url" name="story_image_source_url" placeholder="" value="" />
            <input type="file" multiple="true" class="form-control" name="story_image" id="story_image"/>
        </span>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="story_asset_modal" tabindex="-1" role="dialog" aria-labelledby="story_asset_modal_label" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-inner-content">
                <button class="btn" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
                <button class="btn btn-primary pull-right js-story-set-asset"><i class="fa fa-check"></i> Set Featured Image</button>
                <input type="hidden" id="story_asset_modal_set_featured" name="story_asset_modal_set_featured" value="" />
            </div>
        </div>
    </div>
</div>
