<?php

namespace App\Jobs;

use App\CollectionQuote;
use App\CollectionVideo;
use App\CollectionStory;
use App\Mail\Quotes\OfferQuote;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class QueueEmailOfferedQuote implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $username, $email, $quote, $collection_id, $quote_id;

	public $tries = 5;
	public $timeout = 120;

    /**
     * QueueEmailOfferedQuote constructor.
     * @param string $username
     * @param string $email
     * @param CollectionQuote $collection
     */
    public function __construct(CollectionQuote $collectionQuote, $type)
    {
		$quoteUser = $collectionQuote->{'collection'.$type}->collection->user;

		$this->username = $quoteUser->username;
    	$this->email = $quoteUser->email;
    	$this->quote = $collectionQuote->price;
    	$this->collection_id = $collectionQuote->{'collection'.$type}->collection->id;
        $this->quote_id = $collectionQuote->id;

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
			'quote' => $this->quote,
			'collection_id' => $this->collection_id,
			'quote_id' => $this->quote_id
		]));
    }
}
