<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model {
	protected $guarded = array();

	public static $rules = array();

	protected $table = 'pages';

	protected $fillable = array('user_id', 'title', 'slug', 'image', 'body', 'active', 'created_at');
}
