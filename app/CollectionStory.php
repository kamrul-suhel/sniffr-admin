<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CollectionStory extends Model
{
    use SoftDeletes;

    protected $table = 'collection_stories';

	protected $fillable = ['collection_id', 'story_id', 'type', 'platform', 'length', 'class', 'final_price', 'company_location', 'company_tier', 'notes', 'status', 'licensed_at', 'license_ends_at'];

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

    /**
     * is the given story id currently being licensed?
     * @param $storyId
     * @return bool
     */
    public static function isStoryLicensed($storyId)
    {
        return CollectionStory::where('story_id', $storyId)
                ->where('status', 'purchased')
                ->whereNotNull('licensed_at')
                ->whereNotNull('license_ends_at')
                ->count() > 0;
    }

    /**
     * @param $videoId
     * @return mixed
     */
    public static function isOffered($videoId)
    {
        return CollectionStory::where('story_id', $videoId)
            ->where('status', 'offered');
    }

    /**
     * @param $videoId
     * @return mixed
     */
    public static function isRequested($videoId)
    {
        return CollectionStory::where('story_id', $videoId)
            ->where('status', 'requested');
    }



    public function calculateLicenseEndTime()
	{
		return config('pricing.length.'. $this->length .'.end_date');
	}
}
