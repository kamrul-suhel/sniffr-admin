<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class CollectionVideo extends Model
{
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

        $price = $price * (config('pricing.class.' . $data['class'] . '.modifier') ?: 1);
        $price = $price * (config('pricing.locations.' . $data['location'] . '.modifier') ?: 1);
        $price = $price * (config('pricing.tier.' . $data['tier'] . '.modifier') ?: 1);
        $price = $price * (config('pricing.type.' . $data['license_type'] . '.modifier') ?: 1);
        $price = $price * (config('pricing.length.' . $data['license_length'] . '.modifier') ?: 1);

        $modifier = 1;
        $platforms = explode(',', $data['license_platform']);

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

    public function calculateLicenseEndTime()
    {
        return config('pricing.length.'. $this->length .'.end_date');
    }
}
