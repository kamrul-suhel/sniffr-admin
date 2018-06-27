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

}
