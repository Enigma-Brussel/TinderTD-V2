<x-app-layout>

    @vite(['resources/css/dashboard.css'])
    
    <div class="content row">
        @livewire('swipe-cards')     
    </div>

    <!-- Bottom -->
    <div class="bottom-bar row space-evenly" id="bottom-bar">

        <span class="main-button shadow" id="dislike"><img src="{{ asset('icons/x.svg') }}" alt=""></span>
        <span class="main-button shadow" id="superlike"><img src="{{ asset('icons/star.svg') }}" alt=""></span>
        <span class="main-button shadow" id="like"><img src="{{ asset('icons/heart.svg') }}" alt=""></span>

    </div>

</x-app-layout>
