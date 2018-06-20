<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\ClientMailerOpen;
use App\User;
use Illuminate\Http\Request;

class MailerController extends Controller
{

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http|\Illuminate\View\View
     */

    public function store (Request $request, $mailer_id, $client_id)
    {
        if($mailer_id&&$client_id) {
            $user = User::find($client_id);
            $open = new ClientMailerOpen();
            $open->client_mailer_id = $mailer_id;
            $open->user_id = $client_id;
            $open->user_client_id = ($user->client_id ? $user->client_id : 0);
            $open->ip = $request->ip();
            $open->user_agent = $request->header('User-Agent');
            $open->save();
        }

        header('Content-Type: image/png');
        return base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=');
    }

}
