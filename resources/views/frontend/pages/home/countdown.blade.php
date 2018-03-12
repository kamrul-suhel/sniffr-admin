<!-- COUNTDOWN SECTION -->
<section class="countdown section_space">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <div class="countdown_container">
                    <div class="countdown_number">
                        <h2>{{number_format($total_video)}}</h2>
                    </div>
                    <div class="countdown_subtitle">
                        <p>EXCLUSIVE<br/>VIDEOS</p>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <div class="countdown_container">
                    <div class="countdown_number">
                        <h2>{{ number_format($current_month_upload_video) }}</h2>
                    </div>
                    <div class="countdown_subtitle">
                        <p>CURRENT MONTH<br/>UPLOADED</p>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <div class="countdown_container">
                    <div class="countdown_number">
                        <h2>{{number_format($active_video)}}</h2>
                    </div>
                    <div class="countdown_subtitle">
                        <p>TOTAL VIDEOS<br/>ACTIVE</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>