<table class="table table-striped pages-table">
    <tr class="table-header">
        <th style="width: 25%">Title</th>
        <th style="width: 30%">Excerpt</th>
        <th>Assigned To</th>
        <th>Created At</th>
        <th>Actions</th>
    </tr>
    @foreach($videos as $video)
        <tr>
            <td>
                <strong>
                    {{ TextHelper::shorten($video['title'], 250) }}
                </strong>
                <img src="{{ ($video['thumb']) ?: '/assets/frontend/images/placeholder.png' }}" class="story_pic"/>
            </td>
            <td>
                {{ TextHelper::shorten($video['description'], 250) }}
            </td>
            <td>
                {{ $video['user_id'] }}
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