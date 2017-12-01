<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use SoftDeletes;

  	public static $rules = array();

    protected $table = 'contacts';

    protected $fillable = [
        'first_name', 'last_name', 'email', 'tel', 'language', 'location', 'comments', 'facebook', 'youtube', 'instagram', 'twitter', 'other', 'terms'
    ];

    public function videos()
    {
        return $this->hasMany(Video::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
