<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CollectionVideo extends Model
{
    protected $table = 'collection_videos';

    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }

    public function video()
    {
        return $this->belongsTo(Video::class);
    }

    public function quotes()
    {
        return $this->hasMany(CollectionQuote::class, 'collection_video_id', 'id');
    }

}
