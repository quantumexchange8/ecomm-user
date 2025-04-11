<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
class Cart extends Model 
{
    use HasFactory, InteractsWithMedia;

        protected $fillable = ['user_id', 'total_amount'];
    
        public function items()
        {
            return $this->hasMany(CartItem::class);
        }
        public function categories(): \Illuminate\Database\Eloquent\Relations\BelongsTo
        {
            return $this->BelongsTo(Category::class, 'category_id', 'id');
        }
}
