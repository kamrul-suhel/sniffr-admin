
<script>
    (function ($) {
        var ctx = $('#video-traffic');
        ctx.height(285);

        new Chart($("#video-traffic"), {
            "type": "bar",
            "data": {
                "labels": [
                    <?php foreach ($video_traffic as $video) {
                    echo '"' . $video[0]->created_at->format('jS M') . '",';
                }?>
                ],
                "datasets": [{
                    "data": [
                        <?php foreach ($video_traffic as $video) {
                        echo count($video) . ',';
                    }?>
                    ],
                    "fill": false,
                    "backgroundColor": "rgba(48, 54, 65, 0.8)",
                    "borderWidth": 1
                }]
            },
            "options": {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                "scales": {
                    "yAxes": [{
                        "ticks": {
                            "beginAtZero": true
                        }
                    }]
                }
            }
        });

        var ctx = $('#sub-state-overview');
        ctx.height(285);

        new Chart($("#sub-state-overview"), {
            "type": "doughnut",
            "data": {
                "labels": ['Accepted', 'Licensed', 'Restricted', 'Problem', 'Rejected'],
                "datasets": [{
                    "data": [
                        <?php echo count($video_state_count['accepted']); ?>,
                        <?php echo count($video_state_count['licensed']); ?>,
                        <?php echo count($video_state_count['restricted']); ?>,
                        <?php echo count($video_state_count['problem']) ?>,
                        <?php echo count($video_state_count['rejected']) ?>
                    ],
                    "backgroundColor": [
                        "rgb(166, 255, 172)",
                        "rgb(0, 160, 90)",
                        "rgb(255, 205, 86)",
                        "rgb(255, 80, 80)",
                        "rgb(255, 20, 20)",
                    ]
                }]
            },
            "options": {
                maintainAspectRatio: false,
                legend: {
                    display: true
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                                return previousValue + currentValue;
                            });

                            var currentValue = dataset.data[tooltipItem.index];
                            var precentage = Math.floor(((currentValue / total) * 100) + 0.5);
                            return currentValue + ' (' + precentage + "%)";
                        }
                    }
                }
            }
        });

        var ctx = $('#sub-breakdown-graph');
        ctx.height(285);

        new Chart($("#sub-breakdown-graph"), {
            "type": "bar",
            "data": {
                "labels": [
                    <?php foreach ($video_traffic as $video) {
                    echo '"' . $video[0]->created_at->format('jS M') . '",';
                }?>
                ],
                "datasets": [{
                    "label": 'New',
                    "data": [
                        <?php foreach ($video_traffic as $video) {
                        echo count($video->where('state', 'new')) . ',';
                    }?>
                    ],
                    "fill": false,
                    "backgroundColor": "rgba(54, 162, 235, 0.2)",
                    "borderWidth": 1
                },
                    {
                        "label": 'Accepted',
                        "data": [
                            <?php foreach ($video_traffic as $video) {
                            echo count($video->where('state', 'accepted')) . ',';
                        }?>
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(166, 255, 172, 0.2)",
                        "borderWidth": 1
                    },
                    {
                        "label": 'Licensed',
                        "data": [
                            <?php foreach ($video_traffic as $video) {
                            echo count($video->where('state', 'licensed')) . ',';
                        }?>
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(0, 160, 90, 0.2)",
                        "borderWidth": 1
                    },
                    {
                        "label": 'Restricted',
                        "data": [
                            <?php foreach ($video_traffic as $video) {
                            echo count($video->where('state', 'restricted')) . ',';
                        }?>
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(255, 205, 86, 0.2)",
                        "borderWidth": 1
                    },
                    {
                        "label": 'Rejected',
                        "data": [
                            <?php foreach ($video_traffic as $video) {
                            echo count($video->where('state', 'rejected')) . ',';
                        }?>
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(255, 20, 20, 0.2)",
                        "borderWidth": 1
                    }]
            },
            "options": {
                maintainAspectRatio: false,
                legend: {
                    display: false
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
    })(jQuery);
</script>