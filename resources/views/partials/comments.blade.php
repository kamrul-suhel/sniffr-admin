<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Comments</div>
        <div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>
    <div class="panel-body" style="display: block;">
        @if(!count($asset->comments))
            <p>No Comments</p>
        @endif

        @foreach($asset->comments as $comment)
            <p>
                {{ $comment->comment }}
            </p>
            <div class="text-right">
                {{ $comment->user->full_name }} |
                {{ $comment->created_at->diffForHumans() }}
                @if($user->isAdmin() || $comment->user_id == $user->id)
                    &nbsp
                    {!! Form::open([
                        'route' => ['comment.destroy', $comment->id],
                        'class' => 'pull-right',
                        'method' => 'DELETE'
                    ]) !!}
                    <button class="fa fa-trash-o"></button>
                    {{ Form::hidden('alpha_id', $asset->alpha_id) }}
                    {{ Form::hidden('asset_id', $asset->id) }}
                    {{ Form::hidden('asset_type', (str_contains(\Route::currentRouteName(), 'video') ? 'video' : 'story')) }}
                    {!! Form::close() !!}
                @endif
            </div>
            <hr>
        @endforeach
    </div>

    <div class="panel-footer">
        <form method="POST" action="{{ route('comment.store') }}" id="comment-form" name="comment-form"
              accept-charset="UTF-8" file="1" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            <input type="hidden" name="asset_id" value="{{ $asset->id }}"/>
            <input type="hidden" name="asset_type" value="{{ (str_contains(\Route::currentRouteName(), 'video') ? 'video' : 'story') }}"/>
            <input type="hidden" name="alpha_id" value="{{ $asset->alpha_id }}"/>
            <div class="form-group">
                <label for="comment">Add a comment</label>
                <textarea class="form-control" id="comment" name="comment">{{ old('comment') }}</textarea>
            </div>
            <input type="submit" value="Add Comment" class="btn btn-success pull-right"/>
        </form>
        <span class="clearfix"></span>
    </div>
</div>
