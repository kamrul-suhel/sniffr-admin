<?php

namespace App\Jobs\Quotes;

use App\Mail\Quotes\RetractOffer;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class QueueEmailRetractQuote implements ShouldQueue
{
	use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

	protected $collectionAsset, $collection, $type, $email;

	public $tries = 5;
	public $timeout = 120;

	/**
	 * QueueEmailRetractQuote constructor.
	 * @param $collectionAsset
	 * @param $type
	 */
	public function __construct($collectionAsset, $type)
	{
		$this->collectionAsset = $collectionAsset;
		$this->collection = $collectionAsset->collection;
		$this->type = $type;
		$this->email = $collectionAsset->collection->user->email;
	}

	/**
	 * Execute the job.
	 *
	 * @return void
	 */
	public function handle()
	{
		\Mail::to($this->email)->send(new RetractOffer([
			'collectionAsset' => $this->collectionAsset,
			'collection' => $this->collection,
			'type' => $this->type,
		]));
	}
}
