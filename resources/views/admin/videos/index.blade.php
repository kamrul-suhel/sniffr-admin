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
							<option value="deleted"{{ isset($_GET['state']) && ($_GET['state'] == $state) ? ' selected="selected"' : '' }}>Deleted</option>
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

			@foreach($videos as $asset)
				@php
					$order_column = $asset->state == 'licensed' ? 'licensed_at' : 'created_at';
					$date = \Carbon\Carbon::parse($asset->{$order_column})->isToday() ? 'Today' : date('D jS F Y',strtotime($asset->{$order_column}))
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

				<div class="col-sm-6 col-md-4" id="video-{{ $asset->alpha_id }}">
					@switch($asset->state)
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
						<section class="album-info album-grey">
							<div class="row">
								<div class="col-sm-12">
									@if($asset->contact)
										@if($asset->contact->blacklist)
											<small style="color: red;"><i class="fa fa-flag"></i> {{ Carbon\carbon::parse($asset->contact->blacklist_created_at)->diffForHumans() }}</small>
										@endif
										@if($asset->contact->whitelist)
											<small style="color: green;"><i class="fa fa-flag"></i> {{ Carbon\carbon::parse($asset->contact->whitelist_created_at)->diffForHumans() }}</small>
										@endif

										@if($asset->contact->email)
											<a href="{{ url('admin/contacts/'.$asset->contact->id.'/edit/') }}" class="btn btn-mini-info" title="View Contact" target="_blank">
												<i class="fa fa-envelope"></i> {{ $asset->contact->email }}
											</a>
										@elseif($asset->contact->twitter)
											<a href="https://twitter.com/{{ $asset->contact->twitter }}" class="btn btn-mini-info" title="View Contact" target="_blank">
												<i class="fa fa-twitter"></i> {{ $asset->contact->twitter }}
											</a>
										@elseif($asset->contact->reddit)
											<a href="https://www.reddit.com/user/{{ $asset->contact->reddit }}" class="btn btn-mini-info" title="View Contact" target="_blank">
												<i class="fa fa-reddit"></i> {{ $asset->contact->reddit }}
											</a>
										@elseif($asset->contact->imgur)
											<a href="https://imgur.com/user/{{ $asset->contact->imgur }}" class="btn btn-mini-info" title="View Contact" target="_blank">
												<i class="fa fa-italic"></i> {{ $asset->contact->imgur }}
											</a>
										@elseif($asset->contact->instagram)
											<a href="{{ url('admin/contacts/'.$asset->contact->id.'/edit/') }}" class="btn btn-mini-info" title="Edit Contact">
												<i class="fa fa-instagram"></i> {{ $asset->contact->instagram }}
											</a>
										@elseif($asset->contact->youtube)
											<a href="{{ url('admin/contacts/'.$asset->contact->id.'/edit/') }}" class="btn btn-mini-info" title="Edit Contact">
												<i class="fa fa-youtube"></i> {{ $asset->contact->youtube }}
											</a>
										@elseif($asset->contact->facebook)
											<a href="{{ url('admin/contacts/'.$asset->contact->id.'/edit/') }}" class="btn btn-mini-info" title="View Contact">
												<i class="fa fa-facebook"></i> {{ $asset->contact->facebook }}
											</a>
										@endif
									@else
										<span class="btn btn-mini-info"><i class="fa fa-address-book"></i> No Contact</span>
									@endif

									<button id="comments" class="btn btn-mini-info pull-right" type="button" @click="showModal({{ json_encode($asset) }})"><i class="fa fa-comments"></i> ({{$asset->comments->count()}})</button>

									@if($asset->source)
										<a href="{{ $asset->source }}" class="btn btn-mini-info pull-right" title="View Source" target="_blank">
											<i class="fa fa-info"></i>
										</a>
									@endif

									@if($asset->wp_id)
										<a href="{{ 'https://'.(env('APP_ENV') == 'prod' ? 'www' : 'testing').'.unilad.co.uk/?p='.$asset->wp_id.'&preview=true' }}" class="btn btn-mini-info pull-right" title="View on Wordpress" target="_blank">
											<i class="fa fa-wordpress"></i> @if($asset->author) {{ $asset->author }} @endif
										</a>
									@endif
								</div>
							</div>
						</section>
						
						<header>
							{!! App\Libraries\VideoHelper::getVideoHTML($asset, false, 'edit') !!}

							<a href="{{ url('admin/videos/edit/'.$asset->alpha_id) }}" class="album-options">
								<i class="fa fa-pencil"></i>
								Edit
							</a>
						</header>

						<section class="album-info">
							<h3><a href="{{ url('admin/videos/edit/'.$asset->alpha_id) }}">{{ $asset->title }}</a></h3>
							<p>{{ $asset->description }}</p>
						</section>

						<footer>
							<div class="album-images-count">
								@if($asset->trashed())
									<a href="{{ url('admin/videos/restore/'.$asset->alpha_id) }}" title="Remove from trash" class="undelete">
										<i class="fa fa-upload"></i>
									</a>
								@else
									@if($asset->file_watermark)
										<a href="{{ url('/download/'.$asset->alpha_id) }}" title="Download Video" class="js-download">
											<i class="fa fa-cloud-download"></i>
										</a>
									@elseif($asset->file)
										<a href="{{ url('/download/'.$asset->alpha_id.'/regular') }}" title="Download Video" download>
											<i class="fa fa-cloud-download"></i>
										</a>
									@endif
									@if($asset->state == 'problem' || $asset->state == 'rejected')
										<a href="{{ url('admin/videos/delete/'.$asset->alpha_id) }}" title="Delete Video" class="js-delete">
											<i class="fa fa-trash-o"></i>
										</a>
									@endif
									@if($asset->state != 'new')
										@if($asset->rights == 'ex' || $asset->rights == 'nonex')
											<a href="{{ url('admin/pdfview/'.$asset->alpha_id) }}" title="Download License">
												<i class="fa fa-arrow-circle-o-down"></i>
											</a>
										@elseif($asset->hasContract())
											<a href="{{ route('contract.download', ['id' => $asset->currentContract->reference_id]) }}" title="Download Contract">
												<i class="fa fa-arrow-circle-down"></i>
											</a>
										@endif
									@endif
								@endif
							</div>

							<div class="album-options">
								@if(!$asset->trashed())
									@if($asset->state == 'new' && ($asset->rights == 'ex' || $asset->rights == 'nonex'))
										<a href="#" data-id="{{ $asset->alpha_id }}" class="btn btn-mini-border text-danger js-state rejected" title="Reject Video"><i class="fa fa-times"></i></a>
										<a href="#" data-id="{{ $asset->alpha_id }}" class="btn btn-mini-border text-success js-state accepted" title="Accept Video"><i class="fa fa-check"></i> Accept</a>
									@elseif($asset->state == 'pending' && ($asset->rights == 'ex' || $asset->rights == 'nonex'))
										<a href="#" data-id="{{ $asset->alpha_id }}" class="btn btn-mini-border text-warning js-state restricted" title="Restricted License Video"><i class="fa fa-exclamation-triangle"></i></a>
										<a href="#" data-id="{{ $asset->alpha_id }}" class="btn btn-mini-border text-danger js-state problem" title="Problem Video"><i class="fa fa-times"></i></a>
										<a href="#" data-id="{{ $asset->alpha_id }}" class="btn btn-mini-border text-success js-state accepted" title="Accept Video"><i class="fa fa-check"></i> Accept</a>
									@elseif($asset->state == 'licensed')
										<i class="fa fa-check" title="Licensed"></i> Licensed
									@elseif($asset->state == 'accepted')
										@if(($asset->reminders)AND($asset->more_details_sent))
											<i class="fa fa-clock-o" title="Reminder sent"></i>
											Reminder {{ $asset->reminders }}
											Sent:
											{{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$asset->more_details_sent)->diffForHumans() }}
										@elseif($asset->more_details_sent)
											<i class="fa fa-clock-o" title="More details sent"></i>
											More details sent:
											{{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$asset->more_details_sent)->diffForHumans() }}
										@endif
									@elseif($asset->state == 'rejected')
										<i class="fa fa-times" title="Rejected"></i> Rejected
									@elseif($asset->state == 'problem')
										<i class="fa fa-exclamation" title="Problem"></i> Problem
									@elseif($asset->state == 'restricted')
										<i class="fa fa-exclamation-triangle" title="Restricted"></i> Restricted
									@else
										<i class="fa fa-youtube-play"></i> {{ ucfirst($asset->state) }}
									@endif

									@if($asset->state != 'new' && $asset->state != 'accepted')
										| <i class="fa fa-{{ $asset->rights == 'nonexc' ? 'times' : 'check' }}-circle"></i> {{ $asset->rights == 'nonexc' ? 'Non-' : '' }}Ex{{ $asset->rights != 'ex' ? ' Chaser' : '' }}
									@endif
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

