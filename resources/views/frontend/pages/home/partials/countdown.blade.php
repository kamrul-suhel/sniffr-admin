<!-- COUNTDOWN SECTION -->
<section class="countdown section_space">
    <v-container grid-row-xl>
        <v-layout row>
            <v-flex xs12 sm12 md4 lg4 xl4>
                <div class="countdown_container">
                    <div class="countdown_number">
                        <h2>{{number_format($total_video)}}</h2>
                    </div>
                    <div class="countdown_subtitle">
                        <p>EXCLUSIVE<br/>VIDEOS</p>
                    </div>
                </div>
            </v-flex>
            <v-flex xs12 sm12 md4 lg4 xl4>
                <div class="countdown_container">
                    <div class="countdown_number">
                        <h2>{{ number_format($current_month_upload_video) }}</h2>
                    </div>
                    <div class="countdown_subtitle">
                        <p>CURRENT MONTH<br/>UPLOADED</p>
                    </div>
                </div>
            </v-flex>
            <v-flex xs12 sm12 md4 lg4 xl4>
                <div class="countdown_container">
                    <div class="countdown_number">
                        <h2>{{number_format($active_video)}}</h2>
                    </div>
                    <div class="countdown_subtitle">
                        <p>TOTAL VIDEOS<br/>ACTIVE</p>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</section>