<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @mixin \Eloquent
 */
class PaymentSetting extends Model
{
    protected $guarded = [];
    public static $rules = [];
    public $timestamps = false;
    protected $fillable = [
        'live_mode',
        'test_secret_key',
        'test_publishable_key',
        'live_secret_key',
        'live_publishable_key'
    ];
}