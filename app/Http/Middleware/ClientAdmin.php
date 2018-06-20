<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class ClientAdmin {

    public function handle($request, Closure $next)
    {
        if ( Auth::check() && Auth::user()->role == 'client') {
            return redirect('/client/profile/'.auth()->user()->client->slug.'/users/'.auth()->user()->id.'/edit');
        }

        if ( Auth::check() && Auth::user()->canAccessClientAdmin() )
        {
            return $next($request);
        }

        return redirect()->home()->with([
            'note' => 'Sorry but you do not have permission to access this page',
            'note_type' => 'error'
        ]);
    }
}
