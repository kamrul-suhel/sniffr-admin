<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $table = 'collections';

    public function collectionVideos()
    {
        return $this->hasMany(CollectionVideo::class);
    }

    public function collectionStories()
    {
        return $this->hasMany(CollectionStory::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
