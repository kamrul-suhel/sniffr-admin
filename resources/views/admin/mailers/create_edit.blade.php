@extends('admin.master')

@section('content')

<div id="admin-container">
	<ol class="breadcrumb"> <li> <a href="/admin/mailers"><i class="fa fa-tasks"></i> All Client Mailers</a> </li> <li class="active">@if(!empty($mailer->id)) <strong>Mailer Id {{ $mailer->alpha_id }}</strong> @else <strong>New Client Mailer</strong> @endif</li> </ol>

	<form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data" id="form-mailer">

	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-plus"></i> Review Client Mailer
					<a href="#" class="btn btn-primary pull-right js-send-mailer">Send Mailer</a>
					<a href="#" class="btn btn-success pull-right js-save-mailer" style="margin-right:10px;">Save Mailer</a>
				</h3>
			</div>
		</div>
	</div>
	<div class="clear"></div>

		<div class="row">

			<div class="col-sm-8">

				<div style="border:#999 dotted 1px;">

					<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%;" align="center">
						<tr>
							<td role="modules-container" style="padding: 30px 30px 30px 30px; color: #000000; text-align: left;" bgcolor="#ffffff" width="100%" align="left">
								<table class="module" role="module" data-type="code" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
									<tr>
										<td height="100%" valign="top">
											<img src="{{ env('APP_URL', 'https://sniffrmedia.co.uk') }}/assets/frontend/images/logo-sniffr-black.png" style="width:20%;height:auto;" border="0">
											<div><span style="margin-top:20px;font-style:italic;color:#999;">by UNILAD</span></div>
											<div id="show_note" style="padding-top:20px;padding-bottom:10px;">{{ $mailer->note }}</div>
										</td>
									</tr>
								</table>

								<table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
									<tr>
										<td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;" height="100%" valign="top" bgcolor="">

											@if($mailer->stories->count())
										        <hr style="height:1px;background:#999;">
										        <h2 style="font-size:24px;font-weight:600;">Stories</h2>
										        <p>
										            <a href="#" style="display:block;color:#000;text-decoration:underline;margin-bottom:15px;">
										                Checkout all your stories here
										            </a>
										        </p>
												<table class="table table-striped pages-table">
                                                    @include('admin.mailers.partials.stories')
                                                </table>
										    @endif

											@if($mailer->videos->count())
										        <hr style="height:1px;background:#999;">
										        <h2 style="font-size:24px;font-weight:600;">Videos</h2>
										        <p>
										            <a href="#" style="display:block;color:#000;text-decoration:underline;margin-bottom:15px;">
										                Checkout all your videos here
										            </a>
										        </p>
												<table class="table table-striped pages-table">
                                                    @include('admin.mailers.partials.videos')
                                                </table>
										    @endif

                                            @if((!$mailer->stories->count()) && (!$mailer->videos->count()))
                                                <strong>No Stories or Videos have been selected</strong>
                                            @endif
										</td>
									</tr>
								</table>

								<table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
									<tr>
										<td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
											<table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
												<tr>
													<td style="padding: 0px 0px 10px 0px;" bgcolor="#000000"></td>
												</tr>
											</table>
										</td>
									</tr>
								</table>

								<table class="module" role="module" data-type="social" align="left" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
									<tbody>
										<tr>
											<td style="padding: 20px 10px 30px 0;">
												<a role="social-icon-link"  href="https://www.facebook.com/uniladmag/" target="_blank" alt="Facebook" data-nolink="false" title="Facebook" style="-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;display:inline-block;background-color:#3B579D;">
													<img role="social-icon" alt="Facebook" title="Facebook" height="30" width="30" style="height: 30px, width: 30px" src="https://marketing-image-production.s3.amazonaws.com/social/white/facebook.png" />
												</a>
											</td>

											<td style="padding: 20px 10px 30px 0;">
												<a role="social-icon-link"  href="https://twitter.com/UNILAD" target="_blank" alt="Twitter" data-nolink="false" title="Twitter" style="-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;display:inline-block;background-color:#7AC4F7;">
													<img role="social-icon" alt="Twitter" title="Twitter " height="30" width="30" style="height: 30px, width: 30px" src="https://marketing-image-production.s3.amazonaws.com/social/white/twitter.png" />
												</a>
											</td>

											<td style="padding: 20px 10px 30px 0;">
												<a role="social-icon-link"  href="https://www.instagram.com/unilad" target="_blank" alt="Instagram" data-nolink="false" title="Instagram" style="-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;display:inline-block;background-color:#7F4B30;">
													<img role="social-icon" alt="Instagram" title="Instagram" height="30" width="30" style="height: 30px, width: 30px" src="https://marketing-image-production.s3.amazonaws.com/social/white/instagram.png" />
												</a>
											</td>
										</tr>
										<tr>
											<td colspan="3"></td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</table>

				</div>

			</div>

			<div class="col-sm-4">

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Send from</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<select id="user_id" name="user_id">
							<option value="0">Default (noreply@sniffrmedia.co.uk)</option>
							@foreach(\App\User::whereIn('role', ['admin', 'manager'])->get() as $user_from)
								<option value="{{ $user_from->id }}" @if(isset($user_from)) @if(!empty($user_from->id == $mailer->user_id))selected="selected"@endif @endif>{{ ($user_from->full_name ? $user_from->full_name : $user_from->username) }} ({{ $user_from->email }})</option>
							@endforeach
						</select>
					</div>
				</div>

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Add note</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<textarea class="form-control" name="note" id="note">{{ $mailer->note }}</textarea>
					</div>
				</div>

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Select Clients</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<select name="clients[]" id="clients" class="form-control" multiple style="height:400px;">
                            @foreach(\App\Client::all() as $client)
                            	@if($client->users()->count())
                                <optgroup label="{{ $client->name }}">
                                @foreach($client->users()->get() as $user)
                                    <option value="{{ $user->id }}"{{ isset($mailer) && $mailer->users()->get()->contains($user->id)  ? " selected" : "" }}>{{ $user->username }} ({{ $user->email }})</option>
                                @endforeach
                                </optgroup>
                                @endif
                            @endforeach
						</select>

					</div>
				</div>
			</div>

		</div>

		@if(isset($mailer->id))
			<input type="hidden" id="id" name="id" value="{{ $mailer->id }}" />
		@endif

		<input type="hidden" id="send_mailer" name="send_mailer" value="1" />
		<input type="hidden" name="_token" value="<?= csrf_token() ?>" />

	</form>

	<div class="clear"></div>
</div>

	@section('javascript')

	<script type="text/javascript">
	$ = jQuery;

	$(document).ready(function(){

		$('#note').keyup(function(event) {
			$('#show_note').text($(this).val());
		});

		$('.js-send-mailer').click(function(e){
			e.preventDefault();
			if($('#clients').val() == '') {
				swal({  title: 'Please select some client users', text: '', icon: 'error', closeModal: false, closeOnClickOutside: true, closeOnEsc: true });
			} else {
				$('#form-mailer').submit();
			}
		});

		$('.js-save-mailer').click(function(e){
			e.preventDefault();
			$('#send_mailer').val(0);
			$('#form-mailer').submit();
		});

	});
	</script>

	@stop

@stop
