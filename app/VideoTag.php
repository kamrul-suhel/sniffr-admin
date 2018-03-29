<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @mixin \Eloquent
 */
class VideoTag extends Model
{
    protected $table = 'tag_video';
    protected $guarded = [];
    public static $rules = [];
}