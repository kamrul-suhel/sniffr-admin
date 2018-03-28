<!-- COUNTDOWN SECTION -->
<section class="countdown section-space">
    <v-container grid-row-lg>
        <v-layout row wrap>
            <v-flex xs12 sm4 md4 lg4 xl4>
                <div class="countdown-container">
                    <div class="countdown-number">
                        <h2>{{number_format($total_video)}}</h2>
                    </div>
                    <div class="countdown-subtitle">
                        <p>EXCLUSIVE<br/>VIDEOS</p>
                    </div>
                </div>
            </v-flex>
            <v-flex xs12 sm4 md4 lg4 xl4>
                <div class="countdown-container">
                    <div class="countdown-number">
                        <h2>{{ number_format($current_month_upload_video) }}</h2>
                    </div>
                    <div class="countdown-subtitle">
                        <p>CURRENT MONTH<br/>UPLOADED</p>
                    </div>
                </div>
            </v-flex>
            <v-flex xs12 sm4 md4 lg4 xl4>
                <div class="countdown-container">
                    <div class="countdown-number">
                        <h2>{{number_format($active_video)}}</h2>
                    </div>
                    <div class="countdown-subtitle">
                        <p>TOTAL VIDEOS<br/>ACTIVE</p>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</section>