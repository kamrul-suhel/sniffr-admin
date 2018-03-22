<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class VideoShotType extends Model {
	protected $guarded = array();

	protected $table = 'video_shot_types';

	public static $rules = array();

	public function videos(){
		return $this->hasMany(Video::class);
	}

	public function hasChildren(){
		if(DB::table('video_shot_types')->where('parent_id', '=', $this->id)->count() >= 1){
			return true;
		} else {
			return false;
		}
	}
}