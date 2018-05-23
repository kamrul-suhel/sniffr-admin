<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property integer story_id
 * @property integer user_id
 * @property integer client_id
 * @property array|string ip_address
 * @property array|string user_agent
 */
class Order extends Model
{
    use SoftDeletes;
    protected $table = 'orders';
    protected $guarded = [];
    public static $rules = [];
    protected $fillable = [
        'user_id',
        'story_id',
        'client_id',
        'ip_address',
        'user_agent',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class)->first();
    }

    public function story()
    {
        return $this->belongsTo(Video::class)->first();
    }
}
