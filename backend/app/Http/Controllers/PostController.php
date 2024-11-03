<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\PostsRequest;
use App\Http\Requests\updatepostRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Resources\PostsResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PostController extends Controller
{
  use AuthorizesRequests;
  
    public function index(){
      $blog = Post::orderBy('created_at','DESC')->get();

      return response()->json([
        'success'=>true,
        'data'=>$blog
      ],200);
    }

public function show($slug){
  $blog = Post::where('slug',$slug)->first();
  if($blog == null){
    return response()->json([
      'message'=>'no post found'
    ],401);
  }else{
    return response()->json([
      'success'=>true,
      'data'=>new PostsResource($blog)
    ],200);
  }
}

    public function create(PostsRequest $request){

      if($request->hasFile("image")){
        $slug = Str::slug($request->input('title'));
        $imagefile = $request->file("image");
        $imagename = uniqid().'-'.$slug.'.'.$imagefile->getClientOriginalExtension();
        $imagefile->move(public_path('images'),$imagename);
      }
      $count=Post::where('slug',$slug)->count();
        if($count>0){
            $slug=$slug.'-'.date('ymdis').'-'.rand(0,999);
        }
        $post = Post::create([
          'user_id' => Auth::id(),
          'title' => $request->input('title'),
          'description' => $request->input('description'),
          'slug' => $slug,
          'image_path'=>$imagename
      ]);
      return response()->json([
        'data'=> new PostsResource($post)
      ]);
    }

    public function update(Request $request, $slug)
{
    $post = Post::where('slug', $slug)->firstOrFail();
    if($post == null){
      return response()->json([
        'message'=>'no post found'
      ],401);
    }
    $post->title = $request->input('title');
		$post->description = $request->input('description');
		$post->slug = Str::slug($request->input('title'));
    $this->authorize('update',$post);
    $post->save();
    return response()->json(['success' => true, 'data' => $post], 200);
}
public function destroy($slug){
  $post = Post::where('slug', $slug)->firstOrFail();
  if($post == null){
    return response()->json([
      'message'=>'no post found'
    ],401);
  }else{
    $this->authorize('delete',$post);
    $post->delete();
    return response()->json([
      'message'=>'deleted successfuly'
    ],200);
  }

  

}
  
}
