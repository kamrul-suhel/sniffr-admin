<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @mixin \Eloquent
 */
class Theme extends Model {
	protected $guarded = [];
	public static $rules = [];
	public $timestamps = false;
	protected $fillable = ['name', 'description', 'version', 'slug', 'active'];
}