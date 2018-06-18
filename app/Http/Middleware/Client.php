<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Client {

    public function handle($request, Closure $next)
    {
        if ( Auth::check() && Auth::user()->canAccessClient() )
        {
            return $next($request);
        }

        return redirect()->home()->with([
            'note' => 'Sorry but you do not have permission to access this page',
            'note_type' => 'error'
        ]);
    }
}
