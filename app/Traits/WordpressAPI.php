<?php

namespace App\Traits;

trait WordpressAPI
{
    public $api_path = 'wp-json/wp/v2/';
	public $token_path = 'wp-json/jwt-auth/v1/token';

    private function getToken()
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, env('UNILAD_WP_URL') . $this->token_path . '?username=' . env('UNILAD_WP_USER') . '&password=' . env('UNILAD_WP_PASS'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);

        $response = json_decode(curl_exec($curl));

        curl_close($curl);

        if (!$response) {
            exit('Unable to connect');
        }

        return $response->token;
    }

	/**
	 * @get Makes curl request
	 * @param string $request
	 * @param bool $req_token
	 * @return JSON Object
	 */
	private function apiRequest($request, $req_token = false){
		if($req_token){
			$token = $this->getToken();
		}

		$curl = curl_init();

		curl_setopt($curl, CURLOPT_URL, env('UNILAD_WP_URL').$this->api_path.$request);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		if($req_token){
			curl_setopt($curl, CURLOPT_HTTPHEADER, array("Authorization: Bearer ".$token));
		}

		$response = json_decode(curl_exec($curl)); //or abort(502);
		$err = curl_error($curl);
		curl_close($curl);

		return $response;
	}

    private function apiPost($post, $parameters, $req_token = false){
		if($req_token){
			$token = $this->getToken();
		}

		$curl = curl_init();

		curl_setopt($curl, CURLOPT_URL, env('UNILAD_WP_URL').$this->api_path.$post);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($curl, CURLOPT_POSTFIELDS, $parameters);
		if($req_token){
			curl_setopt($curl, CURLOPT_HTTPHEADER, array("Authorization: Bearer ".$token));
		}

		$response = json_decode(curl_exec($curl)); //or abort(502);
		$err = curl_error($curl);
		curl_close($curl);

		return $response;
	}

    /**
     * @get URLs from string (string maybe a url)
     * @param string $string
     * @return array
     */
    private function getUrls($string) {
        $regex = '/https?\:\/\/[^\" ]+/i';
        preg_match_all($regex, $string, $matches);
        //return (array_reverse($matches[0]));
        return ($matches[0]);
    }
}
