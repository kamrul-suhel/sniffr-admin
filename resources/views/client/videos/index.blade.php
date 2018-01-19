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

                        <a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}" class="album-options">
                            <i class="fa fa-pencil"></i>
                            Edit
                        </a>
                    </header>

                    <section class="album-info">
                        <h3><a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}"><?php if(strlen($video->title) > 25){ echo substr($video->title, 0, 25) . '...'; } else { echo $video->title; } ?></a></h3>

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
                                <a href="{{ url('client/videos/status/yes/'.$video->alpha_id ) }}" class="text-success state" title="Will Use"><i class="fa fa-check"></i></a>
                                @else
                                <a href="{{ url('client/videos/status/yes/'.$video->alpha_id ) }}" class="text-success state" title="Will Use"><i class="fa fa-check"></i></a>
                                @endif
                            @endif
                            @if($video->campaigns[0]->pivot->state != 'maybe')
                            <a href="{{ url('client/videos/status/maybe/'.$video->alpha_id ) }}" class="text-warning state" title="Might Use"><i class="fa fa-question-circle"></i></a>
                            @endif
                            @if($video->campaigns[0]->pivot->state != 'no')
                            <a href="{{ url('client/videos/status/no/'.$video->alpha_id ) }}" class="text-danger state" title="Won't Use"><i class="fa fa-times"></i></a>
                            @endif
                        </div>

                        <div class="album-options">
                            Exclusivity: {{ $exclusivity < 0 ? 'Expired' : $exclusivity.' Hours left' }}
                        </div>

                        <div class="album-options">
                            @if(!empty($video->file_watermark))
                            <a href="{{ url('/download/'.$video->alpha_id.'/watermark') }}" title="Download" class="download">
                                <i class="fa fa-cloud-download"></i>
                            </a>
                            @else
                            <a href="{{ url('client/videos/request/'.$video->alpha_id) }}" class="state" title="File not received">
                                <i class="fa fa-exclamation-circle"></i>
                            </a>
                            @endif
                        </div>
                    </footer>
                </article>
            </div>
            @endforeach

            <div class="clear"></div>

            <div class="text-center"><?= $videos->appends(Request::only('s'))->render(); ?></div>
        </div>
    </div>

    @endif

    @section('javascript')
    <script>
        (function($){
            $('.selectpicker').selectpicker('refresh');

            $('#search-form').change(function() {
                $(this).submit();
            });

            $('.state').click(function(e){
                e.preventDefault();
                var dataUrl = $(this).attr('href');
                var parseUrl = dataUrl.split('/');
                var state = parseUrl[6];
                var alertType;

                swal({  title: 'loading..', icon: 'info', buttons: true, closeModal: true });
                $('.swal-button-container').css('display','none');

                if(dataUrl) {
                    $.ajax({
                        type: 'GET',
                        url: dataUrl,
                        data: { get_param: 'value' },
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            if(data.status=='success') {
                                if(data.remove=='yes'){
                                    $('#video-'+data.video_id).fadeOut();
                                }

                                switch(state) {
                                    case 'yes':
                                        alertType = 'success';
                                        break;
                                    case 'no':
                                        alertType = 'error';
                                        break;
                                    case 'maybe':
                                        alertType = 'warning';
                                        break;
                                    default:
                                        alertType = 'success';
                                }
                                swal({  title: data.message, icon: alertType, buttons: true, closeModal: true });
                                $('.swal-button-container').css('display','inline-block');
                            } else {
                                $('.swal-button-container').css('display','inline-block');
                            }
                        }
                    });
                }
            });

        })(jQuery);
    </script>
    @stop
    @include ('partials.videojs')
@stop
