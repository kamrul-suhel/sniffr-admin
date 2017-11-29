<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Video extends Model {
	protected $guarded = array();


	public static $rules = array();

	protected $fillable = array('user_id', 'video_category_id', 'title', 'type', 'access', 'details', 'description', 'active', 'featured', 'duration', 'image', 'embed_code', 'url', 'created_at');

	public function tags(){
		return $this->belongsToMany(Tag::class);
	}

    public function getKey()
    {
        parse_str( parse_url( $this->url, PHP_URL_QUERY ), $array );

        $key = isset($array['v']) ? $array['v'] : false;

        return $key;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}