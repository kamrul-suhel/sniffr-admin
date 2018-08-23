<?php

namespace App;

use App\Jobs\Quotes\QueueEmailRetractQuote;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Story extends Model
{
    use SoftDeletes, Notifiable;

    protected $guarded = ['deleted_at'];
    public static $rules = [];
    protected $table = 'stories';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function videos()
    {
        return $this->belongsToMany(Video::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function storyCollections()
    {
        return $this->hasMany(CollectionStory::class);
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
	public function mailers()
	{
		return $this->belongsToMany(ClientMailer::class);
	}

    /**
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function assets()
    {
        return $this->belongsToMany(Asset::class);
    }

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\hasMany
	 */
    public function orders(){
        return $this->hasMany(Order::class);
    }

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\belongsTo
	 */
    public function user(){
        return $this->belongsTo(User::class);
    }

    //Functions

	public function deleteStory()
	{
		$offeredAndPendingStories = CollectionStory::where('story_id', $this->id)
			->orWhere('status', 'purchased')
			->where('status', 'offered');

		if ($offeredAndPendingStories->count() > 0) {
			foreach ($offeredAndPendingStories->get() as $emailForDeletion) {
				QueueEmailRetractQuote::dispatch(
					$emailForDeletion,
					'story'
				);
			}
			$offeredAndPendingStories->update(['reason' => 'asset was deleted by admin: ' . auth()->user()->id]);
		}

		return $this->delete();
	}

}
