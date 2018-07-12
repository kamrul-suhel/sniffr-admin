<script>
    (function ($) {

        var ctx = $('#video-sub-stacked-graph');
        ctx.height(285);
        new Chart($("#video-sub-stacked-graph"), {
            "type": "bar",
            "data": {
                "labels": [
					<?php foreach ($videos as $video) {
					echo '"' . $video[0]->created_at->format('jS M') . '",';
                }?>
                ],
                "datasets": [
                    {
                        "label": 'New',
                        "data": [
							<?php foreach ($videos as $video) {
							echo count($video->where('state', 'new')->where('rights','exc')) . ',';
						    }?>
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(54, 162, 235, 0.2)",
                        "borderWidth": 1
                    },
                    {
                        "label": 'Pending',
                        "data": [
							<?php foreach ($videos as $video) {
							echo count($video->where('state', 'pending')->where('rights','exc')) . ',';
						    }?>
                        ],
                        "fill": false,
                        "backgroundColor": "rgba(255, 205, 86, 0.2)",
                        "borderWidth": 1
                    },
                    {
                        "label": 'Licensed',
                        "data": [
							<?php foreach ($videos as $video) {
							echo count($video->where('state','licensed')->where('rights','exc')) . ',';
						    }?>
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


        var ctx = $('#sub-breakdown-graph');
        ctx.height(285);
        new Chart($("#sub-breakdown-graph"), {
            "type": "bar",
            "data": {
                "labels": [
                    <?php foreach ($videos as $video) {
                    echo '"' . $video[0]->created_at->format('jS M') . '",';
                }?>
                ],
                "datasets": [{
                    "label": 'New',
                    "data": [
                        <?php foreach ($videos as $video) {
                        echo count($video->where('state', 'new')->where('rights','ex')) . ',';
                    }?>
                    ],
                    "fill": false,
                    "backgroundColor": "rgba(54, 162, 235, 0.2)",
                    "borderWidth": 1
                },
                {
                    "label": 'Accepted',
                    "data": [
                        <?php foreach ($videos as $video) {
                        echo count($video->where('state', 'accepted')->where('rights','ex')) . ',';
                    }?>
                    ],
                    "fill": false,
                    "backgroundColor": "rgba(166, 255, 172, 0.2)",
                    "borderWidth": 1
                },
                {
                    "label": 'Licensed',
                    "data": [
                        <?php foreach ($videos as $video) {
                        echo count($video->where('state', 'licensed')->where('rights','ex')) . ',';
                    }?>
                    ],
                    "fill": false,
                    "backgroundColor": "rgba(0, 160, 90, 0.2)",
                    "borderWidth": 1
                },
                {
                    "label": 'Restricted',
                    "data": [
                        <?php foreach ($videos as $video) {
                        echo count($video->where('state', 'restricted')->where('rights','ex')) . ',';
                    }?>
                    ],
                    "fill": false,
                    "backgroundColor": "rgba(255, 205, 86, 0.2)",
                    "borderWidth": 1
                },
                {
                    "label": 'Rejected',
                    "data": [
                        <?php foreach ($videos as $video) {
                        echo count($video->where('state', 'rejected')->where('rights','ex')) . ',';
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