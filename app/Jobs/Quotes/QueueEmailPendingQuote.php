<?php

namespace App\Jobs\Quotes;

use App\Collection;
use App\Mail\Quotes\PendingQuote;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class QueueEmailPendingQuote implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $username, $email, $collection;

    public $tries = 5;
    public $timeout = 120;

    /**
     * QueueEmailPendingQuote constructor.
     * @param string $username
     * @param string $email
     * @param Collection $collection
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
        \Mail::to($this->email)->send(new PendingQuote([
            'username' => $this->username,
            'collection' => $this->collection
        ]));

    }
}
