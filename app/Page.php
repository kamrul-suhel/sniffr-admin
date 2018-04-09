<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @mixin \Eloquent
 */
class Page extends Model {
	protected $guarded = [];
	public static $rules = [];
	protected $table = 'pages';
	protected $fillable = ['user_id', 'title', 'slug', 'image', 'body', 'active', 'created_at'];
}
