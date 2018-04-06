<?php
    namespace App\Traits;

trait FrontendResponser {
    protected function successResponse($data){
        return response()->json($data);
    }

    protected function errorResponse($message){
        return response()->json(['error' => $message]);
    }
}