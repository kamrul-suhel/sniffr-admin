<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CollectionStory extends Model
{
    protected $table = 'collection_stories';

	protected $fillable = ['collection_id', 'story_id', 'final_price', 'notes', 'status'];

    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }

    public function story()
    {
        return $this->belongsTo(Story::class);
    }

    public function quotes()
    {
        return $this->hasMany(CollectionQuote::class, 'collection_story_id', 'id');
    }
}
