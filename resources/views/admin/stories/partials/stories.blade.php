<table class="table table-striped pages-table">
    <tr class="table-header">
        <th style="width: 25%">Thumbnail</th>
        <th style="width: 30%">Title / Excerpt</th>
        <th>Author</th>
        <th>Updated At</th>
        <th>Actions</th>
    </tr>
    @foreach($stories as $story)
        <tr>
            <td>
                <img src="{{ ($story['thumb']) ?: '/assets/frontend/images/placeholder.png' }}" class="story_pic"/>
            </td>
            <td>
                <strong>{{ TextHelper::shorten($story['title'], 250) }}</strong>
                <p><br />{{ $story['excerpt'] }}</p>
            </td>
            <td>
                {{ $story['author'] }}
            </td>
            <td>
                {{ date('jS M Y h:i:s',strtotime($story['date_ingested'])) }}
            </td>
            <td>
                    <span>
                        <label class="btn btn-primary">
                            <input type="checkbox" value="{{ $story['id'] }}" name="stories" autocomplete="off"
                                   style="font-size: 20px;">
                        </label>
                    <!-- <a href="{{ url('admin/stories/edit') . '/' . $story['wp_id'] }}" class="btn btn-xs btn-info"><span class="fa fa-edit"></span> Edit</a>
						<a href="{{ url('admin/stories/delete') . '/' . $story['wp_id'] }}" class="btn btn-xs btn-danger js-delete"><span class="fa fa-trash"></span> Delete</a> -->
                    </span>
            </td>
        </tr>
    @endforeach
</table>

<div class="text-center">
    {{ $stories->appends(request()->except('page'))->render() }}
</div>
