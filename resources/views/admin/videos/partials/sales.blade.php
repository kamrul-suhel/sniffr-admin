
    <table class="table">
        <thead>
        <th>Sale Price</th>
        <th>Name</th>
        <th>Company</th>
        <th>License Terms</th>
        <th>License End</th>
        </thead>
        <tbody>
        @foreach($activeLicenses as $license)
            <tr>
                <td>£{{ $license->final_price }}</td>
                <td>{{ $license->collection->user->full_name }}</td>
                <td>{{ $license->collection->user->client->name }}</td>
                <td>
                    <small>Type: <b>{{ config('pricing.type.'.$license->type.'.name') }}</b></small><br>
                    <small>Platform: <b>{{ config('pricing.platform.'.$license->platform.'.name') }}</b></small><br>
                    <small>Length: <b>{{  config('pricing.length.'.$license->length.'.name') }}</b></small><br>
                </td>
                <td>
                    {{ date('dS M Y @ H:i', strtotime($license->license_ends_at)) }}<br>
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
