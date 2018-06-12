<div class="col-lg-12">
    <div class="col-lg-12">
        <span class="input-group">
            <span class="input-group-addon">New Social Link</span>
            <input type="url" name="new_social_link" class="form-control">
        </span>
    </div>

    @foreach($video->socialLinks as $link)
        <div class="col-lg-6" style="padding: 20px; padding-bottom: 20px;">
            <span class="input-group">
                <span class="input-group-addon">
                    <i class="fa fa-facebook"></i>
                </span>
                <input type="url" name="social_link[{{$link->id}}]" class="form-control" value="{{ $link->link }}">
            </span>
            <table class="table table-condensed table-striped table-bordered" style="margin-top:-20px;">
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

</div>