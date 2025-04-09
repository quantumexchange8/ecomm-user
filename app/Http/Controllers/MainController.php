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
        $products = Product::with('media')->get();

        $products->each(function($product) {
            $product->product_name = $product->getFirstMediaUrl('product_images');
        });

        return response()->json($products);
    }
   
    
}
