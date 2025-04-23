<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    
    use HasFactory;
    protected $table = 'orders';

    protected $fillable = [
        'user_id',
        'total_price',
        'order status',
        'discount',
        'tracking_number',
        'payment_status',
        'shipping_status',
        'shipping_method',
        'estimated_delivery',
    ];

}
