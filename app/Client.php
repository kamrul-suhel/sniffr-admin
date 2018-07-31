<?php

namespace App;

use App\Jobs\Auth\QueueEmailCompany;
use App\Traits\Slug;
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
    use Notifiable, SoftDeletes, Slug;

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

    public function updateClient($data)
    {
        $this->slug = isset($data['company_name']) ? $this->slugify($data['company_name']) : $this->slug;
        $this->name = isset($data['company_name']) ? $data['company_name'] : $this->name;
        $this->address_line1 = isset($data['address_line1']) ? $data['address_line1'] : $this->address_line1;
        $this->address_line2 = isset($data['address_line2']) ? $data['address_line2'] : $this->address_line2;
        $this->city = isset($data['city']) ? $data['city'] : $this->city;
        $this->region = isset($data['region']) ? $data['region'] : $this->region;
        $this->tier =  isset($data['tier']) ? $data['tier'] : $this->tier;
        $this->postcode = isset($data['postcode']) ? $data['postcode'] : $this->postcode;
        $this->country = isset($data['country']) ? $data['country'] : $this->country;
        $this->vat_number = isset($data['vat_number']) ? $data['vat_number'] : $this->vat_number;
        $this->billing_tel = isset($data['billing_tel']) ? $data['billing_tel'] : $this->billing_tel;
        $this->billing_email = isset($data['billing_email']) ? $data['billing_email'] : $this->billing_email;
        $this->billing_name = isset($data['billing_name']) ? $data['billing_name'] : $this->billing_name;

        if ($this->account_owner_id != $data['account_owner_id']) {
            $currentOwner = $this->account_owner_id;
            $this->account_owner_id = $data['account_owner_id'];
        }

        if(request()->segment(1) === 'admin') {
            if(isset($data['active'])) {
                $this->active = 0;
                if($data['active'] || $data['active'] == 'on') {
                    $this->active = 1;
                }
            }
        }

        $this->update();

        return $this;

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
