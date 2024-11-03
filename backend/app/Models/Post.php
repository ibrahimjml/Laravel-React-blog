<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
  protected $fillable = [
    'title',
    'slug',
    'description',
    'user_id',
    'image_path'
  ];

  public function user()
  {  
    return $this->belongsTo(User::class, 'user_id');
  }
}
