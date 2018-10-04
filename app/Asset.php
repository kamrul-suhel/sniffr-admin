<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

/**
 * @property string alpha_id
 * @property string url
 * @property null|string jw_player_code
 * @property string mime_type
 * @property string thumbnail
 */
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
