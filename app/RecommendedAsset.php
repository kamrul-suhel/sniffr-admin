<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecommendedAsset extends Model
{
    protected $table = 'recommended_assets';

    public function video()
    {
        return $this->belongsTo(Video::class);
    }

    public function story()
    {
        return $this->belongsTo(Story::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
