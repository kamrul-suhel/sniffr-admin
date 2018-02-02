@extends('admin.master')

@section('content')

<div class="row">
    <div class="col-sm-3 col-xs-6">
		<div class="tile-stats tile-default">
            <a href="{{ url('/admin/videos') }}">
				<span class="icon"><i class="fa fa-download"></i></span>
				<span class="num" data-start="0" data-end="{{ $total_videos }}" data-postfix="" data-duration="1500" data-delay="0">0</span>
				<h3>Total Videos</h3>
            </a>
		</div>
	</div>

	<div class="col-sm-3 col-xs-6">
		<div class="tile-stats tile-aqua">
            <a href="{{ url('/admin/videos/new') }}">
				<span class="icon"><i class="fa fa-plus"></i></span>
				<span class="num" data-start="0" data-end="{{ $new_videos }}" data-postfix="" data-duration="1500" data-delay="600">0</span>
				<h3>New Videos</h3>
            </a>
		</div>
	</div>

	<div class="col-sm-3 col-xs-6">
		<div class="tile-stats tile-cyan">
            <a href="{{ url('/admin/videos/pending') }}">
				<span class="icon"><i class="fa fa-info-circle"></i></span>
				<span class="num" data-start="0" data-end="{{ $pending_videos }}" data-postfix="" data-duration="1500" data-delay="1200">0</span>
				<h3>Pending Videos</h3>
            </a>
		</div>
	</div>

	<div class="col-sm-3 col-xs-6">
		<div class="tile-stats tile-green">
            <a href="{{ url('/admin/videos/licensed') }}">
				<span class="icon"><i class="fa fa-youtube-play"></i></span>
				<span class="num" data-start="0" data-end="{{ $licensed_videos }}" data-postfix="" data-duration="1500" data-delay="1800">0</span>
				<h3>Licensed Videos</h3>
            </a>
		</div>
	</div>
</div>

<br />

<div class="row">
    <div class="col-sm-8">
        <div class="panel panel-primary" id="charts_env">
            <div class="panel-heading">
                <div class="panel-title">Video Submissions</div>
                
                <div class="panel-options">
                    <div class="ViewSelector" id="view-selector-container"></div>
                </div>
            </div>

            <div class="panel-body chart1-panel">
                <div class="tab-content">
                    <div class="chart"  id="chart-1-container"></div>
                    <div id="legend-1-container"></div>
                </div>
            </div><!-- .panel-body -->
        </div><!-- .panel-primary -->
    </div><!-- .col-sm-8 -->

	<div class="col-sm-4">
        <div class="panel panel-primary" id="charts_env">
            <div class="panel-heading">
                <div class="panel-title">Real-time Visitors</div>
            </div>

            <div class="panel-body active-users-panel">
				<div class="tab-content">
    				<div class="chart" id="chart-2-container"></div>
    				<div id="legend-2-container"></div>
    			</div>
    		</div>
    	</div>
    </div><!-- .col-sm-4 -->
</div><!-- .row -->

<div class="row">
	<div class="col-sm-6">
		<div class="panel panel-primary" id="charts_env">
			<div class="panel-heading">
			     <div class="panel-title">Top Browsers by Pageviews</div>
            </div>

			<div class="panel-body">
				<div class="tab-content">
					<div class="chart" id="chart-3-container"></div>
					
                    <div id="legend_container">
						<div id="smoother" title="Smoothing"></div>
						<div id="legend-3"></div>
					</div>
				</div>
			</div>
		</div><!-- .panel-primary -->
	</div><!-- .col-sm-6 -->

	<div class="col-sm-6">
		<div class="panel panel-primary" id="charts_env">
			<div class="panel-heading">
                <div class="panel-title">Top Countries by Sessions</div>
            </div>

			<div class="panel-body">
				<div class="tab-content">
					<div class="chart" id="chart-4-container"></div>
					
                    <div id="legend_container">
						<div id="smoother" title="Smoothing"></div>
						<div id="legend-4"></div>
					</div>
				</div>
			</div>
		</div><!-- .panel-primary -->
	</div><!-- .col-sm-6 -->
</div><!-- .row -->

<script>
	(function($){

		var graph = new Rickshaw.Graph( {
			element: document.querySelector("#chart-1-container"),
			renderer: 'area',
			stroke: true,
			series: [ {
				data: [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 } ],
				color: '#9cc1e0'
			}, {
				data: [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 } ],
				color: '#cae2f7'
			} ]
		} );

		graph.render();

		var graph = new Rickshaw.Graph({
			element: document.querySelector("#chart-2-container"),
			renderer: 'line',
			series: [{
				data: [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 } ],
				color: '#4682b4'
			}, {
				data: [ { x: 0, y: 20 }, { x: 1, y: 24 }, { x: 2, y: 19 }, { x: 3, y: 15 }, { x: 4, y: 16 } ],
				color: '#9cc1e0'
			}, {
				data: [ { x: 0, y: 20 }, { x: 1, y: 10 }, { x: 2, y: 23 }, { x: 3, y: 19 }, { x: 4, y: 39 } ],
				color: '#4682b4'
			}, {
				data: [ { x: 0, y: 20 }, { x: 1, y: 33 }, { x: 2, y: 10 }, { x: 3, y: 50 }, { x: 4, y: 9 } ],
				color: '#9cc1e0'
			}]
		});
		graph.render();

	  	var graph = new Rickshaw.Graph( {
			element: document.querySelector("#chart-3-container"),
			renderer: 'bar',
			series: [
				{
					data: [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 } ],
					color: '#4682b4',
					name: 'chrome'
				}, {
					data: [ { x: 0, y: 20 }, { x: 1, y: 24 }, { x: 2, y: 19 }, { x: 3, y: 15 }, { x: 4, y: 16 } ],
					color: '#9cc1e0',
					name: 'safari'
			} ]
		});

		graph.render();

		var graph = new Rickshaw.Graph( {
			element: document.querySelector("#chart-4-container"),
			renderer: 'bar',
			stack: false,
			series: [
				{
					data: [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 } ],
					color: '#4682b4'
				}, {
					data: [ { x: 0, y: 20 }, { x: 1, y: 24 }, { x: 2, y: 19 }, { x: 3, y: 15 }, { x: 4, y: 16 } ],
					color: '#9cc1e0'

			} ]
		} );

		graph.render();

	})(jQuery);
</script>

@stop
