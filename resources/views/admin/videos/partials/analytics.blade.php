<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Video social uses</div>
        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body">
        <span class="input-group">
            <span class="input-group-addon">Social Link</span>
            <input type="url" name="new_social_link" class="form-control">
        </span>

        @if($asset)
            @foreach($asset->socialLinks as $link)
                <div style="padding: 20px; padding-bottom: 20px;">
                    <span class="input-group">
                        <span class="input-group-addon">
                            <i class="fa fa-facebook"></i>
                        </span>
                        <input type="url" name="social_link[{{$link->id}}]" class="form-control" value="{{ $link->link }}">
                    </span>
                    <table class="table table-condensed table-striped table-bordered">
                        <thead>
                            <th class="text-center"><small>Likes</small></th>
                            <th class="text-center"><small>Comments</small></th>
                            <th class="text-center"><small>Shares</small></th>
                            <th class="text-center"><small>Reach</small></th>
                            <th class="text-center"><small>Reactions</small></th>
                            <th class="text-center"><small>Link clicks</small></th>
                            <th class="text-center"><small>Last Updated</small></th>
                        </thead>
                        <tbody class="text-center">
                        <tr>
                            <td><small>{{ number_format($link->latestVideoStats()->likes  ?? 0) }}</small></td>
                            <td><small>{{ number_format($link->latestVideoStats()->comments  ?? 0) }}</small></td>
                            <td><small>{{ number_format($link->latestVideoStats()->shares  ?? 0) }}</small></td>
                            <td><small>{{ number_format($link->latestVideoStats()->reach  ?? 0) }}</small></td>
                            <td><small>{{ number_format($link->latestVideoStats()->reactions  ?? 0) }}</small></td>
                            <td><small>{{ number_format($link->latestVideoStats()->link_clicks  ?? 0) }}</small></td>
                            <td><small>{{ isset($link->latestVideoStats()->created_at) ? date('d/m/Y', strtotime($link->latestVideoStats()->created_at)) : '0' }}</small></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            @endforeach
        @endif
    </div>
</div>