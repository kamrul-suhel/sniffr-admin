<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Video extends Model {
    use SoftDeletes, Notifiable;

    protected $table = 'videos';
	protected $guarded = [];
    protected $hidden = ["deleted_at"];
	protected $fillable = array('user_id', 'video_category_id', 'video_collection_id', 'video_shottype_id', 'title', 'rights', 'access', 'details', 'description', 'date_filmed', 'vertical', 'notes', 'referrer', 'credit', 'active', 'featured', 'duration', 'image', 'embed_code', 'url', 'created_at', 'source');

	public function tags(){
		return $this->belongsToMany(Tag::class);
	}

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function downloads()
    {
        return $this->hasMany(Download::class);
    }

    public function campaigns()
    {
        return $this->belongsToMany(Campaign::class)->withTimestamps()->withPivot('state', 'created_at');
    }

    public function routeNotificationForSlack()
    {
        return 'https://hooks.slack.com/services/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';
    }
}
