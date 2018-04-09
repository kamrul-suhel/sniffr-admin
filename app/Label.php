<?php

namespace App;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @mixin \Eloquent
 */
class Label extends \BaoPham\DynamoDb\DynamoDbModel
{
    protected $table = 'et-video-service-labels-et-video-service-dev';
}
