<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Admin
{

    public function handle($request, Closure $next)
    {

        if (Auth::check() && Auth::user()->canAccessAdmin() && Auth::user()->active == 1) {
            $roles = array_slice(func_get_args(), 2);
            if (count($roles)) {
                $hasRole = false;
                foreach ($roles as $role) {
                    if (Auth::user()->role == $role) {
                        $hasRole = true;
                    }
                }
                if ($hasRole == false) {
                    return redirect()->home()->with(array('note' => 'Sorry but you do not have permission to access this page!', 'note_type' => 'error'));
                }
            }
            return $next($request);
        }

        return redirect('login?redirect='.request()->path());

    }

}
