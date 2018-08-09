<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CollectionVideo extends Model
{

    use SoftDeletes;

    protected $table = 'collection_videos';

    protected $fillable = ['collection_id', 'video_id', 'type', 'platform', 'length', 'class', 'final_price', 'company_location', 'company_tier', 'notes', 'status', 'licensed_at', 'license_ends_at'];

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
    public function video()
    {
        return $this->belongsTo(Video::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function quotes()
    {
        return $this->hasMany(CollectionQuote::class, 'collection_video_id', 'id');
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
     * is the given video id currently being licensed?
     * @param $videoId
     * @return bool
     */
    public static function isVideoLicensed($videoId)
    {
        return CollectionVideo::where('video_id', $videoId)
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
        return CollectionVideo::where('video_id', $videoId)
            ->where('status', 'offered');
    }

    /**
     * @param $videoId
     * @return mixed
     */
    public static function isRequested($videoId)
    {
        return CollectionVideo::where('video_id', $videoId)
            ->where('status', 'requested');
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

    public function calculateLicenseEndTime()
    {
        return config('pricing.length.'. $this->length .'.end_date');
    }
}
