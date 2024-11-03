<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
      return [
        'id' => $this->id,
        'title' => $this->title,
        'description' => $this->description,
        'slug' =>$this->slug,
        'image'=>$this->image_path,
        'username'=>$this->user->name,
        'createdat'=>$this->created_at->diffForHumans(),
      ];
    }
}
