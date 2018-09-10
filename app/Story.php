<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use App\Jobs\Quotes\QueueEmailRetractQuote;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cookie;
use OwenIt\Auditing\Auditable;

class Story extends Model implements \OwenIt\Auditing\Contracts\Auditable
{
    use SoftDeletes, Notifiable, Auditable;

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
	public function user()
	{
		return $this->belongsTo(User::class);
	}

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

	//**********************
	// Search Functions   **
	//**********************

	/**
	 * @param $model
	 * @param $data
	 * @return mixed
	 */
	public function searchState($model, $data)
	{
		if ($data) {
			//explode key=>value
			$decision = explode('--', $data);
			$model->decision = $decision[0];
			$model->chosenState = $decision[1];

			if ($decision[1] !== 'all') {
				return $model->where('state', $decision[1]);
			}
		}

		$model->decision = 'content-sourced';
		$model->chosenState = 'unapproved';

		return $model->where('state', 'unapproved');
	}

	/**
	 * @param $model
	 * @param $data
	 * @return mixed
	 */
	public function searchAssignee($model, $data)
	{
		if ($data) {
			$this->assignee = $data;
			return $model->where('user_id', $data);
		}

		return $model;
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
					->orWhere('author', 'LIKE', '%' . $data . '%')
					->orWhere('alpha_id', $data)
					->orWhereHas('contact', function ($q) use ($data) {
						$q->where('full_name', 'LIKE', '%' . $data . '%');
					});
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
		return $data->orderBy('updated_at', 'DESC')->paginate(24);
	}

	/**
	 * @param $result
	 * @param $state
	 * @param $data
	 * @return array
	 */
	public function generateData($result, $state, $data)
	{
		Cookie::queue('sniffr_admin_decision', $this->decision);
		Cookie::queue('sniffr_admin_state', $this->chosenState);
		Cookie::queue('sniffr_admin_assigned', $this->assignee);

		return [
			'stories' => $result,
			'state' => $state ?? 'unapproved',
			'chosenState' => $this->chosenState,
			'decision' => $this->decision,
			'assignee' => $this->assignee,
			'users' => auth()->user()->where([['client_id', NULL]])->get(),
			'user' => auth()->user()
		];
	}
}
