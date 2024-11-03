<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api']], function () {
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
    Route::post('/logout',[AuthController::class,'logout']);
    Route::post('/create/post',[PostController::class,'create']);
    Route::put('/update/{slug}',[PostController::class,'update']);
    Route::delete('/delete/{slug}',[PostController::class,'destroy']);
});

Route::post('/register',[AuthController::class,'register']);

Route::get('/blog',[PostController::class,'index']);

Route::get('/blog/{slug}',[PostController::class,'show']);
