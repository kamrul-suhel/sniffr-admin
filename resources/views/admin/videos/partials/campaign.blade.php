<div class="row">
    <div class="col-sm-6">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">Campaign</div>

                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>

            <div class="panel-body" style="display: block;">
                <label for="campaigns">Campaigns</label>
                <select name="campaigns[]" id="campaigns" class="form-control" multiple>
                    @if($video_campaigns)
                        @foreach($video_campaigns as $campaign)
                            <option value="{{ $campaign->id }}"
                                    {{ (($video) && $video->campaigns()->get()->contains($campaign->id))  ? 'selected="selected"' : '' }}>
                                {{ $campaign->name }}
                            </option>
                        @endforeach
                    @endif
                </select>
            </div>
        </div>
    </div>
</div>