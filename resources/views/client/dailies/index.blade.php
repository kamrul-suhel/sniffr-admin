@extends('client.master')

@section('content')
    <div class="admin-section-title bottom-padding">
        <div class="row">
            <div class="col-md-4">
                <h3><i class="fa fa-youtube-play"></i> {{ ucfirst($state) }} {{ $campaign ? $campaign->name : '' }} Videos</h3>
            </div>

            <div class="col-md-6 col-md-offset-2">

                <div class="row">

                    <div class="col-md-4">
                        <form id="campaigns-form" method="get" role="form" class="search-form-full">
                        @if(isset($campaigns))
                            <div class="form-group">
                                <select id="campaign" name="campaign_id" class="selectpicker form-control">
                                    <option value="">Select Campaign</option>
                                    @foreach($campaigns as $campaign)
                                        <option value="{{ $campaign->id }}"{{ session('campaign_id') == $campaign->id ? ' selected="selected"' : '' }}>{{ $campaign->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        @endif
                        </form>
                    </div>

                    <div class="col-md-8">
                        <form id="search-form" method="get" role="form" class="search-form-full">
                            <div class="form-group">
                                <input type="text" class="form-control" name="s" id="search-input" placeholder="Search..." value="{{ Request::get('s') }}"> <i class="fa fa-search"></i>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    </div>

    <div class="clear"></div>

    @if(!count($videos))
        <p>Sorry, there are no videos to show.</p>
    @elseif(!session('campaign_id'))
        <p>Please select a campaign.</p>
    @else

    <div class="gallery-env">
        <div class="row">
            @foreach($videos as $video)
            <div class="col-sm-6 col-md-4" id="video-{{ $video->alpha_id }}">
                <article class="album">
                    <header>
                        {!! App\Libraries\VideoHelper::getVideoHTML($video) !!}
                    </header>

                    <section class="album-info">
                        <h3><a href="{{ url('client/dailies/view/'.$video->alpha_id) }}">{{ $video->title }}</a></h3>

                        <p>{{ $video->description }}</p>
                    </section>

                    <footer>
                        <div class="album-images-count">
                            <?php
                                $date1 = now();
                                $date2 = new DateTime($video->campaigns[0]->pivot->created_at);

                                $diff = $date2->diff($date1);

                                $exclusivity = 48 - ($diff->h + ($diff->days*24));
                            ?>
                            @if($video->campaigns[0]->pivot->state != 'yes')
                                @if(!empty($video->file))
                                <a href="{{ url('client/dailies/status/yes/'.$video->alpha_id ) }}" class="text-success js-state" title="Will Use"><i class="fa fa-check"></i></a>
                                @else
                                <a href="{{ url('client/dailies/status/yes/'.$video->alpha_id ) }}" class="text-success js-state" title="Will Use"><i class="fa fa-check"></i></a>
                                @endif
                            @endif
                            @if($video->campaigns[0]->pivot->state != 'maybe')
                            <a href="{{ url('client/dailies/status/maybe/'.$video->alpha_id ) }}" class="text-warning js-state" title="Might Use"><i class="fa fa-question-circle"></i></a>
                            @endif
                            @if($video->campaigns[0]->pivot->state != 'no')
                            <a href="{{ url('client/dailies/status/no/'.$video->alpha_id ) }}" class="text-danger js-state" title="Won't Use"><i class="fa fa-times"></i></a>
                            @endif
                        </div>

                        <div class="album-options">
                            Exclusivity: {{ $exclusivity < 0 ? 'Expired' : $exclusivity.' Hours' }}
                        </div>

                        <div class="album-options">
                            @if(!empty($video->file_watermark))
                            <a href="{{ url('/download/'.$video->alpha_id.'/watermark') }}" title="Download" class="download">
                                <i class="fa fa-cloud-download"></i>
                            </a>
                            @else
                            <a href="{{ url('client/dailies/request/'.$video->alpha_id) }}" class="js-state" title="File not received">
                                <i class="fa fa-exclamation-circle"></i>
                            </a>
                            @endif
                        </div>
                    </footer>
                </article>
            </div>
            @endforeach

            <div class="text-center"><?= $videos->appends(Request::only('s'))->render(); ?></div>
        </div>
    </div>
    @endif
@stop
