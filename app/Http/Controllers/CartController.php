<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function cart()
    {
        return Inertia::render('Main/Cart');
    }
}
