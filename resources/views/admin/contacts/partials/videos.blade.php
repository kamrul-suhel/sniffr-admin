<div class="gallery-env">
    <div class="col-md-12">
        @if($contact)

            @php
                $currentDay = '';
            @endphp
            <div class="col-lg-12">
                @foreach($contact->videos as $video)
                    @php
                        $order_column = $video->state == 'licensed' ? 'licensed_at' : 'created_at';
                        $date = \Carbon\Carbon::parse($video->{$order_column})->isToday() ? 'Today' : date('jS M',strtotime($video->{$order_column}))
                    @endphp
                    @if($currentDay != $date)
                        @php
                            $currentDay = $date;
                        @endphp
                        <div class="col-xs-12 date-header">
                            <h2>
                                {{ $date }}
                            </h2>
                        </div>
                    @endif

                    <div class="col-sm-6 col-md-4" id="video-{{ $video->alpha_id }}">
                        @switch($video->state)
                            @case('rejected')
                            @case('problem')
                            @php
                                $panelColour = 'danger';
                            @endphp
                            @break
                            @case('licensed')
                            @php
                                $panelColour = 'success';
                            @endphp
                            @break
                            @case('restricted')
                            @php
                                $panelColour = 'warning';
                            @endphp
                            @break
                            @default
                            @php
                                $panelColour = 'default';
                            @endphp
                        @endswitch

                        <article class="album {{ $panelColour }}">
                            <header>
                                {!! App\Libraries\VideoHelper::getVideoHTML($video, false, 'edit') !!}

                                <a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}" class="album-options">
                                    <i class="fa fa-pencil"></i>
                                    Edit
                                </a>
                            </header>

                            <section class="album-info">
                                <h3><a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}">{{ $video->title }}</a></h3>

                                <p>{{ $video->description }}</p>
                            </section>

                            <footer>

                                <div class="album-options">
                                    @if($video->trashed())
                                        <a href="{{ url('admin/videos/restore/'.$video->alpha_id) }}" title="Remove from trash" class="undelete">
                                            <i class="fa fa-upload"></i>
                                        </a>
                                    @else
                                        @if($video->file_watermark)
                                            <a href="{{ url('/download/'.$video->alpha_id) }}" title="Download Video" class="js-download">
                                                <i class="fa fa-cloud-download"></i>
                                            </a>
                                        @elseif($video->file)
                                            <a href="{{ url('/download/'.$video->alpha_id.'/regular') }}" title="Download Video" download>
                                                <i class="fa fa-cloud-download"></i>
                                            </a>
                                        @endif
                                        @if($video->state == 'problem' || $video->state == 'rejected')
                                            <a href="{{ url('admin/videos/delete/'.$video->alpha_id) }}" title="Delete Video" class="js-delete">
                                                <i class="fa fa-trash-o"></i>
                                            </a>
                                        @endif
                                        @if($video->state != 'new')
                                            @if($video->rights == 'ex' || $video->rights == 'nonex')
                                                <a href="{{ url('admin/pdfview/'.$video->alpha_id) }}" title="Download License">
                                                    <i class="fa fa-arrow-circle-o-down"></i>
                                                </a>
                                            @elseif($video->hasContract())
                                                <a href="{{ route('contract.download', ['id' => $video->currentContract->reference_id]) }}" title="Download Contract">
                                                    <i class="fa fa-arrow-circle-down"></i>
                                                </a>
                                            @endif
                                        @endif
                                        <a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}" title="Edit Video">
                                            <i class="fa fa-pencil"></i>
                                        </a>
                                    @endif
                                </div>
                            </footer>
                        </article>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
</div>