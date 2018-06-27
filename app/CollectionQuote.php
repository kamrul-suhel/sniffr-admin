<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CollectionQuote extends Model
{
    protected $table = 'collection_quotes';

    /**
     * Must me admin user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class); //
    }

    public function video()
    {
        return $this->hasOne(Video::class);
    }

    public function story()
    {
        return $this->hasOne(Story::class);
    }

	public function routeNotificationForSlack()
	{
		return 'https://hooks.slack.com/services/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';
	}
}
