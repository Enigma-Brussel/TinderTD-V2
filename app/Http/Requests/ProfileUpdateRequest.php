<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'name' => ['string', 'max:255'],
            'picture' => ['required', 'image', 'mimes:png,jpg,jpeg', 'max:2048'],
            'superlikes' => ['integer'],
            'age' => ['integer'],
            'job' => ['string', 'max:255'],
            'association' => ['string', 'max:255'],
            'bio' => ['string', 'max:255'],

        ];
    }
}
