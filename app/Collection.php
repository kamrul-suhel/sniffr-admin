<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Collection extends Model
{
    use SoftDeletes;

    protected $table = 'collections';

    protected $fillable = ['name', 'user_id', 'client_id', 'status', 'discount'];


	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
    public function collectionVideos()
    {
        return $this->hasMany(CollectionVideo::class);
    }

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
    public function collectionStories()
    {
        return $this->hasMany(CollectionStory::class);
    }

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

	/**
	 * @param array $data
	 * @return Collection
	 */
    public function createCollection(array $data): Collection
	{
		return $this->create($data);
	}

	/**
	 * @param array $data
	 * @return bool
	 */
	public function updateCollection(array $data)
	{
		$this->update($data);
		return $this->save();
	}

    //Functions

	/**
	 * @param Video $video
	 * @param User|null $user
	 * @return mixed
	 */
    public function addVideoToCollection(Video $video, User $user = null)
    {
        $data = [
            'collection_id' => $this->id,
            'video_id' => $video->id,
            'class' => $video->class,
            'final_price' => config('pricing.base'),
            'company_location' => $user->client->region ?? null,
            'company_tier' => $user->client->tier ?? null,
            'status' => 'received'
        ];

        return CollectionVideo::create($data);
    }

	/**
	 * @param Story $story
	 * @param User|null $user
	 * @return mixed
	 */
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

	/**
	 * @param string $status
	 * @return mixed
	 */
	public static function getQuotesByStatus($status = 'requested')
    {
        return Collection::whereHas('collectionVideos', function($query) use ($status) {
            $query->where('status', $status);
        })->orWhereHas('collectionStories', function($query) use ($status) {
            $query->where('status', $status);
        })->with('collectionVideos')->with('collectionStories');

    }
}
