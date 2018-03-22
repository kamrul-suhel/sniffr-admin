<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PluginData extends Model 
{
	protected $table = 'plugin_data';
	protected $guarded = array();
	public static $rules = array();
}