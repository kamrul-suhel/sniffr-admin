@extends('admin.master')

@section('content')

	<ol class="breadcrumb"> <li> <a href="/admin/mailers"><i class="fa fa-tasks"></i> All Client Mailers</a> </li> <li class="active">@if(!empty($mailer->id)) <strong>Mailer Id {{ $mailer->alpha_id }}</strong> @else <strong>Client Mailer</strong> @endif</li> </ol>

	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-bar-chart"></i> Downloads for mailer sent on {{ date('jS M Y h:i:s',strtotime($mailer['sent_at'])) }}
					<!-- <a href="/admin/stories/" class="btn btn-success pull-right">
						<i class="fa fa-plus-circle"></i> Create Mailer
					</a> -->
				</h3>
			</div>
		</div>
	</div>
	<div class="clear"></div>

	<table class="table table-striped pages-table">
		@if(count($downloads)>0)
		<th>Story / Video Title</th>
		<th>Client User</th>
		<th>Client Name</th>
		<th>Download Type</th>
		@foreach($downloads as $download)
			<?php $download_user = \App\User::where('id', $download->user_id)->first();?>
		<tr>
			<td>@if($download->story_id!=0) {{ TextHelper::shorten($mailer->stories()->where('story_id', $download->story_id)->first()->title, 150) }} @else {{ TextHelper::shorten($mailer->videos()->where('video_id', $download->video_id)->first()->title, 150) }} @endif</td>
			<td>{{ $download_user->email }}</td>
			<td>{{ $download_user->client()->first()->name ? $download_user->client()->first()->name : 'UNILAD' }}</td>
			<td>
				@if($download->story_id!=0)
					<div id="story-icon" title="Story" style="display:inline-block;width:25px;height:25px;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACHklEQVR4Ae3agWYcURTG8aMVW7WU0gJJg6F01rbzHehTVEELENAnSJ4hFiiobkq6T5C8QGkoqsAuBCgUpUBsbVslmUYFI1+7IXdy71y+/wXMLH7rHAbXlFJKqcs0WMUWDvzI6ys+RzjA1mDV2qzs+z5OvI53cOL7Zd/aqehh5nX8g1nRszbCjtdpDnYsPBQ4TgY4RmGh+bbXCc+2hYZpSgBmFpr/TAnwRTigTnsEEEAAAa72CMA/aB8ggAACCCCAAAIIIIAAAggggAAC4DXGOQM++Yqv4GOugK/VHTtteBffMgTg18PKzsJj/901wARvLwA8t0Z40SkADv3m+g0cLnnjpZ0Lu90BLKoHdhoKX/znjQ923c7Fy5wMgA07C8/++caX8rZxvMyJABNr5G/o+Y/hwCha5ngAnn5rxJvgT42iZY4J4OlvRJuAkXG8zKkA2DCusQl4Z9eM4mWOC6Dp5/zV3+ef/ZZRS5Y5HoCmn//VKb4P7xu1ZJkjAmj6uUfr1ROjli1zXABNf3jYjQmYWAvxMkcA0PQHxcscA8DTHx4vc3uA8OkPW+ZwwNzrhGceDEh/5SwUMEoKGAUDqnspr136WjDADOP0F1+DAEUP0w5fPWYAV/axF/vyN/bKvlkgoJmv+Wac6/f+3jd59oMB8RNAAAEEiJIA88xv5mKaO2CUHYC/97MCcBhnB+Dv/QwB/L2fMYC/97sJUEoppf4AxF4KMk77RSYAAAAASUVORK5CYII=);"></div>
				@else
					<div id="video-icon" title="Video" style="display:inline-block;width:25px;height:25px;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABm0lEQVR4Ae3aAWYDARAF0AVWK0doUlioBDpzm4IeIjlD7BEaaKEAyRGaI+xCzxFLW5BsoT5AdWe74/P/AIh4/MgkO4WiKIqiDMlqbhs7+sn7f56THW2zmhdjZjnzg128n27s4oflrBgnVWmt99OPtVU5CsB23ueM7Yp4rLJzGuBsVRjgW+8TZxsGWJMJsDYM8K9MgH/EAX3uCCCAAH+LAPbon9SAorA7e58Q8NsLhrzhzZW/8gJ+giqxAlAlXgCqxAtAlZgBqBIvAFXiBaBKzABUiReAKvECUCVmAKrEC0CVeAGoEjMAVeIFoErUgBdVKAvgD8QfYr+2Z32RZQFQHUYAqqN1OgGA6jACUB39qE8AoDqMAFRHfy0mAFAdRgCqwwkgf8CB6jAAJhgBBBBAgC4V0AUB+SdncUCdCqjDgPvbzLNLXwwHIPaUevgaB1SlNVmnx1EAjr9tP/Xxt+1x/B0CIL7w9TTn9/7ma3Q/AGCJAAIIIEAsAnTkp8XWsANqcgD2fVYA9n1eAPZ9VgD2fQ5AYN9PByiKoijKN3P3T8TyoBKRAAAAAElFTkSuQmCC);"></div>
				@endif
			</td>
		</tr>
		@endforeach
		@else
			<tr>
				<td colspan="4">No downloads yet for this client mailer.</td>
			</tr>
		@endif
	</table>

	<div class="clear"></div>

	@section('javascript')
	<script>
		$ = jQuery;
		$(document).ready(function(){
			$('#story-icon').tooltip();
			$('#video-icon').tooltip();

			$('.js-delete').click(function(e){
				e.preventDefault();
				if (confirm("Are you sure you want to delete this story?")) {
			       window.location = $(this).attr('href');
			    }
			    return false;
			});

			$('.js-stats-downloaded').click(function(e){
				e.preventDefault();
				var mailer = $(this).attr('href')
				if(mailer) {
					$.ajax({
					    type: 'GET',
					    url: mailer,
					    data: {},
					    dataType: 'json',
					    success: function (data) {
							if(data.status=='success') {
								//console.log(data);
								if(data.mailer_id) {
									var htmlcontent = '<strong>'+data.mailer_id+'</strong>';
									swal({  title: 'It worked', text: htmlcontent, icon: 'info', closeModal: false, closeOnClickOutside: true, closeOnEsc: true });
								}
							} else {
								alert('Something went wrong');
							}
					    }
					});
				}
			});
		});
	</script>
	@stop
@stop
