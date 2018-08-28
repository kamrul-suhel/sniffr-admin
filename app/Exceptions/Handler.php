<?php

namespace App\Exceptions;

use Airbrake\ErrorHandler;
use Airbrake\Instance;
use Airbrake\Notifier;
use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     * @param Exception $exception
     * @return mixed|void
     * @throws Exception
     */
    public function report(Exception $exception)
    {
    	if(app()->environment() === 'production') {
			if ($this->shouldReport($exception)) {
				$airbrakeNotifier = new Notifier(['projectId' => config('airbrake.projectId'), 'projectKey' => config('airbrake.projectKey')]);
				Instance::set($airbrakeNotifier);
				$handler = new ErrorHandler($airbrakeNotifier);
				$handler->register();
				try {
					$airbrakeNotifier->notify($exception);
				} catch (Exception $e) {
					\Log::error($e->getMessage());
				}
			}
		}

        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function render($request, Exception $exception)
    {
        return parent::render($request, $exception);
    }
}
