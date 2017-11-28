<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model {
	protected $guarded = array();


	public static $rules = array();

	protected $table = 'posts';

	protected $fillable = array('post_category_id', 'user_id', 'title', 'slug', 'image', 'body', 'body_guest', 'access', 'active', 'created_at');

	public function category(){
		//return $this->belongsTo(PostCategory::class, 'post_category_id');
        return $this->belongsTo(PostCategory::class);
	}
}