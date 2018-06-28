<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CollectionStory extends Model
{
    protected $table = 'collection_stories';

    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }

    public function story()
    {
        return $this->hasOne(Story::class);
    }

    public function quotes()
    {
        return $this->hasMany(CollectionQuote::class);
    }
}
