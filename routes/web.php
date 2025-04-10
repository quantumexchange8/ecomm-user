<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\MainController;
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
    Route::get('/store', [CartController::class, 'store']);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
