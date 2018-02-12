@extends('client.master')

@section('content')
<div id="admin-container">
    <div class="admin-section-title">
    @if(isset($video))
        <h3>{{ $video->title }}</h3>
    @endif
    </div>

    @if(isset($video))
    <?php
        $date1 = now();
        $date2 = new DateTime($video->campaigns[0]->pivot->created_at);

        $diff = $date2->diff($date1);

        $exclusivity = 48 - ($diff->h + ($diff->days*24));
    ?>
    <div class="row">
        <div class="col-sm-6">
            <div class="panel panel-default" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">
                        {{ ucfirst($video->state) }} - Exclusivity: {{ $exclusivity < 0 ? 'Expired' : $exclusivity.' Hours' }}
                    </div>

                    <div class="panel-options">
                        <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                    </div>
                </div>

                <div class="panel-body" style="display: block;">
                    <div class="text-center">
                        {!! App\Libraries\VideoHelper::getVideoHTML($video, true) !!}
                    </div>
                </div>

                <div class="panel-footer">
                    <div class="text-right">
                        @if($video->campaigns[0]->pivot->state != 'yes')
                            @if(!empty($video->file))
                            <a href="{{ url('client/dailies/status/yes/'.$video->alpha_id ) }}" class="btn btn-success" title="Will Use">Will Use</a>
                            @else
                            <a href="{{ url('client/dailies/status/yes/'.$video->alpha_id ) }}" class="btn btn-success" title="Will Use">Will Use</a>
                            @endif
                        @endif
                        @if($video->campaigns[0]->pivot->state != 'maybe')
                        <a href="{{ url('client/dailies/status/maybe/'.$video->alpha_id ) }}" class="btn btn-warning" title="Might Use">Might Use</a>
                        @endif
                        @if($video->campaigns[0]->pivot->state != 'no')
                        <a href="{{ url('client/dailies/status/no/'.$video->alpha_id ) }}" class="btn btn-danger" title="Won't Use">Won't use</a>
                        @endif

                        @if(!empty($video->file_watermark))
                        <a href="{{ url('/download/'.$video->alpha_id.'/watermark') }}" title="Download" class="btn btn-default download">
                            <i class="fa fa-cloud-download"></i> Download
                        </a>
                        @else
                        <a href="{{ url('client/dailies/request/'.$video->alpha_id) }}" class="btn btn-default" title="File not received">
                            <i class="fa fa-exclamation-circle"></i> Request File
                        </a>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        @if($video->description)
        <div class="col-sm-6">
            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Description</div>

                    <div class="panel-options">
                        <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                    </div>
                </div>

                <div class="panel-body" style="display: block;">
                    <p>{{ $video->description }}</textarea>
                </div>
            </div>
        </div>
        @endif

        <div class="col-sm-6">
            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Video Details:</div>
                    <div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a></div>
                </div>

                <div class="panel-body" style="display: block;">
                    {{ $video->created_at ? 'Uploaded Date: '.$video->created_at : '' }}
                    {{ $video->date_filmed ? 'Filmed Date: '.$video->date_filmed : '' }}
                    {{ $video->location ? 'Location: '.$video->location : '' }}
                    {{ $video->duration ? 'Duration: '.$video->duration : '' }}
                </div>
            </div>
        </div>

        @if(count($video->tags))
        <div class="col-sm-6">
            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Tags:</div>
                    <div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a></div>
                </div>

                <div class="panel-body" style="display: block;">
                    @foreach($video->tags as $tag)
                        <span class="tag label label-info">{{ $tag->name }}</span>
                    @endforeach
                </div>
            </div>
        </div>
        @endif
    </div>
    @else
    <h2>Video not found</h2>
    @endif
</div>
@stop
