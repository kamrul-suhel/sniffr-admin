<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \App\Video|null $videos
 * @mixin \Eloquent
 */
class VideoCollection extends Model
{
    protected $guarded = [];
    public static $rules = [];
    protected $table = 'video_collections';

    public function videos()
    {
        return $this->hasMany(Video::class);
    }

    public function hasChildren()
    {
        if (DB::table('video_collections')->where('parent_id', '=', $this->id)->count() >= 1) {
            return true;
        } else {
            return false;
        }
    }
}