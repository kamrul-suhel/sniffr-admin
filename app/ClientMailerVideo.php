<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Download
 *
 * @property int $id
 * @property int $user_id
 * @property int $client_id
 * @property int story_id
 * @property string|null $type
 * @mixin \Eloquent
 */
class ClientMailerVideo extends Model
{
    //use SoftDeletes;
    protected $table = 'client_mailer_video';
    protected $guarded = [];
    public static $rules = [];
    protected $fillable = ['client_mailer_id', 'video_id'];

    /**
	 * @return \Illuminate\Database\Eloquent\Relations\belongsTo
	 */
    public function user()
    {
        return $this->belongsTo(User::class)->first();
    }

    /**
	 * @return \Illuminate\Database\Eloquent\Relations\belongsTo
	 */
	public function mailers()
	{
		return $this->belongsTo(ClientMailer::class)->first();
	}

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
	public function videos()
    {
        return $this->hasOne(Video::class);
    }

}
