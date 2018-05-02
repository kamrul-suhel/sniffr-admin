<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @property int $id
 * @property Client $client
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property mixed role
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    //use SoftDeletes;
    use Notifiable;

    protected $table = 'users';

    /**
     * @var array
     */
    protected $fillable = [
        'client_id', 'username', 'email', 'password', 'avatar', 'role', 'active',
    ];

    /**
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Model|null|object|static
     */
    public function client()
    {
        return $this->belongsTo(Client::class)->first();
    }

    public function canAccessAdmin()
    {
        return ($this->role == 'admin' || $this->role == 'manager' || $this->role == 'editorial');
    }

    public function canAccessClient()
    {
        return ($this->role == 'client' || $this->role == 'admin');
    }

    public function isAdmin()
    {
        return $this->role == 'admin';
    }

    public function routeNotificationForSlack()
    {
        return 'https://hooks.slack.com/services/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';
    }
}
