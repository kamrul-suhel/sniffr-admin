@extends('client.master')

@section('content')
<div id="admin-container">
    <div class="admin-section-title">
    @if(isset($video))
        <h3>{{ $video->title }}</h3>
    @endif
    </div>

    @if(isset($video))
    <div class="row">
        <div class="col-sm-6">
            <div class="panel panel-default" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">
                        {{ ucfirst($video->state) }}
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
                    <a href="{{ url('client/videos/interest/'.$video->alpha_id) }}" class="js-state btn btn-default" title="Interested in video? Let our team know">
                        <i class="fa fa-envelope"></i> Request Interest
                    </a>
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
                    {{ $video->created_at ? '<p>Uploaded Date: '.$video->created_at.'</p>' : '' }}
                    {{ $video->date_filmed ? '<p>Filmed Date: '.$video->date_filmed.'</p>' : '' }}
                    {{ $video->location ? '<p>Location: '.$video->location.'</p>' : '' }}
                    {{ $video->duration ? '<p>Duration: '.$video->duration.'</p>' : '' }}
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
