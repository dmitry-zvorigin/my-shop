<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryAlias extends Model
{
    protected $fillable = ['category_id', 'parent_id'];

    public function category() 
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function parent() 
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }
}
