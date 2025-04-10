<?php

namespace App\Http\Controllers;

use App\Models\Main;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function main()
    {

        return Inertia::render('Main/main');
    }

    public function getProductListing()
{
    $products = Product::with('media', 'categories')->get();

    $products->each(function($product) {
        $product->image = $product->getFirstMediaUrl('product_images');
        $product->category_name = $product->categories ? $product->categories->name : 'Unknown';
    });

    return response()->json($products);
}

   
    
}
