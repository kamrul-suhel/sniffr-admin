<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    // use SoftDeletes;

    protected $guarded = [];

  	public static $rules = array();

    protected $table = 'clients';

  	//protected $fillable = array('user_id', 'title', 'slug', 'image', 'body', 'active', 'created_at');

    public function campaigns()
    {
        return $this->hasMany(Campaign::class);
    }
}
