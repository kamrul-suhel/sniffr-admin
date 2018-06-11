@extends('admin.master')


@section('content')
	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-youtube-play"></i>
					<a href="/admin/videos/{{ lcfirst($state) }}">
						{{ ucfirst($state) }} Videos
					</a>
					<a href="{{ url('admin/videos/create') }}" class="btn btn-success pull-right">
						<i class="fa fa-plus-circle"></i>
						Add New
					</a>
				</h3>
			</div>
		</div>

		<div class="row">
			<form id="search-form" method="get" role="form" class="search-form-full">
				<div class="col-md-2">
					<div class="form-group">
						<select id="category" name="category" class="selectpicker form-control" title="category">
							<option value="">Vertical</option>
							@foreach($video_categories as $category)
								<option value="{{ $category->id }}"{{ isset($_GET['category']) && ($_GET['category'] == $category->id) ? ' selected="selected"' : '' }}>{{ $category->name }}</option>
							@endforeach
						</select>
					</div>
				</div>

				<div class="col-md-2">
					<div class="form-group">
						<select id="collection" name="collection" class="selectpicker form-control">
							<option value="">Collection</option>
							@foreach($video_collections as $collection)
								<option value="{{ $collection->id }}"{{ isset($_GET['collection']) && ($_GET['collection'] == $collection->id) ? ' selected="selected"' : '' }}>{{ $collection->name }}</option>
							@endforeach
						</select>
					</div>
				</div>

				<div class="col-md-2">
					<div class="form-group">
						<select id="shot_type" name="shot_type" class="selectpicker form-control">
							<option value="">Shot Type</option>
							@foreach($video_shottypes as $shottype)
								<option value="{{ $shottype->id }}"{{ isset($_GET['shot_type']) && ($_GET['shot_type'] == $shottype->id) ? ' selected="selected"' : '' }}>{{ $shottype->name }}</option>
							@endforeach
						</select>
					</div>
				</div>

				<div class="col-md-2">
					<div class="form-group">
						<select id="rights" name="rights" class="selectpicker form-control">
							<option value="">Rights</option>
							<option value="exc"{{ (app('request')->get('rights') == 'exc') ? ' selected="selected"' : '' }}>Exclusive Chaser</option>
							<option value="ex"{{ (app('request')->get('rights') == 'ex') ? ' selected="selected"' : '' }}>Exclusive Submission</option>
							<option value="nonex"{{ (app('request')->get('rights') == 'nonex') ? ' selected="selected"' : '' }}>Non Exclusive</option>
						</select>
					</div>
				</div>

				<div class="col-md-4">
					<div class="form-group">
						<input type="text" class="form-control" name="search_value" id="search-input" placeholder="Search..." value="{{ Request::get('s') }}"> <i class="fa fa-search"></i>
					</div>
				</div>
			</form>
		</div>
	</div>

	<div class="clear"></div>

	@if(!count($videos))
		<p>Sorry, there are no videos to show.</p>
	@else

	<div class="gallery-env">
		<div class="row">
			@php
				$currentDay = '';
			@endphp

			@foreach($videos as $video)
				@php
					$date = $video->created_at->isToday() ? 'Today' : date('jS M',strtotime($video->created_at))
				@endphp
				@if($currentDay != $date)
					@php
						$currentDay = $date;
					@endphp
					<div class="col-xs-12 date-header">
						<h2>
							{{ $date }}
						</h2>
					</div>
				@endif

				<div class="col-sm-6 col-md-4" id="video-{{ $video->alpha_id }}">
					@switch($video->state)
						@case('rejected')
						@case('problem')
							@php
								$panelColour = 'danger';
							@endphp
							@break
						@case('licensed')
							@php
								$panelColour = 'success';
							@endphp
							@break
						@case('restricted')
							@php
								$panelColour = 'warning';
							@endphp
							@break
						@default
							@php
								$panelColour = 'default';
							@endphp
					@endswitch

					<article class="album {{ $panelColour }}">
						<header>
							{!! App\Libraries\VideoHelper::getVideoHTML($video, false, 'edit') !!}

							<a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}" class="album-options">
								<i class="fa fa-pencil"></i>
								Edit
							</a>
						</header>

						<section class="album-info">
							<h3><a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}">{{ $video->title }}</a></h3>

							<p>{{ $video->description }}</p>
						</section>

						<footer>
							<div class="album-images-count">
								@if(!$video->trashed())
									@if($video->state == 'new' && $video->rights == 'ex')
										<a href="#" data-id="{{ $video->alpha_id }}" class="text-success js-state accepted" title="Accept Video"><i class="fa fa-check"></i></a>
										<a href="#" data-id="{{ $video->alpha_id }}" class="text-danger js-state rejected" title="Reject Video"><i class="fa fa-times"></i></a>
									@elseif($video->state == 'pending' && $video->rights == 'ex')
										<a href="#" data-id="{{ $video->alpha_id }}" class="text-success js-state licensed" title="License Video"><i class="fa fa-check"></i></a>
										<a href="#" data-id="{{ $video->alpha_id }}" class="text-warning js-state restricted" title="Restricted License Video"><i class="fa fa-exclamation-triangle"></i></a>
										<a href="#" data-id="{{ $video->alpha_id }}" class="text-danger js-state problem" title="Problem Video"><i class="fa fa-times"></i></a>
									@elseif($video->state == 'licensed')
										<i class="fa fa-check" title="Licensed"></i> Licensed
									@elseif($video->state == 'accepted')
										@if(($video->reminders)AND($video->more_details_sent))
											<i class="fa fa-clock-o" title="Reminder sent"></i>
											Reminder {{ $video->reminders }}
											Sent:
											{{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$video->more_details_sent)->diffForHumans() }}
										@elseif($video->more_details_sent)
											<i class="fa fa-clock-o" title="More details sent"></i>
											More details sent:
											{{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$video->more_details_sent)->diffForHumans() }}
										@endif
									@elseif($video->state == 'rejected')
										<i class="fa fa-times" title="Rejected"></i> Rejected
									@elseif($video->state == 'problem')
										<i class="fa fa-exclamation" title="Problem"></i> Problem
									@elseif($video->state == 'restricted')
										<i class="fa fa-exclamation-triangle" title="Restricted"></i> Restricted
									@else
										<i class="fa fa-youtube-play"></i> {{ ucfirst($video->state) }}
									@endif

									@if($video->state != 'new' && $video->state != 'accepted')
										| <i class="fa fa-{{ $video->rights == 'nonex' ? 'times' : 'check' }}-circle" title="{{ $video->rights == 'nonex' ? 'Non-' : '' }}-Ex{{ $video->rights == 'exc' ? ' Chaser' : '' }}"></i> {{ $video->rights == 'nonex' ? 'Non-' : '' }}Ex{{ $video->rights == 'exc' ? ' Chaser' : '' }}
									@endif
								@endif
							</div>

							<div class="album-options">
								@if($video->trashed())
								<a href="{{ url('admin/videos/restore/'.$video->alpha_id) }}" title="Remove from trash" class="undelete">
									<i class="fa fa-upload"></i>
								</a>
								@else
									@if($video->file_watermark)
									<a href="{{ url('/download/'.$video->alpha_id) }}" title="Download Video" class="js-download">
										<i class="fa fa-download"></i>
									</a>
									@elseif($video->file)
									<a href="{{ url('/download/'.$video->alpha_id.'/regular') }}" title="Download Video" download>
										<i class="fa fa-download"></i>
									</a>
									@endif
									@if($video->state == 'problem' || $video->state == 'rejected')
									<a href="{{ url('admin/videos/delete/'.$video->alpha_id) }}" title="Delete Video" class="js-delete">
										<i class="fa fa-trash-o"></i>
									</a>
									@endif
									@if($video->state != 'new')
										@if($video->rights == 'ex')
										<a href="{{ url('admin/pdfview/'.$video->alpha_id) }}" title="Download License">
											<i class="fa fa-print"></i>
										</a>
										@elseif($video->rights == 'exc' && $video->currentContract)
										<a href="{{ route('contract.download', ['id' => $video->currentContract->reference_id]) }}" title="Download Contract">
											<i class="fa fa-print"></i>
										</a>
										@endif
									@endif
									<a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}" title="Edit Video">
										<i class="fa fa-pencil"></i>
									</a>
								@endif
							</div>
						</footer>
					</article>
				</div>
			@endforeach

			<div class="clear"></div>

			<div class="text-center"><?= $videos->appends(request()->except('page'))->render(); ?></div>
		</div>
	</div>
	@endif
@stop
