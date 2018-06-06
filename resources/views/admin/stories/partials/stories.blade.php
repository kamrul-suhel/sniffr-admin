<table class="table table-striped pages-table">
    <tr class="table-header">
        <th style="width: 25%">Title</th>
        <th style="width: 30%">Excerpt</th>
        <th>Assigned To</th>
        <th>Created At</th>
        <th>Actions</th>
    </tr>
    @foreach($stories as $story)
        <tr>
            <td>
                <strong>{{ TextHelper::shorten($story['title'], 250) }}</strong>
                <img src="{{ ($story['thumb']) ?: '/assets/frontend/images/placeholder.png' }}" class="story_pic"/>
            </td>
            <td>
                {{ $story['excerpt'] }}
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