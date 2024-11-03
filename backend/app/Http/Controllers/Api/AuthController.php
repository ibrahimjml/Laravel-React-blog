<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\RegisterRequest;
use Laravel\Passport\PersonalAccessTokenResult;
class AuthController extends Controller
{
    public function register(RegisterRequest $request){
         $userData = $request->validated();
         $userData['email_verified_at'] = now();
         $userData['password'] = bcrypt($request->password);
         $user = User::create($userData);
         return response()->json([
          'success' => true,
          'statusCode' => 201,
          'message' => 'User has been registered successfully.',
          'data' => $user,
      ], 201);
    }

  

    public function logout(){
      $user = Auth::user();

      
      DB::table('oauth_access_tokens')
          ->where('user_id', $user->id)
          ->update(['revoked' => true]);
          
      return response()->json([
        'success' => true,
        'statusCode' => 204,
        'message' => 'Logged out successfully.',
    ], 200);
    }
}
