@extends('admin.master')

@section('content')
<div id="admin-container">
	<ol class="breadcrumb">
		<li> <a href="/admin/contacts"><i class="fa fa-newspaper-o"></i>All Contacts</a></li>
		<li class="active">@if(!empty($contact->id)) <strong>{{ $contact->first_name.' '.$contact->last_name }}</strong> @else <strong>New Contact</strong> @endif</li>
	</ol>

	<div class="admin-section-title">
	@if(!empty($contact->id))
		<h3>{{ $contact->first_name.' '.$contact->last_name }}</h3>
	@else
		<h3><i class="fa fa-plus"></i> Add New Contact</h3>
	@endif
	</div>

	<div class="clear"></div>

	<div class="row">
		<div class="col-sm-6">
			@if(isset($contact->videos))
				@foreach($contact->videos as $video)
				<?php
				switch($video->state){
					case 'accepted':
						$stateIcon = 'fa fa-clock-o';
						break;
					case 'rejected':
						$stateIcon = 'fa fa-times';
						break;
					case 'problem':
						$stateIcon = 'fa fa-exclamation';
						break;
					case 'licensed':
						$stateIcon = 'fa fa-check';
						break;
					case 'restricted':
						$stateIcon = 'fa fa-exclamation-triangle';
						break;
					default:
						$stateIcon = '';
				}
				?>
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title"><a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}">{{ $video->title }}</a></div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<div class="text-center">
							{!! App\Libraries\VideoHelper::getVideoHTML($video) !!}
						</div>
					</div>

					<div class="panel-footer">
						<i class="{{ $stateIcon }}"></i> {{ ucfirst($video->state) }}
					</div>
				</div>
				@endforeach
			@endif
		</div>

		<div class="col-sm-6">
			<form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
				<div class="row">
					<div class="col-sm-6">
						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">First Name</div>
								<div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div>
							</div>
							<div class="panel-body" style="display: block;">
								<p>Add first name in the textbox below:</p>
								<input type="text" class="form-control" name="first_name" id="first_name" placeholder="First Name" value="@if(!empty($contact->first_name)){{ $contact->first_name }}@endif" />
							</div>
						</div>
					</div>

					<div class="col-sm-6">
						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Last Name</div>
								<div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div>
							</div>
							<div class="panel-body" style="display: block;">
								<p>Add last name in the textbox below:</p>
								<input type="text" class="form-control" name="last_name" id="last_name" placeholder="Last Name" value="@if(!empty($contact->last_name)){{ $contact->last_name }}@endif" />
							</div>
						</div>
					</div>
				</div>

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Email Address</div>
						<div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div>
					</div>
					<div class="panel-body" style="display: block;">
						<p>Add email address in the textbox below:</p>
						<input type="text" class="form-control" name="email" id="email" placeholder="Email Address" value="@if(!empty($contact->email)){{ $contact->email }}@endif" />
					</div>
				</div>

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Telephone Number</div>
						<div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div>
					</div>
					<div class="panel-body" style="display: block;">
						<p>Add telephone number in the textbox below:</p>
						<input type="text" class="form-control" name="tel" id="tel" placeholder="Telephone Number" value="@if(!empty($contact->tel)){{ $contact->tel }}@endif" />
					</div>
				</div>


				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Comments</div>
						<div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a></div>
					</div>

					<div class="panel-body" style="display: block;">
						@if(count($contact->comments))
							@foreach($contact->comments as $comment)
		                    <p>{{ $comment->comment }}<br><br><strong class="pull-right">{{ $comment->user->username }} | {{ $comment->created_at->diffForHumans() }}</strong></p>
		                    <br>
		                    <hr>
		                    @endforeach
	                    @else
	                    	<p>No Comments</p>
	                	@endif
					</div>

					<div class="panel-footer">
						<div class="form-group">
	                        <label for="comment">Add a comment</label>
	                        <textarea class="form-control" id="comment" name="comment">{{ old('comment') }}</textarea>
	                    </div>

	                    <span class="clearfix"></span>
	                </div>
				</div>

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Locale</div>
						<div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div>
					</div>
					<div class="panel-body" style="display: block;">
						<div class="form-group">
							<label>Language:</label>
							<input type="text" class="form-control" name="language" id="language" value="@if(!empty($contact->language)){{ $contact->language }}@endif" />
						</div>

						<div class="form-group">
							<label>Location:</label>
							<input type="text" class="form-control" name="location" id="location" value="@if(!empty($contact->location)){{ $contact->location }}@endif" />
						</div>
					</div>
				</div>

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Online Profile</div>
						<div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div>
					</div>
					<div class="panel-body" style="display: block;">
						<div class="form-group">
							<label>Facebook Profile:</label>
							<input type="text" class="form-control" name="facebook" id="facebook" value="@if(!empty($contact->facebook)){{ $contact->facebook }}@endif" />
						</div>

						<div class="form-group">
							<label>Youtube Page:</label>
							<input type="text" class="form-control" name="youtube" id="youtube" value="@if(!empty($contact->youtube)){{ $contact->youtube }}@endif" />
						</div>

						<div class="form-group">
							<label>Instagram Handle:</label>
							<input type="text" class="form-control" name="instagram" id="instagram" value="@if(!empty($contact->instagram)){{ $contact->instagram }}@endif" />
						</div>

						<div class="form-group">
							<label>Twitter Handle:</label>
							<input type="text" class="form-control" name="twitter" id="twitter" value="@if(!empty($contact->twitter)){{ $contact->twitter }}@endif" />
						</div>

						<div class="form-group">
							<label>Other:</label>
							<input type="text" class="form-control" name="other" id="other" value="@if(!empty($contact->other)){{ $contact->other }}@endif" />
						</div>
					</div>
				</div>

				@if(isset($contact->id))
					<input type="hidden" id="id" name="id" value="{{ $contact->id }}" />
				@endif

				<input type="hidden" name="_token" value="<?= csrf_token() ?>" />
				<input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right" />
			</form>
		</div>
	</div>

	<div class="clear"></div>
</div>
@stop
@include ('partials.videojs')
