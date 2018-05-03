@extends('admin.master')

@section('content')
<div id="admin-container">
	<ol class="breadcrumb">
		<li> <a href="/admin/contacts"><i class="fa fa-newspaper-o"></i>All Contacts</a></li>
		<li class="active">@if(!empty($contact->id)) <strong>{{ $contact->full_name }}</strong> @else <strong>New Contact</strong> @endif</li>
	</ol>

	<div class="admin-section-title">
	@if(!empty($contact->id))
		<h3>{{ $contact->full_name }}</h3>
	@else
		<h3><i class="fa fa-plus"></i> Add New Contact</h3>
	@endif
	</div>

	<div class="clear"></div>

	<div class="row">
		<div class="col-sm-6">
			@if($contact)
				@foreach($contact->videos as $video)
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title"><a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}">{{ $video->title }}</a></div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<div class="text-center">
							{!! App\Libraries\VideoHelper::getVideoHTML($video, true, 'edit') !!}
						</div>
					</div>

                    <div class="panel-footer">
                        <i class="{{ (key_exists($video->state, config('videos.icons'))) ? config('videos.icons')[$video->state] : '' }}"></i>
                        {{ ucfirst($video->state) }}
                    </div>
				</div>
				@endforeach
			@endif
		</div>

		<div class="col-sm-6">
			<form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Full Name</div>
						<div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div>
					</div>
					<div class="panel-body" style="display: block;">
						<p>Add first name in the textbox below:</p>
						<input type="text" class="form-control" name="full_name" id="full_name" placeholder="Full Name" value="@if(!empty($contact->full_name)){{ $contact->full_name }}@endif" />
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
						@if(isset($contact->comments) && count($contact->comments))
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
