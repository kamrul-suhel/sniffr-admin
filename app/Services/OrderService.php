<?php

namespace App\Services;

use App\Download;
use App\Order;

class OrderService
{
	/**
	 * @param $story_id
	 */
	public function logDownload($story_id, $mailer_id, $type)
	{
		$download = new Download();
		$download->story_id = ($type=='story' ? $story_id : 0);
		$download->video_id = ($type=='video' ? $story_id : 0);
		$download->mailer_id = $mailer_id;
		$download->user_id = \Auth::user()->id;
		$download->client_id = \Auth::user()->client_id ?: 0;
		$download->save();
	}
}