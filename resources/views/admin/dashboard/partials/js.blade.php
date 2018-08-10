<script type="text/javascript" src="//cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css"/>

<script>
    (function ($) {

        $('input[name="rangepicker"]').daterangepicker({
            alwaysShowCalendars: true,
            startDate: '{{ $from->format('d/m/Y') }}',
            endDate: '{{ $to->format('d/m/Y') }}',
            locale: {
                format: 'DD/MM/YYYY',
                firstDay: 1,
            },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last Week': [moment().subtract(1, 'weeks').startOf('isoWeek'), moment().subtract(1, 'weeks').endOf('isoWeek')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        });

        $('input[name="rangepicker"]').on('apply.daterangepicker', function (ev, picker) {
            window.location.search += '&from=' + picker.startDate.format('YYYY-MM-DD') + '&to=' + picker.endDate.format('YYYY-MM-DD');
        });

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
                            @foreach($allVideosStateTotalTotals as $newDates)
                            @if(array_search('new' , array_column($newDates, 'state')))
                            {{ $newDates[array_search('new', array_column($newDates, 'state'))]->total }},
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
                            {{ $pendingDates[array_search('pending', array_column($pendingDates, 'state'))]->total }},
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
                            {{ $rejectedDates[array_search('rejected', array_column($rejectedDates, 'state'))]->total }},
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
                            @foreach($allVideosStateTotalTotals as $restrictedDates)
                            @if(array_search('restricted' , array_column($restrictedDates, 'state')) !== false)
                            {{ $restrictedDates[array_search('restricted', array_column($restrictedDates, 'state'))]->total }},
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
                            @foreach($allVideosStateTotalTotals as $acceptedDates)
                            @if(array_search('accepted' , array_column($acceptedDates, 'state')) !== false)
                            {{ $acceptedDates[array_search('accepted', array_column($acceptedDates, 'state'))]->total }},
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
                            @foreach($allVideosStateTotalTotals as $licensedDates)
                            @if(array_search('licensed' , array_column($licensedDates, 'state')) !== false)
                            {{ $licensedDates[array_search('licensed', array_column($licensedDates, 'state'))]->total }},
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
                            {{ $newDate[array_search('new', array_column($newDate, 'state'))]->total }},
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
                            {{ $pendingDate[array_search('pending', array_column($pendingDate, 'state'))]->total }},
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
                            {{ $licensedDate[array_search('licensed', array_column($licensedDate, 'state'))]->total }},
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