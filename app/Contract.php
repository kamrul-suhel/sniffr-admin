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
 * @property string reference_id
 * @property integer contract_model_id
 * @property integer upfront_payment_currency_id
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
        'upfront_payment_currency',
        'reference_id',
        'user_id',
        'video_id',
        'contract_model_id',
        'signed_at',
        'ip',
        'user_agent',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
