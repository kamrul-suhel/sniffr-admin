<?php

namespace App;

use App\Jobs\Quotes\QueueEmailPendingQuote;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CollectionQuote extends Model
{
    use SoftDeletes;

    protected $table = 'collection_quotes';

    protected $fillable = ['rejection_notes', 'price', 'user_id', 'collection_video_id', 'collection_story_id'];

    /**
     * Must me admin user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function collectionVideo()
    {
        return $this->hasOne(CollectionVideo::class, 'id', 'collection_video_id');
    }

    public function collectionStory()
    {
        return $this->hasOne(CollectionStory::class, 'id', 'collection_story_id');
    }

	public function emailPendingQuote($params)
	{
		return QueueEmailPendingQuote::dispatch(
			$params['username'],
			$params['user'],
			$params['collection']
		);
	}
}
