<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Collection extends Model
{
    use SoftDeletes;

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
    public function addVideoToCollection(Video $video, User $user = null)
    {
        $data = [
            'collection_id' => $this->id,
            'video_id' => $video->id,
            'type' => null,
            'platform' => null,
            'length' => null,
            'class' => $video->class,
            'final_price' => config('pricing.base'),
            'company_location' => $user->client->region ?? null,
            'company_tier' => $user->client->tier ?? null,
            'status' => 'received'
        ];

        return CollectionVideo::create($data);
    }

	public function addStoryToCollection(Story $story, User $user = null)
	{
		$data = [
			'collection_id' => $this->id,
			'story_id' => $story->id,
			'final_price' => config('pricing.base'),
			'company_location' => $user->client->region ?? null,
			'company_tier' => $user->client->tier ?? null,
			'status' => 'received'
		];

		return CollectionStory::create($data);
	}

	public static function getQuotesByStatus($status = 'requested')
    {
        return Collection::whereHas('collectionVideos', function($query) use ($status) {
            $query->where('status', $status);
        })->orWhereHas('collectionStories', function($query) use ($status) {
            $query->where('status', $status);
        })->with('collectionVideos')->with('collectionStories');

    }
}
