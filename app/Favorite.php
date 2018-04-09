<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Favorite
 *
 * @property int $id
 * @property int $user_id
 * @property int $video_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favorite whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favorite whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favorite whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favorite whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favorite whereVideoId($value)
 * @mixin \Eloquent
 */
class Favorite extends Model
{
    protected $table = 'favorites';
    protected $guarded = array();
    public static $rules = array();

    protected $fillable = array('user_id', 'video_id');

    public function user()
    {
        return $this->belongsTo(User::class)->first();
    }

    public function video()
    {
        return $this->belongsTo(Video::class)->first();
    }
}