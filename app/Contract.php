<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property integer $revenue_share
 * @property integer $success_system
 * @property string $credit
 * @property string $notes
 * @property string $upfront_payment
 * @property integer $upfront_payment_currency_id
 * @property string $reference_id
 * @property integer $user_id
 * @property integer $video_id
 * @property integer $contract_model_id
 * @property string $token
 * @property string $signed_at
 * @property string $ip
 * @property string $user_agent
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
        'token',
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
