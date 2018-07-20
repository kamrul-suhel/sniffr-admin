<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @property int $id
 * @property int $client_id
 * @property Client $client
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property mixed role
 * @property int active
 * @property string password
 * @property string email
 * @property string username
 * @property string first_name
 * @property string last_name
 * @property string full_name
 * @property string tel
 * @property string job_title
 * @property string avatar
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    use Notifiable;

    public $webhook;

    protected $table = 'users';

    /**
     * @var array
     */
    protected $fillable = [
        'client_id', 'username', 'email', 'full_name', 'password', 'avatar', 'role', 'active',
    ];

    /**
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function canAccessAdmin()
    {
        return ($this->role == 'admin' || $this->role == 'manager' || $this->role == 'editorial');
    }

    public function canAccessClient()
    {
        return ($this->role == 'client_admin' || $this->role == 'client' || $this->role == 'admin' || $this->role == 'client_owner');
    }

    public function canAccessClientAdmin()
    {
        return ($this->role == 'client_admin' || $this->role == 'client_owner');
    }

    public function isAdmin()
    {
        return $this->role == 'admin';
    }

    public function collections()
    {
        return $this->hasMany(Collection::class);
    }

    public function userOffers()
    {
        return Collection::where([['client_id', '=',  $this->client_id] , ['status', '=', 'open']])->count();

        return Collection::whereHas('collectionVideos', function($query) {
            $query->where('status', 'offered');
        })->orWhereHas('collectionStories', function($query) {
            $query->where('status', 'offered');
        })->where('client_id', $this->client_id)->with('collectionVideos')->with('collectionStories')->count();
    }

    public function routeNotificationForSlack()
    {
    	if($this->webhook){
			return config('services.slack.channels.'.$this->webhook);
		}
    }

    public function slackChannel($channel){
    	$this->webhook = $channel;
    	return $this;
	}

}
