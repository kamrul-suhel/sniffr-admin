<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property integer $revenue_share
 * @property integer $success_system
 * @property string $credit
 * @property integer $user_id
 * @property string $video_id
 * @property string $upfront_payment
 * @property string $token
 * @property string notes
 */
class Contract extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'revenue_share',
        'success_system',
        'credit',
        'notes',
        'upfront_payment',
        'video_id',
    ];
}
