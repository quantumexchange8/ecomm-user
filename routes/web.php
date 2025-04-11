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
    Route::post('/add', [CartController::class, 'add'])->middleware('auth');
    Route::get('/fetch', [CartController::class, 'fetch']);
    Route::post('/update', [CartController::class, 'update']);
    Route::post('/remove', [CartController::class, 'remove']);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
