<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'animal_type',
        'price',
        'location',
        'seller_name',
        'seller_phone',
        'image',
        'rating',
        'age_months',
        'breed',
        'status',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'rating' => 'decimal:1',
        'age_months' => 'integer',
    ];
}