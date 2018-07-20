<div class="col-lg-3">
    <div class="panel panel-primary" data-collapsed="0">
        <div class="panel-heading">
            <div class="panel-title">Comments</div>
            <div class="panel-options">
                <a href="#" data-rel="collapse">
                    <i class="fa fa-angle-down"></i>
                </a>
            </div>
        </div>

        <div class="panel-body" style="display: block;">
            @if(count($comments))
                @foreach($comments as $comment)
                    <p>{{ $comment->comment }}
                        <br><br>
                        <strong class="">
                            By {{ ucwords($comment->user->full_name) }} |
                            {{ $comment->created_at->diffForHumans() }}
                        </strong>
                    </p>
                    <br>
                    <hr>
                @endforeach

            <div class="text-center">
                {{ $comments->links() }}
            </div>
            @else
                <p>No Comments</p>
            @endif
        </div>

        <form method="POST" action="{{ route('comment.store') }}" accept-charset="UTF-8">
            <div class="panel-footer">
                <div class="form-group">
                    <label for="comment">Add a comment</label>
                    <textarea class="form-control" id="comment" name="comment" placeholder="Add a comment here...">{{ old('comment') }}</textarea>
                    <input type="hidden" name="contact_id" value="{{$contact->id}}">
                </div>
                <span class="clearfix"></span>
                <div class="row">
                    <div class="col-md-12">
                        {{ csrf_field() }}
                        {{ method_field('POST') }}
                        <button type="submit" class="btn btn-success pull-right">Add Comment</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>