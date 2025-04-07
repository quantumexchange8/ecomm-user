<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;
    protected $table = 'wallets';

    protected $fillable = [
        'user_id',
        'wallet_type',
        'balance',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
