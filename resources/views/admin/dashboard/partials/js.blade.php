<script>
    (function ($) {

        var ctx = $('#sub-breakdown-graph');
        ctx.height(285);
        new Chart($("#sub-breakdown-graph"), {
            "type": "bar",
            "data": {
                "labels": [
                    @foreach($allVideosStateTotalTotals as $key => $date)
                    <?php echo "'" . date('d M y', strtotime($key)) . "',"; ?>
                    @endforeach
                ],
                "datasets": [

                    {
                        "label": 'New',
                        "data": [
                            @foreach($allVideosStateTotalTotals as $datesNew)
                            @if(array_search('new' , array_column($datesNew, 'state')))
                            <?php echo "'" . $datesNew[array_search('new', array_column($datesNew, 'state'))]->total . "',";?>
                            @else
                            <?php echo "'0',";?>
                            @endif
                            @endforeach
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(54, 162, 235, 0.2)",
                        "borderWidth": 1
                    },

                    {
                        "label": 'Pending',
                        "data": [
                            @foreach($allVideosStateTotalTotals as $pendingDates)
                            @if(array_search('pending' , array_column($pendingDates, 'state')) !== false)
                            <?php echo "'" . $pendingDates[array_search('pending', array_column($pendingDates, 'state'))]->total . "',";?>
                            @else
                            <?php echo "'0',";?>
                            @endif
                            @endforeach
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(255, 205, 86, 0.2)",
                        "borderWidth": 1
                    },

                    {
                        "label": 'Rejected',
                        "data": [
                            @foreach($allVideosStateTotalTotals as $rejectedDates)
                            @if(array_search('rejected' , array_column($rejectedDates, 'state')) !== false)
                            <?php echo "'" . $rejectedDates[array_search('rejected', array_column($rejectedDates, 'state'))]->total . "',";?>
                            @else
                            <?php echo "'0',";?>
                            @endif
                            @endforeach
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(255, 100, 100, 0.2)",
                        "borderWidth": 1
                    },

                    {
                        "label": 'Restricted',
                        "data": [
                            @foreach($allVideosStateTotalTotals as $rejectedDates)
                            @if(array_search('restricted' , array_column($rejectedDates, 'state')) !== false)
                            <?php echo "'" . $rejectedDates[array_search('restricted', array_column($rejectedDates, 'state'))]->total . "',";?>
                            @else
                            <?php echo "'0',";?>
                            @endif
                            @endforeach
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(100, 100, 100, 0.3)",
                        "borderWidth": 1
                    },

                    {
                        "label": 'Accepted',
                        "data": [
                            @foreach($allVideosStateTotalTotals as $rejectedDates)
                            @if(array_search('accepted' , array_column($rejectedDates, 'state')) !== false)
                            <?php echo "'" . $rejectedDates[array_search('accepted', array_column($rejectedDates, 'state'))]->total . "',";?>
                            @else
                            <?php echo "'0',";?>
                            @endif
                            @endforeach
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(100, 255, 100, 0.2)",
                        "borderWidth": 1
                    },

                    {
                        "label": 'Licensed',
                        "data": [
                            @foreach($allVideosStateTotalTotals as $rejectedDates)
                            @if(array_search('licensed' , array_column($rejectedDates, 'state')) !== false)
                            <?php echo "'" . $rejectedDates[array_search('licensed', array_column($rejectedDates, 'state'))]->total . "',";?>
                            @else
                            <?php echo "'0',";?>
                            @endif
                            @endforeach
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(0, 160, 90, 0.2)",
                        "borderWidth": 1
                    },

                ],
            },
            "options": {
                maintainAspectRatio: false,
                legend: {
                    display: true
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        beginAtZero: true,
                    }],
                    yAxes: [{
                        stacked: true,
                        beginAtZero: true
                    }]
                },
            }
        });


        var ctx = $('#video-sub-stacked-graph');
        ctx.height(285);
        new Chart($("#video-sub-stacked-graph"), {
            "type": "bar",
            "data": {
                "labels": [
                    @foreach($allVideosStateTotalTotalsExc as $key => $date)
                    <?php echo "'" . date('d M y', strtotime($key)) . "',"; ?>
                    @endforeach
                ],
                "datasets": [
                    {
                        "label": 'New',
                        "data": [
                            @foreach($allVideosStateTotalTotalsExc as $newDate)
                            @if(array_search('new' , array_column($newDate, 'state')) !== false)
                            <?php echo "'" . $newDate[array_search('new', array_column($newDate, 'state'))]->total . "',"; ?>
                            @else
                            <?php echo "'0',";?>
                            @endif
                            @endforeach
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(54, 162, 235, 0.2)",
                        "borderWidth": 1
                    },
                    {
                        "label": 'Pending',
                        "data": [
                            @foreach($allVideosStateTotalTotalsExc as $pendingDate)
                            @if(array_search('pending' , array_column($pendingDate, 'state')) !== false)
                            <?php echo "'" . $pendingDate[array_search('pending', array_column($pendingDate, 'state'))]->total . "',"; ?>
                            @else
                            <?php echo "'0',";?>
                            @endif
                            @endforeach
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(255, 205, 86, 0.2)",
                        "borderWidth": 1
                    },
                    {
                        "label": 'Licensed',
                        "data": [
                            @foreach($allVideosStateTotalTotalsExc as $licensedDate)
                            @if(array_search('licensed' , array_column($licensedDate, 'state')) !== false)
                            <?php echo "'" . $licensedDate[array_search('licensed', array_column($licensedDate, 'state'))]->total . "',"; ?>
                            @else
                            <?php echo "'0',";?>
                            @endif
                            @endforeach
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(0, 160, 90, 0.2)",
                        "borderWidth": 1
                    }
                ]
            },
            "options": {
                maintainAspectRatio: false,
                legend: {
                    display: true
                },
                "scales": {
                    "xAxes": [{
                        stacked: true
                    }],
                    "yAxes": [{
                        stacked: true,
                        "ticks": {
                            "beginAtZero": true
                        }
                    }]
                }
            }
        });

            <?php if(\Auth::user()->isAdmin()): ?>
        var ctx = $('#exc-licensed-breakdown');
        ctx.height(285);
        new Chart($("#exc-licensed-breakdown"), {
            "type": "bar",
            "data": {
                "labels": [
                    <?php foreach ($exc_contracts as $contract) {
                    echo '"' . Carbon\Carbon::parse($contract[0]->signed_at)->format('jS M') . '",';
                }?>
                ],
                "datasets": [
                        <?php foreach ($exc_contracts_users as $user): $userId = $user[0]->user_id; ?>
                    {
                        "label": '<?php echo \App\User::find($userId)->full_name; ?>',
                        "data": [
                            <?php foreach ($exc_contracts as $contract) {
                            echo count($contract->where('user_id', $userId)) . ',';
                        }?>
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(<?php echo mt_rand(0, 255); ?>, <?php echo mt_rand(0, 255); ?>, <?php echo mt_rand(0, 255); ?>, 0.2)",
                        "borderWidth": 1
                    },
                    <?php endforeach; ?>
                ]
            },
            "options": {
                maintainAspectRatio: false,
                legend: {
                    display: true
                },
                "scales": {
                    "xAxes": [{
                        stacked: true
                    }],
                    "yAxes": [{
                        stacked: true,
                        "ticks": {
                            "beginAtZero": true
                        }
                    }]
                }
            }
        });
        <?php endif; ?>
    })(jQuery);
</script>