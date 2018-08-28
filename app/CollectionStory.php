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

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
    public function story()
    {
        return $this->belongsTo(Story::class)->withTrashed();
    }

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
    public function quotes()
    {
        return $this->hasMany(CollectionQuote::class, 'collection_story_id', 'id');
    }

	/**
	 * @return string
	 */
	public function getPlatformString(){
		$values = explode(',', $this->platform);
		$response = '';

		foreach($values as $value){
			$response .= config('pricing.platform.' . $value . '.name') . ', ';
		}

		return rtrim($response, ', ');
	}

	/**
	 * Run pricing through matrix calculations and return price
	 * @param array $data
	 * @return float
	 */
	public function calculatePrice(array $data)
	{
		$price = config('pricing.base');

		$price = $price * (config('pricing.class.' . isset($data['class']) . '.modifier') ?: 1);
		$price = $price * (config('pricing.locations.' . isset($data['company_location']) . '.modifier') ?: 1);
		$price = $price * (config('pricing.tier.' . isset($data['company_tier']) . '.modifier') ?: 1);
		$price = $price * (config('pricing.type.' . isset($data['type']) . '.modifier') ?: 1);
		$price = $price * (config('pricing.length.' . isset($data['length']) . '.modifier') ?: 1);

		$modifier = 1;
		$platforms = explode(',', $data['platform']);

		foreach($platforms as $platform) {
			$modifier += config('pricing.platform.' . $platform . '.modifier') ?: 1;
		}
		$price = $price * $modifier;


		return $price = round($price, 2);
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

	/**
	 * @return \Illuminate\Config\Repository|mixed
	 */
    public function calculateLicenseEndTime()
	{
		return config('pricing.length.'. $this->length .'.end_date');
	}

	/**
	 * @return $this|bool
	 */
	public function acceptAssetQuote()
	{
		if ($this->collection->user_id !== auth()->user()->id) {
			return false;
		}

		$this->update([
			'status' => 'purchased',
			'license_ends_at' => $this->calculateLicenseEndTime(),
			'licensed_at' => Carbon::now(),
		]);

		return $this;
	}

	/**
	 * @return $this|bool
	 */
	public function rejectAssetQuote()
	{
		if($this->collection->user_id !== auth()->user()->id) {
			return false;
		}

		$this->update([
			'status' => 'requested',
		]);

		return $this;
	}

	/**
	 * @param $data
	 * @return mixed
	 */
	public function updateCollectionQuote($data)
	{
		$quoteId = $this->quotes()->max('id');
		$quote = CollectionQuote::find($quoteId);
		$quote->update($data);

		return $quote;
	}

}
