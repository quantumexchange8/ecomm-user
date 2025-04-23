<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/main', [MainController::class, 'main']);
    Route::get('/cart', [CartController::class, 'cart']);
    Route::get('/getProductListing', [MainController::class, 'getProductListing']);
    Route::post('/add', [CartController::class, 'add'])->middleware('auth');
    Route::get('/fetch', [CartController::class, 'fetch']);
    Route::post('/update', [CartController::class, 'update']);
    Route::post('/remove', [CartController::class, 'remove']);
    Route::post('/checkout', [CartController::class, 'checkout']);

    Route::get('/wishlist', [WishlistController::class, 'wishlist']);
    Route::post('/wishlistAdd', [WishlistController::class, 'wishlistAdd']);
    Route::post('/wishlistRemove', [WishlistController::class, 'wishlistRemove']);
    Route::get('/wishlistfetch', [WishlistController::class, 'wishlistfetch']);


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
