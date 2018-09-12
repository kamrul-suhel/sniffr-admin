<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use App\Jobs\Quotes\QueueEmailRetractQuote;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Cookie;
use OwenIt\Auditing\Auditable;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @property Comment[] $cached_comments
 * @property Download[] $cached_downloads
 * @property-read \App\Tag|null $tags
 * @property-read \App\Contact|null $contact
 * @property-read \App\Comment|null $comments
 * @property-read \App\Download|null $downloads
 * @property string $alpha_id
 * @property int $contact_id
 * @property int $contract_id
 * @property string $title
 * @property string $state
 * @property string $rights
 * @property string $source
 * @property string $ip
 * @property string $user_agent
 * @property string $url
 * @property string $file
 * @property null|string $mime
 * @property string $youtube_id
 * @property string $image
 * @property string $thumb
 * @property string $embed_code
 * @property int $vertical
 * @property string $description
 * @property int $video_category_id
 * @property int $video_collection_id
 * @property int $video_shottype_id
 * @property int $user_id
 * @property int $featured
 * @property int $active
 * @property string $details
 * @property string $location
 * @property string date_filmed
 * @property int $is_exclusive
 * @property int $creator_id
 * @mixin \Eloquent
 */
class Video extends Model implements \OwenIt\Auditing\Contracts\Auditable
{
    use SoftDeletes, Notifiable, Auditable;

	const CACHE_EXPIRATION = 720;
	protected $guarded = ['deleted_at'];
	protected $table = 'videos';
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
		'terms',
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
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function user()
	{
		return $this->belongsTo(User::class);
	}

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
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function collectionVideo()
	{
		return $this->belongsTo(CollectionVideo::class);
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
    public function contracts()
    {
        return $this->hasMany(Contract::class);
    }

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\hasOne
	 */
    public function currentContract()
    {
        return $this->hasOne('\App\Contract')->latest();
    }

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\hasOne
	 */
	public function hasContract()
	{
		return $this->hasOne('\App\Contract')->latest()->count() ? true : false;
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
	 */
	public function stories()
	{
		return $this->belongsToMany(Story::class);
	}


    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function downloads()
    {
        return $this->hasMany(Download::class);
    }

    /**
	 * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
	 */
	public function mailers()
	{
		return $this->belongsToMany(ClientMailer::class);
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function createdUser()
	{
		return $this->belongsTo(User::class, 'user_id');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function socialLinks()
	{
		return $this->hasMany(VideoSocialLink::class);
	}

	/**
	 * @return string
	 */
	public function routeNotificationForSlack()
	{
		return 'https://hooks.slack.com/services/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';
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function videoCollections()
	{
		return $this->hasMany(CollectionVideo::class);
	}

	/**
	 * @param int $page
	 * @return string
	 * @codeCoverageIgnore
	 */
	public function cacheKey(int $page = 0)
	{
		return sprintf(
			"%s-%s",
			$this->getTable(),
			$page
		);
	}

	//Functions
	public function deleteVideo()
	{
		$offeredAndPendingVideos = CollectionVideo::where('video_id', $this->id)
			->where('status', 'requested')
			->orWhere('status', 'offered');

		if ($offeredAndPendingVideos->count() > 0) {
			foreach ($offeredAndPendingVideos->get() as $emailForDeletion) {
				QueueEmailRetractQuote::dispatch(
					$emailForDeletion,
					'video'
				);
			}
			$offeredAndPendingVideos->update(['reason' => 'asset was deleted by admin: ' . auth()->user()->id]);
		}

		return $this->delete();
	}

    /**
     * @param int $videos_per_page
     * @param $page
     * @return mixed
     * TODO: Not being used
     * @codeCoverageIgnore
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
     * @codeCoverageIgnore
     */
    public function getCachedComments()
    {
        return Cache::remember($this->cacheKey() . ':comments', self::CACHE_EXPIRATION, function () {
            return $this->comments->toArray();
        });
    }

    /**
     * @return Download[]
     * @codeCoverageIgnore
     */
    public function getCachedDownloads()
    {
        return Cache::remember($this->cacheKey() . ':downloads', self::CACHE_EXPIRATION, function () {
            return $this->downloads->toArray();
        });
    }

    /**
     * @return Contact[]
     * @codeCoverageIgnore
     */
    public function getCachedContact()
    {
        return Cache::remember($this->cacheKey() . ':contact', self::CACHE_EXPIRATION, function () {
            return $this->contact->toArray();
        });
    }

    /**
     * @return Tag[]
     * @codeCoverageIgnore
     */
    public function getCachedTags()
    {
        return Cache::remember($this->cacheKey() . ':tags', self::CACHE_EXPIRATION, function () {
            return $this->tags->toArray();
        });
    }


	//**********************
	// Search Functions   **
	//**********************

	/**
	 * @param $model
	 * @param $data
	 * @return mixed
	 */
	public function searchCategory($model, $data)
	{
		if ($data) {
			return $model->where('video_category_id', $data);
		}

		return $model;
	}

	/**
	 * @param $model
	 * @param $data
	 * @return mixed
	 */
	public function searchCollection($model, $data)
	{
		if ($data) {
			return $model->where('video_collection_id', $data);
		}

		return $model;
	}

	/**
	 * @param $model
	 * @param $data
	 * @return mixed
	 */
	public function searchShottype($model, $data)
	{
		if ($data) {
			return $model->where('video_shottype_id', $data);
		}

		return $model;
	}

	/**
	 * @param $model
	 * @param $data
	 * @return mixed
	 */
	public function searchRights($model, $data)
	{
		if ($data) {
			return $model->where('rights', $data);
		}

		return $model;
	}

	/**
	 * @param $model
	 * @param $data
	 * @return mixed
	 */
	public function searchState($model, $data)
	{
		$data = $data ? $data : "all";

		//override all for deleted videos
		if ($data == 'deleted') {
			return $model->onlyTrashed()->orderBy('updated_at', 'desc');
		}

		if ($data == 'all') {
			return $model;
		}

		session(['state' => $data]);
		return $model->where('state', $data);
	}

	/**
	 * @param $model
	 * @param $data
	 * @return mixed
	 */
	public function searchTerm($model, $data)
	{
		if ($data) {
			return $model->where(function ($query) use ($data) {
				$query->where('title', 'LIKE', '%' . $data . '%')
					->orWhereHas('tags', function ($q) use ($data) {
						$q->where('name', 'LIKE', '%' . $data . '%');
					})
					->orWhereHas('contact', function ($q) use ($data) {
						$q->where('email', 'LIKE', '%' . $data . '%');
					})
					->orWhere('alpha_id', $data);
			});
		}

		return $model;
	}

	/**
	 * @param $data
	 * @return mixed
	 */
	public function paginateResults($data)
	{
		return $data->orderByRaw('CASE WHEN licensed_at IS NULL THEN created_at ELSE licensed_at END DESC')->paginate(24);
	}

	/**
	 * @param $result
	 * @param $state
	 * @return array
	 */
	public function generateData($result, $state, $data = null)
	{
		return [
			'state' => $state ? $state : "all",
			'videos' => $result,
			'user' => auth()->user(),
			'video_categories' => VideoCategory::all(),
			'video_collections' => VideoCollection::all(),
			'video_shottypes' => VideoShotType::all(),
		];
	}

}
