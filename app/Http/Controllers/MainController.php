<?php

namespace App\Http\Controllers;

use App\Models\Main;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function main()
    {
        $products = Main::with('media')->get()->map(function ($product) {
        return[
                'id' => $product->id,
                'name' => $product->name,
                'sku' => $product->sku,
                'description' => $product->description,
                'price' => $product->price,
                'stock' => $product->stock,
                'category_id' => $product->category_id,
                'weight' => $product->weight,
                'width' => $product->width,
                'length' => $product->length,
                'height' => $product->height,
                'fragile' => $product->fragile,
                'status' => $product->status,
                'image' => $product->getFirstMediaUrl('product_images'), 
        ];
        });

        return Inertia::render('Main/main' , ['products' => $products]);
    }
  
}
