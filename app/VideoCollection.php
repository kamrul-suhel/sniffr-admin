<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
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
    use SoftDeletes;
    protected $guarded = [];
    public static $rules = [];
    protected $table = 'video_collections';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function videos()
    {
        return $this->hasMany(Video::class);
    }

    /**
     * @return bool
     */
    public function hasChildren()
    {
        return (DB::table('video_collections')->where('parent_id', '=', $this->id)->count() >= 1);
    }
}
