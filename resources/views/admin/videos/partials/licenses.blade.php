<div class="col-lg-12">
    <table class="table">
        <thead>
        <th>Name</th>
        <th>Company</th>
        <th>License Terms</th>
        <th>License End</th>
        </thead>
        <tbody>
        @foreach($activeLicenses as $license)
            <tr>
                <td>{{ $license->collection->user->full_name }}</td>
                <td>{{ $license->collection->user->client->name }}</td>
                <td>
                    <small>Type: <b>{{ $license->type }}</b></small><br>
                    <small>Platform: <b>{{ $license->platform }}</b></small><br>
                    <small>Length: <b>{{ $license->length }}</b></small><br>
                </td>
                <td>
                    {{ date('dS M Y @ h:i', strtotime($license->license_ends_at)) }}<br>
                    <small>
                        {{ $license->licensed_at
                         ? Carbon\Carbon::parse($license->license_ends_at)->diffForHumans()
                         : '' }}
                    </small>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>