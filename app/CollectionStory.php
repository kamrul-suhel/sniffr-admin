<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CollectionStory extends Model
{
    protected $table = 'collection_stories';

	protected $fillable = ['collection_id', 'story_id', 'final_price', 'notes', 'status', 'licensed_at', 'license_ends_at'];

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

    /**
     * Get a video of a specific type and status. (common occurrence throughout site)
     * @param $type
     * @param $status
     * @return mixed
     */
    public function getAssetByTypeStatus($type, $status)
    {
        return $this->where([['type', $type], ['status', $status]])->get();
    }
}
