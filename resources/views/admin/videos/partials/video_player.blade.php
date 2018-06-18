<div class="col-sm-6">
    <div class="panel panel-{{ config('videos.colors')[$video->state] }}" data-collapsed="0">
        <div class="panel-heading">
            <div class="panel-title">
                {{ ucfirst($video->state) }}
                @if($video->state=='licensed')
                    |
                    <i class="fa fa-{{ $video->rights == 'nonexc' ? 'times' : 'check' }}-circle"></i> {{ $video->rights == 'nonexc' ? 'Non-' : '' }}Ex{{ $video->rights != 'ex' ? ' Chaser' : '' }}
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
    </div>
</div>