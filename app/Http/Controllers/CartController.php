<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function cart()
    {
        return Inertia::render('Main/Cart');
    }

    public function store(Request $request)
{
    $request->validate([
        'items' => 'required|array',
        'items.*.product_id' => 'required|exists:products,id',
        'items.*.price' => 'required|numeric',
        'items.*.quantity' => 'required|integer|min:1',
    ]);

    $user = Auth::user();
    $total = collect($request->items)->sum(function ($item) {
        return $item['price'] * $item['quantity'];
    });

    $cart = Cart::create([
        'user_id' => $user->id,
        'total_amount' => $total,
    ]);

    foreach ($request->items as $item) {
        $cart->items()->create([
            'product_id' => $item['product_id'],
            'price' => $item['price'],
            'quantity' => $item['quantity'],
        ]);
    }

    return response()->json(['message' => 'Cart saved successfully', 'cart_id' => $cart->id]);
}

}
