<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Download
 *
 * @property int $id
 * @property int $user_id
 * @property int $client_id
 * @property int $video_id
 * @property string|null $type
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Download whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Download whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Download whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Download whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Download whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Download whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Download whereVideoId($value)
 * @mixin \Eloquent
 */
class Download extends Model {

	protected $table = 'downloads';
	protected $guarded = array();
	public static $rules = array();

	protected $fillable = array('user_id', 'video_id');

	public function user(){
		return $this->belongsTo(User::class)->first();
	}

	public function video(){
		return $this->belongsTo(Video::class)->first();
	}
}
