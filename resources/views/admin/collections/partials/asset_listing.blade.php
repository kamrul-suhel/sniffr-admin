<tr class="text-center">
    <td>
        <span class="{{ $type == 'video' ? 'fa fa-youtube-play' : 'fa fa-tasks'  }}"></span>
    </td>
    <td>
        <small>{{ $collectionAsset->collection->name }}</small>
        <br>
        <small>{{ Carbon\Carbon::parse($collectionAsset->collection->created_at)->diffForHumans() }}</small>
        <br>
        <span class="{{ $collectionAsset->collection->status == 'closed' ? 'fa fa-times' : 'fa fa-check'  }}"></span>
    </td>
    <td>
        <small>
            <a target="_blank"
               href="{{ route('users.edit', $collectionAsset->collection->user_id) }}">{{ $collectionAsset->collection->user->full_name }}
                <i class="fa fa-external-link"></i></a>
            <br>
            {{ $collectionAsset->collection->user->email }}
        </small>
    </td>
    <td class="" @if($collectionAsset->{$type}->deleted_at) style="background: lightpink;" @endif>
        <small>
            <a target="_blank"
               href="{{ url('admin/'.str_plural($type).'/edit', $collectionAsset->{$type}->alpha_id) }}">{{ $collectionAsset->{$type}->alpha_id }}
                <i class="fa fa-external-link"></i>
                <br>
                <small>{{ str_limit($collectionAsset->{$type}->title, 30) }}</small>
                <br>
                @if($collectionAsset->{$type}->deleted_at)
                    <small><b>Deleted ({{ date('dS m Y @ h:i', strtotime($collectionAsset->{$type}->deleted_at))}})</b></small>
                @endif
            </a>
        </small>
    </td>
    <td>
        <small>{{ ucwords($collectionAsset->status) }}</small>
    </td>
    <td class="">
        <small>
            @if(isset($collectionAsset->reason))
                {{ $collectionAsset->reason }}
            @endif
        </small>
    </td>
    <td>
        <small>{{ $collectionAsset->licensed_at ? date('dS M Y', strtotime($collectionAsset->licensed_at)) : '' }}</small>
    </td>
    <td>
        <small>{{ $collectionAsset->licensed_at ? date('dS M Y', strtotime($collectionAsset->license_ends_at)) : '' }}</small>
        <br>
        <small>{{ $collectionAsset->licensed_at ? Carbon\Carbon::parse($collectionAsset->license_ends_at)->diffForHumans() : '' }}</small>

    </td>
    <td class="">
        <b>&pound;{{$collectionAsset->final_price}}</b>
    </td>
</tr>