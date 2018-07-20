@extends('admin.master')

@section('content')
	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-md-8">
				<h3>
					<i class="fa fa-user-circle"></i>
					<a href="{{ route('users.index') }}" style="text-decoration: underline">Users</a>
                    >
                    Emails Sent to <strong>{{ $user->full_name }}</strong>
                    <i>({{ $user->email }})</i>
				</h3>
			</div>
		</div>
	</div>
	<div class="clear"></div>

	<table class="table table-striped">
		<tr class="table-header">
			<th>Sent At</th>
			<th>Stories</th>
		</tr>
        @foreach($client_mailers as $mails)
            <tr>
                <td>
                    {{ Carbon\Carbon::parse($mails->sent_at)->diffForHumans() }}
                </td>
                <td>
                    @foreach($mails->stories as $story)
                        {{ $story->title }}<br>
                    @endforeach
                </td>
            </tr>
        @endforeach
	</table>
@stop
