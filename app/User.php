<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password', 'avatar', 'role', 'active',
    ];

    protected $table = 'users';

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function client() {
        return $this->belongsTo(Client::class)->first();
    }

    public function canAccessAdmin() {
        if($this->role=='admin' || $this->role=='manager' ){
            return true;
        }

        return false;
    }

    public function canAccessClient() {
        if($this->role=='client' || $this->role=='admin'){
            return true;
        }

        return false;
    }

    public function isAdmin() {
        return $this->role=='admin';
    }

    public function routeNotificationForSlack()
    {
        return 'https://hooks.slack.com/services/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';
    }
}
