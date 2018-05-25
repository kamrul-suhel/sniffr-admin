<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property integer story_id
 * @property integer user_id
 * @property integer client_id
 * @property string ip_address
 * @property string user_agent
 */
class Order extends Model
{
    use SoftDeletes;
    protected $table = 'orders';
    protected $guarded = [];
    public static $rules = [];

    public function client()
    {
        return $this->belongsTo(Client::class)->first();
    }

    public function story()
    {
        return $this->hasOne('App\Story', 'id')->first();
    }
}
