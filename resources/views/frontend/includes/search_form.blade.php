<div class="videos_filter_section">
    <form action="/search" method="get" class="videos_filter_form">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg4">
                    <div class="form-group">
                        <input type="text"
                               class="form-control"
                               name="value"
                               id="filterby"
                               aria-describedby="filterhelp"
                               @if($search_value)
                                    value="{{$search_value}}"
                               @endif

                               placeholder="Filter">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg4">
                    <div class="form-group">
                        <input type="text"
                               class="form-control"
                               name="sort_by" id="sort_by"
                               aria-describedby="sort_by"
                               placeholder="Sort">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg4">
                    <div class="form-group">
                        <input type="submit" class="form-control" id="filter_search" value="Search">
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>