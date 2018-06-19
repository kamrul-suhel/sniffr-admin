<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
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
    use Notifiable;

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

	public function owner()
    {
        return $this->belongsTo(User::class, 'account_owner_id', 'id');
    }

    public function routeNotificationForSlack()
    {
        return 'https://hooks.slack.com/services/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';
    }
}
