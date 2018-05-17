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
        @if(count($contact->comments))
            @foreach($contact->comments as $comment)
                <p>{{ $comment->comment }}<br><br><strong class="pull-right">{{ $comment->user->username }}
                        | {{ $comment->created_at->diffForHumans() }}</strong></p>
                <br>
                <hr>
            @endforeach
        @else
            <p>No Comments</p>
        @endif
    </div>

    <div class="panel-footer">
        <div class="form-group">
            <label for="comment">Add a comment</label>
            <textarea class="form-control" id="comment" name="comment">{{ old('comment') }}</textarea>
        </div>

        <span class="clearfix"></span>
    </div>
</div>