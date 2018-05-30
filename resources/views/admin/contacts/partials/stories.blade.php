<div class="row">
    <div class="col-md-12">
        @if($contact)
            @foreach($contact->videos as $video)
                <div class="col-md-4" style="min-height: 200px;">
                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title">
                                <a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}">
                                    {{ $video->title }}
                                </a>
                            </div>

                            <div class="panel-options">
                                <a href="#" data-rel="collapse">
                                    <i class="fa fa-angle-down"></i>
                                </a>
                            </div>
                        </div>

                        <div class="panel-body" style="display: block;">
                            <div class="text-center">
                                {!! App\Libraries\VideoHelper::getVideoHTML($video, true, 'edit') !!}
                            </div>
                        </div>

                        <div class="panel-footer">
                            <i class="{{ (key_exists($video->state, config('videos.icons'))) ? config('videos.icons')[$video->state] : '' }}"></i>
                            {{ ucfirst($video->state) }}
                        </div>
                    </div>
                </div>
            @endforeach
        @endif
    </div>
</div>