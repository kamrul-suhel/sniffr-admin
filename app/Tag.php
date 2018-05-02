<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property mixed $videos
 * @mixin \Eloquent
 */
class Tag extends Model
{
    //use SoftDeletes;
    protected $guarded = [];
    public static $rules = [];

    public function videos()
    {
        return $this->belongsToMany(Video::class);
    }
}
