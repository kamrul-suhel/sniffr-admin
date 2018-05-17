<div class="row">
    <div class="col-sm-6">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">Client Exclusivity</div>

                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>

            <div class="panel-body" style="display: block;">
                @if(isset($video) && count($video->campaigns)>0)
                    @foreach($video->campaigns as $campaign)
                        <?php
                        // TODO: calculate this time in the controller
                        $date1 = now();
                        $date2 = new DateTime($campaign->pivot->created_at);

                        $diff = $date2->diff($date1);

                        $exclusivity = 48 - ($diff->h + ($diff->days * 24));
                        ?>
                        {{ $campaign->name }}
                        : {{ $exclusivity > 0 ? $exclusivity.' Hours left' : 'Exclusivity Expired' }}
                    @endforeach
                @else
                    <p>Not currently selected for any campaigns</p>
                @endif
            </div>
        </div>
    </div>
</div>