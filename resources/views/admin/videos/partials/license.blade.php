@if($video)
    <div class="row">
        <div class="col-sm-6">
            <div class="panel panel-{{ config('videos.colors')[$video->state] }}" data-collapsed="0">
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
                        @if($video->state == 'pending'||$video->state == 'problem'||$video->state == 'licensed'||$video->state=='restricted')
                            @if($video->state != 'licensed')
                                <a href="{{ url('admin/videos/status/licensed/'.$video->alpha_id ) }}"
                                   class="btn btn-primary btn-success">License</a>
                            @endif
                            @if($video->state != 'restricted')
                                <a href="{{ url('admin/videos/status/restricted/'.$video->alpha_id ) }}"
                                   class="btn btn-primary btn-warning">Restricted</a>
                            @endif
                            @if($video->state != 'problem')
                                <a href="{{ url('admin/videos/status/problem/'.$video->alpha_id ) }}"
                                   class="btn btn-primary btn-danger">Problem</a>
                            @endif
                        @elseif($video->state == 'new')
                            <a href="{{ url('admin/videos/status/accepted/'.$video->alpha_id ) }}"
                               class="btn btn-primary btn-success js-state-accept">Accept</a>
                            <a href="{{ url('admin/videos/status/rejected/'.$video->alpha_id ) }}"
                               class="btn btn-primary btn-danger">Reject</a>
                        @elseif($video->state == 'accepted')
                            <div class="pull-left">
                                @if($video->reminders)
                                    Reminder {{ $video->reminders }}
                                    Sent: {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$video->more_details_sent)->diffForHumans() }}
                                    <a href="{{ url('admin/videos/remind/'.$video->alpha_id ) }}"
                                       class="btn btn-primary btn-danger">Send Reminder</a>
                                @else
                                    More Details
                                    Requested: {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$video->more_details_sent)->diffForHumans() }}
                                    <a href="{{ url('admin/videos/remind/'.$video->alpha_id ) }}"
                                       class="btn btn-primary btn-danger">Send Reminder</a>
                                @endif
                            </div>
                            <a href="{{ url('admin/videos/status/rejected/'.$video->alpha_id ) }}"
                               class="btn btn-primary btn-danger">Reject</a>
                        @elseif($video->state == 'rejected')
                            <a href="{{ url('admin/videos/status/accepted/'.$video->alpha_id ) }}"
                               class="btn btn-primary btn-success">Accept</a>
                        @endif

                        @if($video->file)
                            <a href="{{ url('/download/'.$video->alpha_id) }}"
                               class="btn btn-primary{{ $video->file_watermark ? ' js-download' : '' }}"
                               title="Download Video" download><i class="fa fa-download"></i></a>
                        @endif
                        <a href="{{ url('/admin/pdfview/'.$video->alpha_id) }}" class="btn btn-primary"
                           title="Download License" download><i class="fa fa-print"></i></a>
                        <a href="{{ url('/admin/nsfw/'.$video->alpha_id) }}" class="btn btn-primary"
                           title="Flag NSFW"><i class="fa fa-flag"></i></a>
                    </div>

                    <div class="clearfix"></div>
                </div>
            </div>
        </div>

        <div class="col-sm-6">
            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Uploaded By</div>
                    <div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                    </div>
                </div>

                <div class="panel-body" style="display: block;">
                    @if($video->contact_id!=0)
                        <h3>
                            <a href="{{ url('admin/contacts/edit/'.$video->contact->id) }}">{{ $video->contact->full_name ? $video->contact->full_name : 'Not submitted' }}</a>
                        </h3>
                        <p><a href="mailto:{{ $video->contact->email }}">{{ $video->contact->email }}</a></p>
                    @else
                        <h3>No Contact Details</h3>
                    @endif
                </div>
            </div>

            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Comments</div>
                    <div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                    </div>
                </div>

                <div class="panel-body" style="display: block;">
                    @if(!count($video->comments))
                        <p>No Comments</p>
                    @endif

                    @foreach($video->comments as $comment)
                        <p>
                            {{ $comment->comment }}
                        </p>
                        <div class="text-right">
                            {{ $comment->user->username }} |
                            {{ $comment->created_at->diffForHumans() }}
                            @if($admin_user->isAdmin() || $comment->user_id == $admin_user->id)
                                &nbsp
                                {!! Form::open([
                                    'route' => ['comment.destroy', $comment->id],
                                    'class' => 'pull-right',
                                    'method' => 'DELETE'
                                ]) !!}
                                <button class="fa fa-trash-o"></button>
                                {{ Form::hidden('alpha_id', $video->alpha_id) }}
                                {{ Form::hidden('video_id', $video->id) }}
                                {!! Form::close() !!}
                            @endif
                        </div>
                        <hr>
                    @endforeach
                </div>

                <div class="panel-footer">
                    <form method="POST" action="{{ route('comment.store') }}" id="comment-form"
                          name="comment-form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                        <input type="hidden" name="video_id" value="{{ $video->id }}"/>
                        <input type="hidden" name="alpha_id" value="{{ $video->alpha_id }}"/>
                        <div class="form-group">
                            <label for="comment">Add a comment</label>
                            <textarea class="form-control" id="comment"
                                      name="comment">{{ old('comment') }}</textarea>
                        </div>

                        <input type="submit" value="Add Comment" class="btn btn-success pull-right"/>
                    </form>
                    <span class="clearfix"></span>
                </div>
            </div>


            @if($video->more_details)
                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">
                        <div class="panel-title">Rights</div>
                        <div class="panel-options"><a href="#" data-rel="collapse"><i
                                        class="fa fa-angle-down"></i></a></div>
                    </div>

                    <div class="panel-body" style="display: block;">
                        <p class="{{ $video->contact_is_owner ? 'text-success' : 'text-danger' }}">
                            <strong>{!! $video->contact_is_owner ? '<i class="fa fa-check"></i> Contact is owner' : '<i class="fa fa-times"></i> Does not own video' !!}</strong>
                        </p>
                        @if($video->submitted_elsewhere)
                            <p class="text-warning"><strong><i class="fa fa-exclamation"></i> Submitted
                                    to: {{ $video->submitted_where }}</strong></p>
                        @endif
                        <p class="{{ $video->allow_publish ? 'text-success' : 'text-danger' }}">
                            <strong>{!! $video->allow_publish ? '<i class="fa fa-check"></i> H' : '<i class="fa fa-times"></i> Not h' !!}
                                appy to publish</strong></p>
                        <p class="{{ $video->permission ? 'text-success' : 'text-danger' }}">
                            <strong>{!! $video->permission ? '<i class="fa fa-check"></i> Has' : '<i class="fa fa-times"></i> Does not have' !!}
                                permission</strong></p>
                        <p class="{{ $video->is_exclusive ? 'text-success' : 'text-danger' }}">
                            <strong>{!! $video->is_exclusive ? '<i class="fa fa-check"></i> Is' : '<i class="fa fa-times"></i> Is not' !!}
                                exclusive</strong></p>
                        {!! $video->file ? '' : '<p class="text-warning"><strong><i class="fa fa-exclamation"></i> Need to source video file</strong></p>' !!}
                    </div>
                </div>
            @endif
        </div>
    </div>
@endif