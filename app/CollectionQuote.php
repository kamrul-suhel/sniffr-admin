<?php

namespace App;

use App\Jobs\QueueEmailPendingQuote;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CollectionQuote extends Model
{
    use SoftDeletes;

    protected $table = 'collection_quotes';

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
        return $this->hasOne(CollectionVideo::class);
    }

    public function collectionStory()
    {
        return $this->hasOne(CollectionStory::class);
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
