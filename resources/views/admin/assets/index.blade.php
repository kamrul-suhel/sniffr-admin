@extends('admin.master')

@section('content')
	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-{{ $asset_icon }}"></i>
					<a href="/admin/licenses/{{ $asset_type_plural }}">
						{{ ucfirst($asset_type_plural) }}: {{ isset($chosen_decision) ? ucwords(str_replace('-', ' ', $chosen_decision)). ' -'  : ''}} {{ ucwords(str_replace('-', ' ', $chosen_state)) }}
					</a>

					<a href="{{ url('admin/'.$asset_type_plural.'/create') }}" class="btn btn-success pull-right">
						<i class="fa fa-plus-circle"></i>
						Add New {{ ucfirst($asset_type) }}
					</a>
				</h3>
			</div>
		</div>

		<div class="row">
			<form id="search-form" method="get" role="form" class="search-form-full">
				@include('admin.'.$asset_type_plural.'.partials.filters')

				<div class="col-md-2">
					<div class="form-group">
						<select id="assignee" name="assignee" class="form-control" title="Assign To">
							<option value="">Assignee</option>
							@foreach($users as $user)
								<option value="{{ $user->id }}"{{ $chosen_assignee == $user->id ? ' selected' : '' }}>@if($user->full_name) {{ $user->full_name }} @else {{ $user->username }} @endif</option>
							@endforeach
						</select>
					</div>
				</div>

				<div class="col-md-4 pull-right">
					<div class="form-group">
						<input type="text" class="form-control" name="term" id="search-input" placeholder="Search..." value="{{ Request::get('term') }}"> <i class="fa fa-search"></i>
					</div>
				</div>
			</form>
		</div>
	</div>

	<div class="clear"></div>


	@if(!count($assets))
		<p>Sorry, there are no {{ $asset_type_plural }} to show.</p>
	@else
		@include('admin.assets.partials.gallery')
	@endif
@stop

@section('javascript')
    <script src="{{asset('assets/admin/scripts/scripts.js')}}"></script>
	@include('admin.assets.partials.js')
@stop

