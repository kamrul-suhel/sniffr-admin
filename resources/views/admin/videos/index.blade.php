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
				<div class="col-md-1">
					<div class="form-group">
						<select id="state" name="state" class="form-control">
							<option value="">State</option>
							@foreach(config('videos.states') as $state)
								<option value="{{ $state }}"{{ isset($_GET['state']) && ($_GET['state'] == $state) ? ' selected="selected"' : '' }}>{{ ucwords($state) }}</option>
							@endforeach
						</select>
					</div>
				</div>

				<div class="col-md-1">
					<div class="form-group">
						<select id="category" name="category" class="form-control">
							<option value="">Vertical</option>
							@foreach($video_categories as $category)
								<option value="{{ $category->id }}"{{ isset($_GET['category']) && ($_GET['category'] == $category->id) ? ' selected="selected"' : '' }}>{{ $category->name }}</option>
							@endforeach
						</select>
					</div>
				</div>

				<div class="col-md-1">
					<div class="form-group">
						<select id="collection" name="collection" class="form-control">
							<option value="">Collection</option>
							@foreach($video_collections as $collection)
								<option value="{{ $collection->id }}"{{ isset($_GET['collection']) && ($_GET['collection'] == $collection->id) ? ' selected="selected"' : '' }}>{{ $collection->name }}</option>
							@endforeach
						</select>
					</div>
				</div>

				<div class="col-md-1">
					<div class="form-group">
						<select id="shot_type" name="shottype" class="form-control">
							<option value="">ShotType</option>
							@foreach($video_shottypes as $shottype)
								<option value="{{ $shottype->id }}"{{ isset($_GET['shottype']) && ($_GET['shottype'] == $shottype->id) ? ' selected="selected"' : '' }}>{{ $shottype->name }}</option>
							@endforeach
						</select>
					</div>
				</div>

				<div class="col-md-1">
					<div class="form-group">
						<select id="rights" name="rights" class="form-control">
							<option value="">License</option>
							<option value="ex"{{ (app('request')->get('rights') == 'ex') ? ' selected="selected"' : '' }}>Ex Submission</option>
							<option value="exc"{{ (app('request')->get('rights') == 'exc') ? ' selected="selected"' : '' }}>Ex Chaser</option>
							<option value="excc"{{ (app('request')->get('rights') == 'excc') ? ' selected="selected"' : '' }}>Ex Chaser Channel</option>
							<option value="nonex"{{ (app('request')->get('rights') == 'nonex') ? ' selected="selected"' : '' }}>Non Ex</option>
							<option value="nonexc"{{ (app('request')->get('rights') == 'nonexc') ? ' selected="selected"' : '' }}>Non Ex Chaser</option>
						</select>
					</div>
				</div>

				<div class="col-md-7">
					<div class="form-group">
						<input type="text" class="form-control" name="term" id="search-input" placeholder="Search..." value="{{ Request::get('term') }}"> <i class="fa fa-search"></i>
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
					$order_column = $video->state == 'licensed' ? 'licensed_at' : 'created_at';
					$date = \Carbon\Carbon::parse($video->{$order_column})->isToday() ? 'Today' : date('D jS F Y',strtotime($video->{$order_column}))
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
							<p>
								{{ $video->description }}

								@if($video->contact)
								<a target="_blank" href="{{ route('contacts.edit', ['id' => $video->contact->id]) }}">Contact: {{ $video->contact->full_name }} ({{ $video->contact->email }}) <i class="fa fa-external-link"></i>
									@if($video->contact->blacklist)
										<br>
										<small style="color: red;"><i class="fa fa-flag"></i> {{ Carbon\carbon::parse($video->contact->blacklist_created_at)->diffForHumans() }}</small>
									@endif
									@if($video->contact->whitelist)
										<br>
										<small style="color: green;"><i class="fa fa-flag"></i> {{ Carbon\carbon::parse($video->contact->whitelist_created_at)->diffForHumans() }}</small>
									@endif
								</a>
								@endif
							</p>
						</section>

						<footer>
							<div class="album-images-count">
								@if(!$video->trashed())
									@if($video->state == 'new' && ($video->rights == 'ex' || $video->rights == 'nonex'))
										<a href="#" data-id="{{ $video->alpha_id }}" class="text-success js-state accepted" title="Accept Video"><i class="fa fa-check"></i></a>
										<a href="#" data-id="{{ $video->alpha_id }}" class="text-danger js-state rejected" title="Reject Video"><i class="fa fa-times"></i></a>
									@elseif($video->state == 'pending' && ($video->rights == 'ex' || $video->rights == 'nonex'))
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
										| <i class="fa fa-{{ $video->rights == 'nonexc' ? 'times' : 'check' }}-circle"></i> {{ $video->rights == 'nonexc' ? 'Non-' : '' }}Ex{{ $video->rights != 'ex' ? ' Chaser' : '' }}
									@endif
								@endif
							</div>

							<div class="album-options">
								<a id="comments" @click="showModal({{ json_encode($video) }})"><i class="fa fa-comments"></i></a>

								@if($video->trashed())
								<a href="{{ url('admin/videos/restore/'.$video->alpha_id) }}" title="Remove from trash" class="undelete">
									<i class="fa fa-upload"></i>
								</a>
								@else
									@if($video->file_watermark)
									<a href="{{ url('/download/'.$video->alpha_id) }}" title="Download Video" class="js-download">
										<i class="fa fa-cloud-download"></i>
									</a>
									@elseif($video->file)
									<a href="{{ url('/download/'.$video->alpha_id.'/regular') }}" title="Download Video" download>
										<i class="fa fa-cloud-download"></i>
									</a>
									@endif
									@if($video->state == 'problem' || $video->state == 'rejected')
									<a href="{{ url('admin/videos/delete/'.$video->alpha_id) }}" title="Delete Video" class="js-delete">
										<i class="fa fa-trash-o"></i>
									</a>
									@endif
									@if($video->state != 'new')
										@if($video->rights == 'ex' || $video->rights == 'nonex')
										<a href="{{ url('admin/pdfview/'.$video->alpha_id) }}" title="Download License">
											<i class="fa fa-arrow-circle-o-down"></i>
										</a>
										@elseif($video->hasContract())
										<a href="{{ route('contract.download', ['id' => $video->currentContract->reference_id]) }}" title="Download Contract">
											<i class="fa fa-arrow-circle-down"></i>
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

			<modal v-if="modalVisible" @close="closeModal" asset-type="video"></modal>
		</div>
	</div>
	@endif
@stop

@section('javascript')
    @include('admin.videos.partials.js')
    <script src="{{asset('assets/admin/scripts/scripts.js')}}"></script>
@stop

