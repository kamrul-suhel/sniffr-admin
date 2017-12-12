<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Admin {

    public function handle($request, Closure $next)
    {

        if ( Auth::check() && Auth::user()->canAccessAdmin() )
        {
            return $next($request);
        }

        return redirect()->home()->with(array('note' => 'Sorry but you do not have permission to access this page!', 'note_type' => 'error') );

    }

}
