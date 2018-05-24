<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

class Asset extends Model
{
    use SoftDeletes, Notifiable;

    protected $guarded = [];
    protected $table = 'assets';
    protected $hidden = ["deleted_at"];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function stories()
    {
        return $this->belongsToMany(Story::class);
    }

}
