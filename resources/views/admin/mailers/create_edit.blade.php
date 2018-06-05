@extends('admin.master')

@section('content')

<div id="admin-container">
<!-- This is where -->

	<ol class="breadcrumb"> <li> <a href="/admin/mailers"><i class="fa fa-tasks"></i> All Client Mailers</a> </li> <li class="active">@if(!empty($mailer->id)) <strong>Mailer Id {{ $mailer->alpha_id }}</strong> @else <strong>New Client Mailer</strong> @endif</li> </ol>

	<form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data" id="form-mailer">

	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-plus"></i> Review Client Mailer
					<input type="submit" value="{{ $button_text }}" class="btn btn-primary pull-right" />
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

											@if(!empty($mailer->stories))
											<table class="table table-striped pages-table">
												@foreach($mailer->stories as $story)
												<tr>
													<td>
														<h4>{{ TextHelper::shorten($story['title'], 250) }}</h4>
														by {{ $story['author'] }}
														<br />
														<img src="@if($story['thumb']){{ $story['thumb'] }}@else /assets/frontend/images/placeholder.png @endif" border="0" style="display: flex; height: 200px; width: auto; margin-top: 15px;" />
														<br />
														<div style="display:inline-block;">
															<div style="display:inline-block;width:25px;height:25px;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABj0lEQVR4Ae3agWZCcRTH8T8QZG9QYy5mNdbvINtz1TMkAAbFeoR6hPUI9RADIDEb1B3gYIj9bvfs8PseIP/iQ+794xT1l5RSSg17mGJrB6uvPAdsMR32SpMNurbB2er2BmfbDLqlmaoO9la3P9hXndJEWFodM1gWPlQ4hQFOqAqbzawOnFlhwy4SgH1hs69IgH3ygDp2BBBAAAGuOwJc+IIAAghw8cce7/CKb/6c1xrAGz3ggzgXB/CeXnAizsUBPLxR5+IBNqbOxQOqG+Jc+4DmP/MRQIAMgN8NugTg/z5GEwGwSg0YPeOcGGD3fkmLB/DX6QwA/9Qn/jEqAP++SACwcXIAVqkB/r5ICfD3RTqAvy8CAJEjgAACCBA6AggggADHUMCRBsSvnLGAeShgTgNGt5Frl9anAaVgEb/4SgGqDnZRq8cUwBt0sW57+RtrX/4mAJ71bdLO+r2928T/+yQgQQIIIIAAXAIck2/mYpcdME8O4O/7PIAMi1SA4Ps+Dwi+7/OAuPs+D1BKKaV+ALo6isIclyX1AAAAAElFTkSuQmCC);"></div>
															<div style="display:inline-block;width:25px;height:25px;">1</div>
														</div>
														@if($story->assets()->count()>0)<div style="display:inline-block;">
															<div style="display:inline-block;width:25px;height:25px;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACHklEQVR4Ae3agWYcURTG8aMVW7WU0gJJg6F01rbzHehTVEELENAnSJ4hFiiobkq6T5C8QGkoqsAuBCgUpUBsbVslmUYFI1+7IXdy71y+/wXMLH7rHAbXlFJKqcs0WMUWDvzI6ys+RzjA1mDV2qzs+z5OvI53cOL7Zd/aqehh5nX8g1nRszbCjtdpDnYsPBQ4TgY4RmGh+bbXCc+2hYZpSgBmFpr/TAnwRTigTnsEEEAAAa72CMA/aB8ggAACCCCAAAIIIIAAAggggAAC4DXGOQM++Yqv4GOugK/VHTtteBffMgTg18PKzsJj/901wARvLwA8t0Z40SkADv3m+g0cLnnjpZ0Lu90BLKoHdhoKX/znjQ923c7Fy5wMgA07C8/++caX8rZxvMyJABNr5G/o+Y/hwCha5ngAnn5rxJvgT42iZY4J4OlvRJuAkXG8zKkA2DCusQl4Z9eM4mWOC6Dp5/zV3+ef/ZZRS5Y5HoCmn//VKb4P7xu1ZJkjAmj6uUfr1ROjli1zXABNf3jYjQmYWAvxMkcA0PQHxcscA8DTHx4vc3uA8OkPW+ZwwNzrhGceDEh/5SwUMEoKGAUDqnspr136WjDADOP0F1+DAEUP0w5fPWYAV/axF/vyN/bKvlkgoJmv+Wac6/f+3jd59oMB8RNAAAEEiJIA88xv5mKaO2CUHYC/97MCcBhnB+Dv/QwB/L2fMYC/97sJUEoppf4AxF4KMk77RSYAAAAASUVORK5CYII=);"></div>
															<div style="display:inline-block;width:25px;height:25px;">{{ $story->assets()->count() }}</div>
														</div>@endif
														@if($story->videos()->count()>0)<div style="display:inline-block;">
														<div style="display:inline-block;">
															<div style="display:inline-block;width:25px;height:25px;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABm0lEQVR4Ae3aAWYDARAF0AVWK0doUlioBDpzm4IeIjlD7BEaaKEAyRGaI+xCzxFLW5BsoT5AdWe74/P/AIh4/MgkO4WiKIqiDMlqbhs7+sn7f56THW2zmhdjZjnzg128n27s4oflrBgnVWmt99OPtVU5CsB23ueM7Yp4rLJzGuBsVRjgW+8TZxsGWJMJsDYM8K9MgH/EAX3uCCCAAH+LAPbon9SAorA7e58Q8NsLhrzhzZW/8gJ+giqxAlAlXgCqxAtAlZgBqBIvAFXiBaBKzABUiReAKvECUCVmAKrEC0CVeAGoEjMAVeIFoErUgBdVKAvgD8QfYr+2Z32RZQFQHUYAqqN1OgGA6jACUB39qE8AoDqMAFRHfy0mAFAdRgCqwwkgf8CB6jAAJhgBBBBAgC4V0AUB+SdncUCdCqjDgPvbzLNLXwwHIPaUevgaB1SlNVmnx1EAjr9tP/Xxt+1x/B0CIL7w9TTn9/7ma3Q/AGCJAAIIIEAsAnTkp8XWsANqcgD2fVYA9n1eAPZ9VgD2fQ5AYN9PByiKoijKN3P3T8TyoBKRAAAAAElFTkSuQmCC);"></div>
															<div style="display:inline-block;width:25px;height:25px;">{{ $story->videos()->count() }}</div>
														</div>@endif
													</td>
													<td>
														<br />{{ $story['excerpt'] }}..
														<br /><br /><a href="#" style="background:#000;color:#fff;padding:10px 6px;border-radius:5px;display:inherit;margin-top:20px;font-weight:bold;">View story</a>
													</td>
												</tr>
												@endforeach
											</table>
											@else
												<strong>No Stories have been selected</strong>
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

		$('.js-save-mailer').click(function(e){
			e.preventDefault();
			$('#send_mailer').val(0);
			$('#form-mailer').submit();
		});

	});
	</script>

	@stop

@stop
