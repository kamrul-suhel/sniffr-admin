<?php

namespace App;

use App\Jobs\Auth\QueueEmailCompany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

/**
 * App\Client
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $deleted_at
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property int account_owner_id
 * @method static Builder|Client whereCreatedAt($value)
 * @method static Builder|Client whereDeletedAt($value)
 * @method static Builder|Client whereId($value)
 * @method static Builder|Client whereName($value)
 * @method static Builder|Client whereSlug($value)
 * @method static Builder|Client whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Client extends Model
{
    use Notifiable, SoftDeletes;

    protected $guarded = [];
    public static $rules = [];
    protected $table = 'clients';

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\hasMany
	 */
    public function users()
	{
		return $this->hasMany(User::class);
	}

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
	public function owner()
    {
        return $this->belongsTo(User::class, 'account_owner_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function billingUser()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function collections()
    {
        return $this->hasMany(Collection::class);
    }

    /**
     * @param $params
     * @return \Illuminate\Foundation\Bus\PendingDispatch
     */
    public function emailNewCompanyUser($params)
    {
        return QueueEmailCompany::dispatch(
            $params['company_id'],
            $params['user_email'],
            $params['user_full_name'],
            $params['user_full_name'],
            $params['token']
        );
    }

    public function routeNotificationForSlack()
    {
        return 'https://hooks.slack.com/services/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';
    }
}
