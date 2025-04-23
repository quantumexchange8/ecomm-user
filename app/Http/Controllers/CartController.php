<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Wallet;
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
    public function checkout(Request $request)
{
    $user = Auth::user();
    $cart = Cart::with('items')->where('user_id', $user->id)->first();

    if (!$cart || $cart->items->isEmpty()) {
        return response()->json(['error' => 'Cart is empty.'], 400);
    }

    $totalAmount = $cart->items->sum(function ($item) {
        return $item->price * $item->quantity;
    });

    // Get user's wallet
    $wallet = Wallet::where('user_id', $user->id)->first();

    if (!$wallet || $wallet->balance < $totalAmount) {
        return response()->json(['error' => 'Insufficient wallet balance.'], 400);
    }

    // Deduct from wallet
    $wallet->balance -= $totalAmount;
    $wallet->save();

    // Create order
    $order = Order::create([
        'user_id' => $user->id,
        'total_price' => $totalAmount,

    ]);

    foreach ($cart->items as $item) {
        $order->items()->create([
            'product_id' => $item->product_id,
            'price' => $item->price,
            'quantity' => $item->quantity,
        ]);
    }

    // Clear the cart
    $cart->items()->delete();
    $cart->total_amount = 0;
    $cart->save();

    return response()->json(['success' => true, 'order_id' => $order->id]);
}

}
