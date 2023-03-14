<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Connection extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_one',
        'user_two',
        'match_type',
        'match_complete'
    ];

    public function user_one(){
        return $this->belongsTo('App\Models\User');
    }

    public function user_two(){
        return $this->belongsTo('App\Models\User');
    }
}
