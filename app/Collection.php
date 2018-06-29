<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $table = 'collections';

    protected $fillable = ['name', 'user_id', 'client_id', 'status'];

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

    //Functions
    public function addVideoToCollection(Video $video, User $user)
    {
        $data = [
            'collection_id' => $this->id,
            'video_id' => $video->id,
            'type' => null,
            'platform' => null,
            'length' => null,
            'class' => $video->class,
            'final_price' => config('pricing.base'),
            'company_location' => $user->client->region,
            'company_tier' => $user->client->tier,
            'status' => 'received'
        ];

        return CollectionVideo::create($data);
    }
}
