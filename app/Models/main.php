<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
class Main extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    protected $table = 'products';

    protected $fillable = [
        'name',
        'sku',
        'description',
        'price',
        'stock',
        'category_id',
        'weight',
        'width',
        'length',
        'height',
        'fragile',
        'status',
    ];

    public function getImageUrlAttribute()
    {
        return $this->getFirstMediaUrl('product_images') ?: null; 
    }

    public function categories(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->BelongsTo(Category::class, 'category_id', 'id');
    }
}
