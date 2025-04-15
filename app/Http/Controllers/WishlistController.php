<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function wishlist()
    {
        return Inertia::render('Main/Wishlist');
    }
    public function fetch()
{
    $wishlistItems = Auth::user()->wishlist()->with('product.media')->get();

    return response()->json([
        'wishlistItems' => $wishlistItems
    ]);
}

public function wishlistAdd(Request $request)
{
    $user = Auth::user();

    Wishlist::firstOrCreate([
        'user_id' => $user->id,
        'product_id' => $request->product_id,
    ]);

    return response()->json(['success' => true]);
}

    public function wishlistRemove(Request $request)
    {
        $user = Auth::user();
        $user->wishlist()->where('product_id', $request->product_id)->delete();

        return response()->json(['success' => true]);
    }

}
