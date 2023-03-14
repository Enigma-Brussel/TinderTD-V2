<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Tinder TD') }}</title>

        <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        @livewireStyles

        @vite(['resources/css/main.css', 'resources/js/app.js'])
        <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.1/dist/flowbite.min.css" />
        

    </head>
    <body class="antialiased">

        <!-- Container -->
        <div class="container">

            <!-- Save zone -->
            <div class="save-zone">

                <!-- Top -->
                <div class="top-bar row space-between align-center">
                    <!-- profiel -->
                    <a href="{{ route('settings') }}"><img class="icon-button" src="{{ asset('icons/user_solid.svg') }}" alt=""></a>
                    <!-- TinderTD logo -->
                    <div><a href="{{ route('match') }}"><img class="small_logo" src="{{ asset('tinder_logo_kleur.svg') }}" alt=""></a></div>
                    <!-- Matches -->
                    <div><a href="{{ route('match') }}"><img class="icon-button" src="{{ asset('icons/comment.svg') }}" alt=""></a></div>
                </div>

                <!-- Content -->

                {{ $slot }}

            </div>

        </div>



        <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>

        @livewireScripts

    </body>
</html>
