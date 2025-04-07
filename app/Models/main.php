<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Support\Facades\DB; 
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

    
}
