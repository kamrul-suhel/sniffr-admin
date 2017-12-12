<?php

namespace App\Libraries;

trait TimeHelper{

	public static function convert_seconds_to_HMS($seconds){
		if($seconds != 0){
			$hours = floor($seconds / 3600);
			$minutes = floor(($seconds / 60) % 60);
			$seconds = $seconds % 60;

			if($hours != 0){
				return $hours.':'.$minutes.':'.sprintf( '%02d', $seconds );
			} else {
				return $minutes.':'.sprintf( '%02d', $seconds );
			}
		}
	}

	public static function ISO8601ToSeconds($ISO8601)
	{
	    preg_match('/(\d{1,2})[H]/', $ISO8601, $hours);
	    preg_match('/(\d{1,2})[M]/', $ISO8601, $minutes);
	    preg_match('/(\d{1,2})[S]/', $ISO8601, $seconds);
	    
	    $hours   = isset($hours[1]) ? $hours[1] : 0;
	    $minutes = isset($minutes[1]) ? $minutes[1] : 0;
	    $seconds = isset($seconds[1]) ? $seconds[1] : 0;

	    $toltalSeconds = ($hours * 60 * 60) + ($minutes * 60) + $seconds;

	    return $toltalSeconds;
	}

}