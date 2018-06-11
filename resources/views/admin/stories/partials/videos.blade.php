<table class="table table-striped pages-table">
    <tr class="table-header">
        <th style="width: 25%">Thumbnail</th>
        <th style="width: 30%">Title / Excerpt</th>
        <th>Author</th>
        <th>Updated At</th>
        <th>Actions</th>
    </tr>
    @foreach($videos as $video)
        <tr>
            <td>
                <img src="{{ ($video['thumb']) ?: '/assets/frontend/images/placeholder.png' }}" class="story_pic"/>
            </td>
            <td>
                <strong>{{ TextHelper::shorten($video['title'], 250) }}</strong>
                <p><br />{{ TextHelper::shorten($video['description'], 250) }}></p>
            </td>
            <td>
                @if($video['user_id']) {{ $video['user_id'] }} @else N/A @endif
            </td>
            <td>
                {{ date('jS M Y h:i:s',strtotime($video['date_created'])) }}
            </td>
            <td>
                <label class="btn btn-primary">
                    <input type="checkbox" value="{{ $video['id'] }}" name="videos" autocomplete="off">
                </label>
            </td>
        </tr>
    @endforeach
</table>

<div class="text-center">
    {{ $videos->appends(request()->except('page'))->render() }}
</div>
