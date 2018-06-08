<div class="panel panel-{{ (key_exists($video->state, config('videos.colors'))) ? config('videos.colors')[$video->state] : $video->state }}" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">
            {{ ucfirst($video->state) }}
            @if($video->state=='licensed')
                |
                @if($video->rights === 'nonex')
                    <i class="fa fa-times-circle" title="Non-Exclusive"></i>
                    Non-Exclusive
                @else
                    <i class="fa fa-check-circle" title="Exclusive"></i> Exclusive
                @endif
                Video
            @endif
            @if($video->trashed())
                - Deleted
            @endif
        </div>
        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body" style="display: block;">
        <div class="text-center">
            {!! App\Libraries\VideoHelper::getVideoHTML($video, true, 'edit') !!}
        </div>
    </div>

    <div class="panel-footer">
        <div class="text-right">
            @if($video->rights != 'exc')
                @if($video->state == 'pending' || $video->state == 'problem' || $video->state == 'licensed' || $video->state=='restricted')
                    @if($video->state != 'licensed')
                        <a href="{{ url('admin/videos/status/licensed/' . $video->alpha_id ) }}"
                           class="btn btn-primary btn-success">
                            License
                        </a>
                    @endif
                    @if($video->state != 'restricted')
                        <a href="{{ url('admin/videos/status/restricted/' . $video->alpha_id ) }}"
                           class="btn btn-primary btn-warning">
                            Restricted
                        </a>
                    @endif
                    @if($video->state != 'problem')
                        <a href="{{ url('admin/videos/status/problem/' . $video->alpha_id ) }}"
                           class="btn btn-primary btn-danger">
                            Problem
                        </a>
                    @endif
                @elseif($video->state == 'new')
                    <a href="{{ url('admin/videos/status/accepted/' . $video->alpha_id ) }}"
                       class="btn btn-primary btn-success js-state-accept">
                        Accept
                    </a>
                    <a href="{{ url('admin/videos/status/rejected/' . $video->alpha_id ) }}"
                       class="btn btn-primary btn-danger">Reject</a>
                @elseif($video->state == 'accepted')
                    <div class="pull-left">
                        @if($video->reminders)
                            Reminder {{ $video->reminders }}
                            Sent: {{ ($video->more_details_sent) ? \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $video->more_details_sent)->diffForHumans() : '' }}
                            <a href="{{ url('admin/videos/remind/' . $video->alpha_id ) }}"
                               class="btn btn-primary btn-danger">
                                Send Reminder
                            </a>
                        @else
                            More Details
                            Requested: {{ ($video->more_details_sent) ? \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $video->more_details_sent)->diffForHumans() : '' }}
                            <a href="{{ url('admin/videos/remind/' . $video->alpha_id ) }}"
                               class="btn btn-primary btn-danger">
                                Send Reminder
                            </a>
                        @endif
                    </div>
                    <a href="{{ url('admin/videos/status/rejected/' . $video->alpha_id ) }}"
                       class="btn btn-primary btn-danger">
                        Reject
                    </a>
                @elseif($video->state == 'rejected')
                    <a href="{{ url('admin/videos/status/accepted/' . $video->alpha_id ) }}"
                       class="btn btn-primary btn-success">
                        Accept
                    </a>
                @endif
            @endif

            @if($video->file)
                <a href="{{ url('/download/'.$video->alpha_id) }}" class="btn btn-primary{{ $video->file_watermark ? ' js-download' : '' }}" title="Download Video" download>
                    <i class="fa fa-download"></i>
                </a>
            @endif

            @if(($video->state == 'licensed') && ($video->rights != 'exc'))
                <a href="{{ url('/admin/pdfview/' . $video->alpha_id) }}" class="btn btn-primary" title="Download Terms And Conditions" download>
                    <i class="fa fa-print"></i>
                </a>
            @endif

            <a href="{{ url('/admin/nsfw/'.$video->alpha_id) }}" class="btn btn-primary" title="Flag NSFW">
                <i class="fa fa-flag"></i>
            </a>
        </div>

        <div class="clearfix"></div>
    </div>
</div>