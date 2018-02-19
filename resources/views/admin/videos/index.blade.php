@extends('admin.master')

@section('content')
	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3><i class="fa fa-youtube-play"></i> {{ ucfirst($state) }} Videos <a href="{{ url('admin/videos/create') }}" class="btn btn-success pull-right"><i class="fa fa-plus-circle"></i> Add New</a></h3>
			</div>
		</div>

		<div class="row">
			<form id="search-form" method="get" role="form" class="search-form-full">
				<div class="col-md-2">
					<div class="form-group">
						<select id="category" name="category" class="selectpicker form-control">
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
							<option value="ex"{{ isset($_GET['rights']) && ($_GET['rights'] == 'ex') ? ' selected="selected"' : '' }}>Exclusive</option>
							<option value="nonex"{{ isset($_GET['rights']) && ($_GET['rights'] == 'nonex') ? ' selected="selected"' : '' }}>Non Exclusive</option>
						</select>
					</div>
				</div>

				<div class="col-md-4">
					<div class="form-group">
						<input type="text" class="form-control" name="s" id="search-input" placeholder="Search..." value="{{ Request::get('s') }}"> <i class="fa fa-search"></i>
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
			@foreach($videos as $video)
			<div class="col-sm-6 col-md-4" id="video-{{ $video->alpha_id }}">
				<?php
				switch($video->state){
					case 'rejected':
					case 'problem':
						$panelColour = 'danger';
						break;
					case 'licensed':
						$panelColour = 'success';
						break;
					case 'restricted':
						$panelColour = 'warning';
						break;
					default:
						$panelColour = 'default';
				}
				?>
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
								@if($video->state == 'new')
								<a href="{{ url('admin/videos/status/accepted/'.$video->alpha_id ) }}" class="text-success js-state" title="Accept Video"><i class="fa fa-check"></i></a>
		                    	<a href="{{ url('admin/videos/status/rejected/'.$video->alpha_id ) }}" class="text-danger js-state" title="Reject Video"><i class="fa fa-times"></i></a>
								@elseif($video->state == 'pending')
								<a href="{{ url('admin/videos/status/licensed/'.$video->alpha_id ) }}" class="text-success js-state" title="License Video"><i class="fa fa-check"></i></a>
		                    	<a href="{{ url('admin/videos/status/restricted/'.$video->alpha_id ) }}" class="text-warning js-state" title="Restricted License Video"><i class="fa fa-exclamation-triangle"></i></a>
		                    	<a href="{{ url('admin/videos/status/problem/'.$video->alpha_id ) }}" class="text-danger js-state" title="Problem Video"><i class="fa fa-times"></i></a>
								@elseif($video->state == 'licensed')
								<i class="fa fa-check" title="Licensed"></i> Licensed
								@elseif($video->state == 'accepted')
									@if($video->reminders)
										<i class="fa fa-clock-o" title="Reminder sent"></i> Reminder {{ $video->reminders }} Sent: {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$video->more_details_sent)->diffForHumans() }}
									@else
										<i class="fa fa-clock-o" title="More details sent"></i> More details sent: {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$video->more_details_sent)->diffForHumans() }}
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
									| <i class="fa fa-{{ $video->rights == 'nonex' ? 'times' : 'check' }}-circle" title="{{ $video->rights == 'nonex' ? 'Non-' : '' }}-Exclusive"></i> {{ $video->rights == 'nonex' ? 'Non-' : '' }}Exclusive
								@endif

								@if(isset($video) && count($video->campaigns)>0)
									<?php
									$has_exclusivity = false;
									foreach($video->campaigns as $campaign){
		                                $date1 = now();
		                                $date2 = new DateTime($campaign->pivot->created_at);

		                                $diff = $date2->diff($date1);

		                                $exclusivity = 48 - ($diff->h + ($diff->days*24));

		                                if($exclusivity > 0){
		                                	$has_exclusivity = true;
		                                }
									}
									if($has_exclusivity){
										echo '| <i class="fa fa-hourglass-half text-danger" title="Has Exclusivity: '.$exclusivity.' hours"></i>';
									}
									?>
								@endif
							@endif
						</div>

						<div class="album-options">
							@if($video->trashed())
							<a href="{{ url('admin/videos/restore/'.$video->alpha_id) }}" title="Remove from trash" class="undelete">
								<i class="fa fa-upload"></i>
							</a>
							@else
								@if($video->state == 'licensed' && $video->file_watermark)
								<a href="{{ url('/download/'.$video->alpha_id) }}" title="Download Video" class="js-download">
									<i class="fa fa-download"></i>
								</a>
								@elseif($video->state == 'licensed' && $video->file)
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
								<a href="{{ url('admin/pdfview/'.$video->alpha_id) }}" title="Download License">
									<i class="fa fa-print"></i>
								</a>
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
