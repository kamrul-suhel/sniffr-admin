<?php
# test
namespace App;

use App\Libraries\ImageHandler;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\HasApiTokens;
use OwenIt\Auditing\Auditable;

/**
 * @property int $id
 * @property int $client_id
 * @property Client $client
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property mixed role
 * @property int active
 * @property string password
 * @property string email
 * @property string username
 * @property string first_name
 * @property string last_name
 * @property string full_name
 * @property string tel
 * @property string job_title
 * @property string avatar
 * @mixin \Eloquent
 */
class User extends Authenticatable implements \OwenIt\Auditing\Contracts\Auditable
{
    use HasApiTokens, Notifiable, SoftDeletes, Auditable;

    public $webhook;

    protected $table = 'users';

    /**
     * @var array
     */
    protected $fillable = [
        'client_id', 'username', 'email', 'full_name', 'password', 'avatar', 'role', 'active',
    ];

    /**
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * @return bool
     */
    public function canAccessAdmin()
    {
        return ($this->role == 'admin' || $this->role == 'manager' || $this->role == 'editorial');
    }

    /**
     * @return bool
     */
    public function canAccessClient()
    {
        return ($this->role == 'client_admin' || $this->role == 'client' || $this->role == 'admin' || $this->role == 'client_owner');
    }

    /**
     * @return bool
     */
    public function canAccessClientAdmin()
    {
        return ($this->role == 'client_admin' || $this->role == 'client_owner');
    }

    /**
     * @return bool
     */
    public function isAdmin()
    {
        return $this->role == 'admin';
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function collections()
    {
        return $this->hasMany(Collection::class);
    }

	/**
	 * @return void
	 */
    public function deleteUsersCollections()
    {
        $collections = Collection::where('user_id', $this->id);
        $collectionVideos = CollectionVideo::whereIn('collection_id', $collections->pluck('id'))->delete();
        $collectionStories = CollectionStory::whereIn('collection_id', $collections->pluck('id'))->delete();
        $collections->delete();
    }

	/**
	 * @return mixed
	 */
    public function userOffers()
    {
        $offeredVideos = Collection::with('collectionVideos.video');
        $videoCount = $offeredVideos
            ->where('user_id', $this->id)
            ->where('client_id', $this->client_id)
            ->where('status', 'open')
            ->orderBy('created_at', 'DESC')
            ->whereHas('collectionVideos', function($query) {
                $query->where('status', 'offered');
                $query->orWhere('status', 'requested');
            })->count();

        $offeredStories = Collection::with('collectionStories.video');
        $storyCount = $offeredStories
            ->where('user_id', $this->id)
            ->where('client_id', $this->client_id)
            ->where('status', 'open')
            ->orderBy('created_at', 'DESC')
            ->whereHas('collectionStories', function($query) {
                $query->where('status', 'offered');
                $query->orWhere('status', 'requested');
            })->count();

        return $videoCount + $storyCount;
    }

    /**
     * @param $data
     * @return mixed
     */
    public function createUser($data, $existingUser = null)
    {
        $existingUser = $existingUser ? $existingUser : auth()->user();
        $user = new $this;
        $user->email = $data['email'];

        $password = str_random(10);
        if (isset($data['password'])) {
            $password = $data['password'];
        }
        $user->password = $password;

        $role = ($existingUser->role == 'client') ? 'client' : $data['role'];
        $user->role = $role;

        if(request()->segment(2) === 'client') {
            $client_id = $existingUser->client_id;
            $user->active = 1;
        } else {
            $client_id = ($existingUser->role == 'client')
                ? $existingUser->client_id
                : $data['client_id'];
            $user->active = isset($data['active']) ? $data['active'] : $user->active ?? 0;
        }
        $user->client_id = $client_id;
        $user->full_name = $data['full_name'];
        $user->username = str_replace(' ', '_', $data['full_name']).str_random(10);
        $user->tel = $data['tel'];
        $user->job_title = $data['job_title'];
        $user->avatar = 'default.jpg';

        if (isset($data['avatar'])) {
            $user->avatar = ImageHandler::uploadImage($data['avatar'], 'avatars');
        }

        $user->save();

        return $user;
    }

    public function updateUser($data)
    {
        $this->username = $data['username'] ?? $this->username;
        $this->email = $data['email'] ?? $this->email;
        $this->full_name = $data['full_name'] ?? $this->first_name;
        $this->tel = $data['tel'] ?? $this->tel;
        $this->job_title = $data['job_title'] ?? $this->job_title;

        if (isset($data['password'])) {
            $this->password = Hash::make($data['password']);
        }

        $this->role = $data['role'] ?? $this->role;
        $this->active = $data['active'] ?? $this->active;

        if ($this->client_id) {
            $this->client_id = $data['client_id'] ?? $this->client_id;
        }

        if (isset($data['avatar'])) {
            $this->avatar = ImageHandler::uploadImage($data['avatar'], 'avatars');
        }

        $this->update();
        $this->save();

        return $this;
    }

    public function activeLicences()
    {
        $collections = $this->collections()
            ->with('collectionVideos')
            ->with('collectionStories')
            ->whereHas('collectionVideos', function($query) {
                $query->where('user_id', $this->id);
                $query->where('status', 'purchased');
                $query->whereNotNull('licensed_at');
                $query->whereNotNull('license_ends_at');
            })
            ->orWhereHas('collectionStories', function($query) {
                $query->where('user_id', $this->id);
                $query->where('status', 'purchased');
                $query->whereNotNull('licensed_at');
                $query->whereNotNull('license_ends_at');
            })
            ->count();

        return $collections;
    }

    /**
     * @return \Illuminate\Config\Repository|mixed
     */
    public function routeNotificationForSlack()
    {
    	if($this->webhook){
			return config('services.slack.channels.'.$this->webhook);
		}
    }

    /**
     * @param $channel
     * @return $this
     */
    public function slackChannel($channel){
    	$this->webhook = $channel;
    	return $this;
	}

}
