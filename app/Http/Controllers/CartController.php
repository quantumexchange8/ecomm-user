<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function cart()
    {
        return Inertia::render('Main/Cart');
    }

    public function add(Request $request)
    {
        $user = Auth::user();
    
        $cart = Cart::firstOrCreate(
            ['user_id' => $user->id],
            ['total_amount' => 0]
        );
    
        $item = $cart->items()->where('product_id', $request->product_id)->first();
    
        if ($item) {
        
            $item->quantity += $request->quantity;
            $item->save();
        } else {
            $item = $cart->items()->create([
                'product_id' => $request->product_id,
                'price' => $request->price,
                'quantity' => $request->quantity,
            ]);
        }
        $cart->total_amount = $cart->items->sum(fn ($cartItem) =>
            $cartItem->price * $cartItem->quantity
        );
        $cart->save();
        return response()->json(['success' => true, 'item' => $item]);
    }

    public function fetch()
    {
        $user = Auth::user();
        $cart = Cart::where('user_id', $user->id)
            ->with(['items.product.media', 'items.product.categories'])
            ->first();
        if ($cart) {
            foreach ($cart->items as $item) {
                if ($item->product) {
                    $item->product->image = $item->product->getFirstMediaUrl('product_images');
                    $item->product->category_name = $item->product->categories ? $item->product->categories->name : 'Unknown';
                }
            }
        }
        return response()->json([
            'cart' => $cart
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();
        $cart = Cart::where('user_id', $user->id)->first();

        $item = $cart->items()->where('product_id', $request->product_id)->first();
        $item->quantity = $request->quantity;
        $item->save();

        $cart->total_amount = $cart->items->sum(fn ($item) =>
            $item->price * $item->quantity
        );
        $cart->save();

        return response()->json(['success' => true]);
    }

    public function remove(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
        ]);

        $user = Auth::user();
        $cart = Cart::where('user_id', $user->id)->first();

        $item = $cart->items()->where('product_id', $request->product_id)->first();
        if ($item) {
            $item->delete();
        }

        $cart->total_amount = $cart->items->sum(fn ($item) =>
            $item->price * $item->quantity
        );
        $cart->save();

        return response()->json(['success' => true]);
    }
    
}
