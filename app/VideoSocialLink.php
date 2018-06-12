<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VideoSocialLink extends Model
{
    protected $table = 'video_social_links';

    protected $fillable = ['video_id', 'platform', 'link'];

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
    public function videoStats()
    {
        return $this->hasMany(VideoStats::class);
    }

    public function latestVideoStats()
    {
        return VideoStats::where('video_social_link_id', $this->id)->orderBy('id', 'DESC')->first();
    }

}
