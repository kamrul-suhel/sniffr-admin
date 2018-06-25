
<div class="row">
    <div class="col-sm-3 col-xs-6">
        <div class="tile-stats tile-default">
            <a href="{{ url('/admin/videos') }}">
                <span class="icon"><i class="fa fa-download"></i></span>
                <span class="num" data-start="0" data-end="{{ $total_videos }}" data-postfix="" data-duration="1500"
                      data-delay="0">0</span>
                <h3>Total Videos</h3>
            </a>
        </div>
    </div>

    <div class="col-sm-3 col-xs-6">
        <div class="tile-stats tile-aqua">
            <a href="{{ url('/admin/videos/new') }}">
                <span class="icon"><i class="fa fa-plus"></i></span>
                <span class="num" data-start="0" data-end="{{ $new_videos }}" data-postfix="" data-duration="1500"
                      data-delay="600">0</span>
                <h3>New Videos</h3>
            </a>
        </div>
    </div>

    <div class="col-sm-3 col-xs-6">
        <div class="tile-stats tile-cyan">
            <a href="{{ url('/admin/videos/pending') }}">
                <span class="icon"><i class="fa fa-info-circle"></i></span>
                <span class="num" data-start="0" data-end="{{ $pending_videos }}" data-postfix=""
                      data-duration="1500" data-delay="1200">0</span>
                <h3>Pending Videos</h3>
            </a>
        </div>
    </div>

    <div class="col-sm-3 col-xs-6">
        <div class="tile-stats tile-green">
            <a href="{{ url('/admin/videos/licensed') }}">
                <span class="icon"><i class="fa fa-youtube-play"></i></span>
                <span class="num" data-start="0" data-end="{{ $licensed_videos }}" data-postfix=""
                      data-duration="1500" data-delay="1800">0</span>
                <h3>Licensed Videos</h3>
            </a>
        </div>
    </div>
</div>

<br/>

<div class="row">
      <div class="col-sm-12">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <div class="panel-title">Video Submissions</div>
            </div>

            <div class="panel-body">
                <div class="tab-content">
                    <canvas id="video-sub-stacked-graph"></canvas>
                </div>
            </div>
        </div>
    </div>


    <div class="col-sm-12">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <div class="panel-title">Submissions Breakdown</div>
            </div>

            <div class="panel-body">
                <div class="tab-content">
                    <canvas id="sub-breakdown-graph"></canvas>
                </div>
            </div>
        </div>
    </div>

    <div class="col-sm-12">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <div class="panel-title">Submissions State Overview</div>
            </div>

            <div class="panel-body">
                <div class="tab-content">
                    <canvas id="sub-state-overview"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>