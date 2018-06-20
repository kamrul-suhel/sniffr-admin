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
class ClientMailerOpen extends Model
{
    //use SoftDeletes;
    protected $table = 'client_mailer_open';
    protected $guarded = [];
    public static $rules = [];
    protected $fillable = ['client_mailer_id', 'user_id', 'user_client_id', 'ip', 'user_agent'];

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
}
