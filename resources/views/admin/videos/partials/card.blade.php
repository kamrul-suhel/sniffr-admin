<header class="album-info album-grey">
    <div class="row padded-bottom">
        <div class="col-sm-12">
            <h3><a href="{{ url('admin/videos/edit/'.$asset->alpha_id) }}">{{ $asset->title }}</a></h3>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12">
            @include('admin.contacts.partials.link')

            <button id="comments" class="btn btn-mini-info pull-right" type="button" @click="showModal({{ json_encode($asset) }})"><i class="fa fa-comments"></i> ({{$asset->comments->count()}})</button>

            @if($asset->source)
                <a href="{{ $asset->source }}" class="btn btn-mini-info pull-right" title="View Source" target="_blank">
                    <i class="fa fa-info"></i>
                </a>
            @endif

            @if($asset->wp_id)
                <a href="{{ 'https://'.(env('APP_ENV') == 'prod' ? 'www' : 'testing').'.unilad.co.uk/?p='.$asset->wp_id.'&preview=true' }}" class="btn btn-mini-info pull-right" title="View on Wordpress" target="_blank">
                    <i class="fa fa-wordpress"></i> @if($asset->author) {{ $asset->author }} @endif
                </a>
            @endif
        </div>
    </div>
</header>

<section>
    {!! App\Libraries\VideoHelper::getVideoHTML($asset, false, 'edit') !!}
</section>

<footer>
    <div class="album-images-count">
        @if($asset->state == 'new')
            @include('admin.assets.partials.priority')
        @endif

        @include('admin.assets.partials.assigned')

        @if($asset->trashed())
            <a href="{{ url('admin/videos/restore/'.$asset->alpha_id) }}" title="Remove from trash" class="undelete">
                <i class="fa fa-upload"></i>
            </a>
        @else
            @if($asset->file_watermark)
                <a href="{{ url('/download/'.$asset->alpha_id) }}" title="Download Video" class="js-download">
                    <i class="fa fa-cloud-download"></i>
                </a>
            @elseif($asset->file)
                <a href="{{ url('/download/'.$asset->alpha_id.'/regular') }}" title="Download Video" download>
                    <i class="fa fa-cloud-download"></i>
                </a>
            @endif
            @if($asset->state == 'problem' || $asset->state == 'rejected')
                <a href="{{ url('admin/videos/delete/'.$asset->alpha_id) }}" title="Delete Video" class="js-delete">
                    <i class="fa fa-trash-o"></i>
                </a>
            @endif
            @if($asset->state != 'new')
                @if($asset->rights == 'ex' || $asset->rights == 'nonex')
                    <a href="{{ url('admin/pdfview/'.$asset->alpha_id) }}" title="Download License">
                        <i class="fa fa-arrow-circle-o-down"></i>
                    </a>
                @elseif($asset->hasContract())
                    <a href="{{ route('contract.download', ['id' => $asset->currentContract->reference_id]) }}" title="Download Contract">
                        <i class="fa fa-arrow-circle-down"></i>
                    </a>
                @endif
            @endif
        @endif
    </div>

    <div class="album-options">
        @if(!$asset->trashed())
            @if($asset->state == 'new' && ($asset->rights == 'ex' || $asset->rights == 'nonex'))
                <a href="#" data-id="{{ $asset->alpha_id }}" class="btn btn-mini btn-mini-border text-danger js-state rejected" title="Reject Video"><i class="fa fa-times"></i></a>
                <a href="#" data-id="{{ $asset->alpha_id }}" class="btn btn-mini btn-mini-border text-success js-state accepted" title="Accept Video"><i class="fa fa-check"></i> Accept</a>
            @elseif($asset->state == 'pending' && ($asset->rights == 'ex' || $asset->rights == 'nonex'))
                <a href="#" data-id="{{ $asset->alpha_id }}" class="btn btn-mini btn-mini-border text-warning js-state restricted" title="Restricted License Video"><i class="fa fa-exclamation-triangle"></i></a>
                <a href="#" data-id="{{ $asset->alpha_id }}" class="btn btn-mini btn-mini-border text-danger js-state problem" title="Problem Video"><i class="fa fa-times"></i></a>
                <a href="#" data-id="{{ $asset->alpha_id }}" class="btn btn-mini btn-mini-border text-success js-state accepted" title="Accept Video"><i class="fa fa-check"></i> Accept</a>
            @elseif($asset->state == 'licensed')
                <i class="fa fa-check" title="Licensed"></i> Licensed
            @elseif($asset->state == 'accepted')
                @if(($asset->reminders)AND($asset->more_details_sent))
                    <i class="fa fa-clock-o" title="Reminder sent"></i>
                    Reminder {{ $asset->reminders }}
                    Sent:
                    {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$asset->more_details_sent)->diffForHumans() }}
                @elseif($asset->more_details_sent)
                    <i class="fa fa-clock-o" title="More details sent"></i>
                    More details sent:
                    {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$asset->more_details_sent)->diffForHumans() }}
                @endif
            @elseif($asset->state == 'rejected')
                <i class="fa fa-times" title="Rejected"></i> Rejected
            @elseif($asset->state == 'problem')
                <i class="fa fa-exclamation" title="Problem"></i> Problem
            @elseif($asset->state == 'restricted')
                <i class="fa fa-exclamation-triangle" title="Restricted"></i> Restricted
            @else
                <i class="fa fa-youtube-play"></i> {{ ucfirst($asset->state) }}
            @endif

            @if($asset->state != 'new' && $asset->state != 'accepted')
                | <i class="fa fa-{{ $asset->rights == 'nonexc' ? 'times' : 'check' }}-circle"></i> {{ $asset->rights == 'nonexc' ? 'Non-' : '' }}Ex{{ $asset->rights != 'ex' ? ' Chaser' : '' }}
            @endif
        @endif
    </div>
</footer>