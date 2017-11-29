<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;
// use Conner\Tagging\Taggable;

class Campaign extends Model
{
    // use SoftDeletes;
    // use Taggable;

    protected $guarded = array();

  	public static $rules = array();

    protected $table = 'campaigns';

  	//protected $fillable = array('user_id', 'title', 'slug', 'image', 'body', 'active', 'created_at');

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
