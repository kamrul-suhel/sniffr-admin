<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">
            @if($asset)
                {{ ucfirst($asset->state) }}
                @if($asset->state=='licensed')
                    |
                    <i class="fa fa-{{ $asset->rights == 'nonexc' ? 'times' : 'check' }}-circle"></i> {{ $asset->rights == 'nonexc' ? 'Non-' : '' }}
                    Ex{{ $asset->rights != 'ex' ? ' Chaser' : '' }}
                    Video
                @endif

                @if($asset->trashed())
                    - Deleted
                @endif
            @endif
        </div>

        @if($asset)
            <div class="pull-right">
                @if($asset->state == 'accepted')
                    @if($asset->reminders)
                        Reminder {{ $asset->reminders }}
                        Sent: {{ ($asset->more_details_sent) ? \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $asset->more_details_sent)->diffForHumans() : '' }}
                        <a href="{{ url('admin/videos/remind/' . $asset->alpha_id ) }}"
                           class="btn btn-primary btn-danger">
                            Send Reminder
                        </a>
                    @else
                        More Details
                        Requested: {{ ($asset->more_details_sent) ? \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $asset->more_details_sent)->diffForHumans() : '' }}
                        <a href="{{ url('admin/videos/remind/' . $asset->alpha_id ) }}"
                           class="btn btn-primary btn-danger">
                            Send Reminder
                        </a>
                    @endif
                    <a href="{{ url('admin/videos/status/rejected/' . $asset->alpha_id ) }}"
                       class="btn btn-primary btn-danger">
                        Reject
                    </a>
                @endif
            </div>
        @endif
    </div>

    <div class="panel-body" style="display: block;">
        <div class="text-center">
            @if($asset)
                {!! App\Libraries\VideoHelper::getVideoHTML($asset, true, 'edit') !!}
            @else
                <div class="row">
                    <div class="col-xs-12">
                        <img class="img-responsive" src="/assets/images/placeholder.png" />
                    </div>
                </div>
            @endif
        </div>
    </div>

    <div class="panel-footer">
        @if($asset)
        <div class="text-right">
            @if(!$asset->hasContract())
                @if($asset->state == 'new' && ($asset->rights == 'ex' || $asset->rights == 'nonex'))
                    <a href="{{ url('admin/videos/status/accepted/' . $asset->alpha_id ) }}"
                       class="btn btn-primary btn-success js-state-accept">
                        Accept
                    </a>
                    <a href="{{ url('admin/videos/status/rejected/' . $asset->alpha_id ) }}"
                       class="btn btn-primary btn-danger">Reject
                    </a>
                @elseif($asset->state == 'rejected')
                    <a href="{{ url('admin/videos/status/accepted/' . $asset->alpha_id ) }}"
                       class="btn btn-primary btn-success">
                        Accept
                    </a>
                @endif
            @endif

            @if($asset->file)
                <a href="{{ url('/download/'.$asset->alpha_id) }}"
                   class="btn btn-primary{{ $asset->file_watermark ? ' js-download' : '' }}" title="Download Video"
                   download>
                    <i class="fa fa-cloud-download"></i>
                </a>
            @endif

            @if($asset->rights == 'ex')
                <a href="{{ url('admin/pdfview/'.$asset->alpha_id) }}" class="btn btn-primary" title="Download License">
                    <i class="fa fa-arrow-circle-o-down"></i>
                </a>
            @elseif($asset->hasContract())
                <a href="{{ route('contract.download', ['id' => $asset->currentContract->reference_id]) }}"
                   class="btn btn-primary" title="Download Contract">
                    <i class="fa fa-arrow-circle-down"></i>
                </a>
            @endif

            <a href="{{ url('/admin/nsfw/'.$asset->alpha_id) }}" class="btn btn-primary" title="Flag NSFW">
                <i class="fa fa-flag"></i>
            </a>
        </div>

        <div class="clearfix"></div>
        @endif
    </div>
</div>