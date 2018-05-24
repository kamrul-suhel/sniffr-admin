<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;
    protected $table = 'orders';
    protected $guarded = [];
    public static $rules = [];
    protected $fillable = ['user_id', 'video_id', 'client_id', 'ip', 'user_agent', 'ordered_at'];

    public function client()
    {
        return $this->belongsTo(Client::class)->first();
    }


    public function video()
    {
        return $this->belongsTo(Video::class)->first();
    }
}
