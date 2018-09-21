<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserRole extends Model
{
	use SoftDeletes;

	protected $table = 'user_roles';

	public static $videoJobRoles = [
		'cae' => 'content acquisition executive',
		'caa' => 'content acquisition assistant',
		'cam' => 'content acquisition manager',
		'lm' => 'licensing manager',
		'aa' => 'admin assistant',
		'csa' => 'customer service assistant',
		'cse' => 'customer service executive',
		'vvr' => 'viral video researcher',
	];

	public static $storyJobRoles = [
		'hoe' => 'head of editorial',
		'sem' => 'senior editorial manager',
		'sw' => 'senior writer',
		'w' => 'writer',
		'se' => 'senior editor',
		'e' => 'editor',
		'ewr' => 'editorial writer/researcher',
		'er' => 'editorial researcher',
		'ser' => 'senior editorial researcher',
	];
}