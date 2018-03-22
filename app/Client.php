<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
// use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use Notifiable;

    protected $guarded = [];

  	public static $rules = array();

    protected $table = 'clients';

  	//protected $fillable = array('user_id', 'title', 'slug', 'image', 'body', 'active', 'created_at');

    public function campaigns()
    {
        return $this->hasMany(Campaign::class);
    }

    public function routeNotificationForSlack()
    {
        return 'https://hooks.slack.com/services/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';
    }
}
