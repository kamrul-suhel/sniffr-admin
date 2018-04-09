<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @mixin \Eloquent
 */
class PluginData extends Model
{
	protected $table = 'plugin_data';
	protected $guarded = [];
	public static $rules = [];
}