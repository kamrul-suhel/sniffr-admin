<?php

namespace App\Jobs;

use App\Collection;
use App\CollectionVideo;
use App\Mail\Quotes\OfferQuote;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class QueueEmailOfferedQuote implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $username, $email, $collectionVideo;

	public $tries = 5;
	public $timeout = 120;

    /**
     * QueueEmailOfferedQuote constructor.
     * @param string $username
     * @param string $email
     * @param CollectionVideo $collection
     */
    public function __construct(string $username, string $email, CollectionVideo $collection)
    {
    	$this->username = $username;
    	$this->email = $email;
        $this->collectionVideo = $collection;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
		\Mail::to($this->email)->send(new OfferQuote([
			'username' => $this->username,
			'collectionVideo' => $this->collectionVideo
		]));
    }
}
