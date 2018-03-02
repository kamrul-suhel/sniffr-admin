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
        <div class="panel panel-primary">
            <div class="panel-heading">
                <div class="panel-title">Video Submissions</div>
            </div>

            <div class="panel-body">
                <div class="tab-content">
                    <canvas id="video-traffic"></canvas>
                </div>
            </div><!-- .panel-body -->
        </div><!-- .panel-primary -->
    </div><!-- .col-sm-8 -->

	<div class="col-sm-4">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <div class="panel-title">Submissions Breakdown</div>
            </div>

            <div class="panel-body">
				<div class="tab-content">
    				<canvas id="sub-breakdown"></canvas>
    			</div>
    		</div>
    	</div>
    </div><!-- .col-sm-4 -->
</div><!-- .row -->

<div class="row">
	<div class="col-sm-6">
		<div class="panel panel-primary" id="charts_env">
			<div class="panel-heading">
			     <div class="panel-title">Best performing videos</div>
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

@section('javascript')
<script>
    
	(function($){
        var ctx = $('#video-traffic');
        ctx.height(285);

        new Chart($("#video-traffic"),{
            "type":"bar",
            "data":{
                "labels":[
                    <?php foreach($video_traffic as $video){
                        echo '"'.$video[0]->created_at->format('D j/M').'",';
                    }?>
                ],
                "datasets":[{
                    "data":[
                        <?php foreach($video_traffic as $video){
                            echo count($video).',';
                        }?>
                    ],
                    "fill":false,
                    "backgroundColor":["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],"borderColor":["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)"],
                    "borderWidth":1
                }]
            },
            "options":{
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                "scales":{
                    "yAxes":[{
                        "ticks":{
                            "beginAtZero":true
                        }
                    }]
                }
            }
        });

        var ctx = $('#sub-breakdown');
        ctx.height(285);

        new Chart($("#sub-breakdown"),{
            "type":"doughnut",
            "data":{
                "labels":['Licensed','Restricted','Problem','Rejected'],
                "datasets":[{
                    "data":[
                        <?php echo count($video_state_count['licensed']); ?>,
                        <?php echo count($video_state_count['restricted']); ?>,
                        <?php echo count($video_state_count['problem']) ?>,
                        <?php echo count($video_state_count['rejected']) ?>
                    ],
                    "backgroundColor":[
                        "rgb(0, 166, 90)",
                        "rgb(238, 136, 5)",
                        "rgb(255, 104, 186)",
                        "rgb(255, 99, 99)",
                    ]
                }]
            },
            "options":{
                maintainAspectRatio: false,
                legend: {
                    display: true
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                return previousValue + currentValue;
                            });
                      
                            var currentValue = dataset.data[tooltipItem.index];
                            var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                            return currentValue + ' (' + precentage + "%)";
                        }
                    }
                }
            }
        });
	})(jQuery);
</script>
@stop

@stop
