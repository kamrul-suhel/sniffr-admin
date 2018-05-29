<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClientMailer extends Model
{
    use SoftDeletes, Notifiable;

    protected $guarded = [];
    public static $rules = [];
    protected $table = 'client_mailer';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function stories()
    {
        return $this->belongsToMany(Story::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
