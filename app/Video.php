<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @property Comment[] $cached_comments
 * @property Campaign[] $cached_campaigns
 * @property Download[] $cached_downloads
 * @property-read \App\Tag|null $tags
 * @property-read \App\Contact|null $contact
 * @property-read \App\Comment|null $comments
 * @property-read \App\Campaign|null $campaigns
 * @property-read \App\Download|null $downloads
 * @property string alpha_id
 * @property int contact_id
 * @property string title
 * @property string state
 * @property string rights
 * @property string source
 * @property string ip
 * @property string user_agent
 * @property string url
 * @property string file
 * @property null|string mime
 * @property string youtube_id
 * @property string image
 * @property string thumb
 * @property string embed_code
 * @property int vertical
 * @property string description
 * @property int video_category_id
 * @property int video_collection_id
 * @property int video_shottype_id
 * @property int user_id
 * @property int featured
 * @property int active
 * @property mixed details
 * @property mixed date_filmed
 * @property int is_exclusive
 * @mixin \Eloquent
 */
class Video extends Model
{
    use SoftDeletes, Notifiable;

    const CACHE_EXPIRATION = 720;
    protected $guarded = [];
    protected $table = 'videos';
    protected $hidden = ["deleted_at"];
    protected $fillable = [
        'user_id',
        'video_category_id',
        'video_collection_id',
        'video_shottype_id',
        'title',
        'rights',
        'access',
        'details',
        'description',
        'date_filmed',
        'vertical',
        'notes',
        'referrer',
        'credit',
        'active',
        'featured',
        'duration',
        'image',
        'embed_code',
        'url',
        'created_at',
        'source'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tags()
    {
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

    public function assets()
    {
        return $this->belongsToMany(Asset::class);
    }

    public function routeNotificationForSlack()
    {
        return 'https://hooks.slack.com/services/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';
    }

    /**
     * @param int $page
     * @return string
     */
    public function cacheKey(int $page = 0)
    {
        return sprintf(
            "%s-%s",
            $this->getTable(),
            $page
        );
    }

    /**
     * @param int $videos_per_page
     * @param $page
     * @return mixed
     */
    public function getCachedVideosLicensedPaginated(int $videos_per_page, $page)
    {
        if (config('settings.cache.cache_enabled')) {
            return Cache::tags('licensed.paginated')->remember($this->cacheKey($page) . ':licensed', self::CACHE_EXPIRATION, function () use ($videos_per_page, $page) {
                return $this->where('state', 'licensed')->orderBy('id', 'DESC')->paginate($videos_per_page);
            });
        }

        return $this->where('state', 'licensed')->orderBy('id', 'DESC')->paginate($videos_per_page);
    }

    /**
     * @return Comment[]
     */
    public function getCachedComments()
    {
        return Cache::remember($this->cacheKey() . ':comments', self::CACHE_EXPIRATION, function () {
            return $this->comments->toArray();
        });
    }

    /**
     * @return Campaign[]
     */
    public function getCachedCampaigns()
    {
        return Cache::remember($this->cacheKey() . ':campaigns', self::CACHE_EXPIRATION, function () {
            return $this->campaigns->toArray();
        });
    }

    /**
     * @return Download[]
     */
    public function getCachedDownloads()
    {
        return Cache::remember($this->cacheKey() . ':downloads', self::CACHE_EXPIRATION, function () {
            return $this->downloads->toArray();
        });
    }

    /**
     * @return Contact[]
     */
    public function getCachedContact()
    {
        return Cache::remember($this->cacheKey() . ':contact', self::CACHE_EXPIRATION, function () {
            return $this->contact->toArray();
        });
    }

    /**
     * @return Tag[]
     */
    public function getCachedTags()
    {
        return Cache::remember($this->cacheKey() . ':tags', self::CACHE_EXPIRATION, function () {
            return $this->tags->toArray();
        });
    }

    /**
     * @param Client $client
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function clientVideos(Client $client)
    {
        return Video::whereHas('campaigns', function ($q) use ($client) {
            $q->where('id', $client->id);
        })->orderBy('licensed_at', 'desc')->paginate(12);
    }
}
