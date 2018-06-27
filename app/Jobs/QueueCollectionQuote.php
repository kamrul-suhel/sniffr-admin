<?php

namespace App\Jobs;

use App\Collection;
use App\Mail\Quotes\CollectionQuote;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class QueueCollectionQuote implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

	protected $video;
	protected $account_owner_email;

	public $tries = 5;
	public $timeout = 120;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(string $username, string $email, Collection $collection)
    {
    	$this->username = $username;
    	$this->email = $email;
        $this->collection = $collection;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
		\Mail::to($this->email)->send(new CollectionQuote([
			'username' => $this->username,
			'collection' => $this->collection
		]));
    }
}
