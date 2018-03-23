<div class="videos_filter_section">
    <form action="/search" method="get" class="videos_filter_form">
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 sm12 md4 lg4>
                    <div class="form-group">
                        <input type="text"
                               class="form-control"
                               name="value"
                               id="filterby"
                               aria-describedby="filterhelp"
                               @if(isset($search_value))
                                    value="{{$search_value}}"
                               @endif

                               placeholder="Filter">
                    </div>
                </v-flex>

                <v-flex xs12 sm12 md4 lg4>
                    <div class="form-group">
                        <input type="text"
                               class="form-control"
                               name="sort_by" id="sort_by"
                               aria-describedby="sort_by"
                               placeholder="Sort">
                    </div>
                </v-flex>

                <v-flex xs12 sm12 md4 lg4>
                    <div class="form-group">
                        <input type="submit" class="form-control" id="filter_search" value="Search">
                    </div>
                </v-flex>

            </v-layout>
        </v-container>
    </form>
</div>