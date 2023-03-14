<section>

    @vite(['resources/css/user.css'])

    <header>
        <h2 class="text-lg font-medium text-gray-900">
            {{ __('Profiel informatie') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600">
            {{ __("Verander hier uw gegevens.") }}
        </p>
    </header>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ route('profile.update') }}" class="mt-6 space-y-6" enctype="multipart/form-data">
        @csrf
        @method('patch')

        <div class="row center">
  
            <!-- foto -->
            <div class="profile-picture" id="profile-picture" style="background-image:url('images/{{ $user->picture }}')">
              <div style="width: 100%; height: 100%;">
                <input type="file" accept="image/jpeg,image/jpg,image/png" name="image">
              </div>
            </div>
            
        </div>

        <div class="mt-4">
            <x-input-label for="name" :value="__('Naam')" />
            <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $user->name)" required autofocus autocomplete="name" />
            <x-input-error class="mt-2" :messages="$errors->get('name')" />
        </div>

        <div class="mt-4">
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" name="email" type="email" class="mt-1 block w-full" :value="old('email', $user->email)" required autocomplete="username" />
            <x-input-error class="mt-2" :messages="$errors->get('email')" />

            @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail())
                <div>
                    <p class="text-sm mt-2 text-gray-800">
                        {{ __('Your email address is unverified.') }}

                        <button form="send-verification" class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {{ __('Click here to re-send the verification email.') }}
                        </button>
                    </p>

                    @if (session('status') === 'verification-link-sent')
                        <p class="mt-2 font-medium text-sm text-green-600">
                            {{ __('A new verification link has been sent to your email address.') }}
                        </p>
                    @endif
                </div>
            @endif
        </div>

        <!-- Age -->
        <div class="mt-4">
            <x-input-label for="age" :value="__('Leeftijd')" />
            <x-text-input id="age" class="block mt-1 w-full" type="number" name="age" :value="old('age', $user->age)" required autocomplete="age" />
            <x-input-error :messages="$errors->get('age')" class="mt-2" />
        </div>

        <!-- Job -->
        <div class="mt-4">
            <x-input-label for="job" :value="__('Job/studie')" />
            <x-text-input id="job" class="block mt-1 w-full" type="text" name="job" :value="old('job', $user->job)" required autocomplete="job" />
            <x-input-error :messages="$errors->get('job')" class="mt-2" />
        </div>

        <!-- associations -->
        <div class="mt-4">
            <x-input-label for="association" :value="__('Kring')" />
            <x-text-input id="association" class="block mt-1 w-full" type="text" name="association" :value="old('association', $user->association)" required autocomplete="association" />
            <x-input-error :messages="$errors->get('association')" class="mt-2" />
        </div>

        <div class="mt-4 flex items-center gap-4">
            <x-primary-button>{{ __('Opslaan') }}</x-primary-button>

            @if (session('status') === 'profile-updated')
                <p
                    x-data="{ show: true }"
                    x-show="show"
                    x-transition
                    x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600"
                >{{ __('Opgeslagen.') }}</p>
            @endif
        </div>
    </form>
</section>
