<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @mixin \Eloquent
 */
class VideoTag extends Model
{
    use SoftDeletes;
    protected $table = 'tag_video';
    protected $guarded = [];
    public static $rules = [];
}