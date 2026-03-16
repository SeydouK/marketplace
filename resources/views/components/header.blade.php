{{-- Header --}}
<div class="border-2 h-90 w-full px-4 bg-[#f7f7f7]">

   {{-- Mobile header --}}
    <div class="flex flex-col md:hidden">
        {{-- Search bar mobile --}}
        <button class="flex items-center gap-3 mx-4 my-4 px-4 py-3 bg-white rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <img src="{{ asset('images/find_black.png') }}" alt="search" class="w-5 h-5">   
            <span class="text-gray-600 text-sm">Rechercher un animal...</span>      
        </button>

        {{-- Nav mobile --}}
        <div class="flex justify-around border-t border-gray-200 pt-2 pb-3">
            <div class="flex flex-col items-center gap-1 {{ $page === 'homes' ? 'text-red-600' : 'text-gray-500' }}">
                <button wire:click="switchPage('homes')" class="flex flex-col items-center">
                    <img src="{{ asset('images/home.png') }}" class="h-6 w-6">
                    <span class="text-xs mt-1">Accueil</span>
                </button>
            </div>

            <div class="flex flex-col items-center gap-1 {{ $page === 'experiences' ? 'text-red-600' : 'text-gray-500' }}">
                <button wire:click="switchPage('experiences')" class="flex flex-col items-center">
                    <img src="{{ asset('images/light-bulb.png') }}" class="h-6 w-6">
                    <span class="text-xs mt-1">Expériences</span>
                </button>
            </div>

            <div class="flex flex-col items-center gap-1 {{ $page === 'services' ? 'text-red-600' : 'text-gray-500' }}">
                <button wire:click="switchPage('services')" class="flex flex-col items-center">
                    <img src="{{ asset('images/bell.png') }}" class="h-6 w-6">
                    <span class="text-xs mt-1">Services</span>
                </button>
            </div>
        </div>
    </div>

   {{-- Sub header amélioré --}}
    <div class="hidden md:flex justify-between items-center w-full px-8 py-4">
        {{-- Logo --}}
        <div class="flex-shrink-0">
            <img src="{{ asset('images/airbnb-desktop.png') }}" class="h-10 w-auto" alt="Marketplace Bétail">
        </div>
        
        {{-- Nav centrée --}}
        <div class="flex gap-8 text-base font-medium">
            <button 
                wire:click="switchPage('homes')" 
                class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors {{ $page === 'homes' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-100' }}">
                <img src="{{ asset('images/home.png') }}" class="h-5 w-5">
                <span>Accueil</span>
            </button>

            <button 
                wire:click="switchPage('experiences')" 
                class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors {{ $page === 'experiences' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-100' }}">
                <img src="{{ asset('images/light-bulb.png') }}" class="h-5 w-5">
                <span>Annonces</span>
            </button>

            <button 
                wire:click="switchPage('services')" 
                class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors {{ $page === 'services' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-100' }}">
                <img src="{{ asset('images/bell.png') }}" class="h-5 w-5">
                <span>Services</span>
            </button>
        </div>

        {{-- Right buttons --}}
        <div class="flex gap-3">
            <button class="flex items-center justify-center bg-white border border-gray-200 rounded-lg w-10 h-10 hover:shadow-md transition-shadow">
                <img src="images/globe.png" alt="language" class="h-5 w-5">
            </button>
            
            <div class="relative" x-data="{ open: false }" @click.away="open = false">
                <button @click="open = !open"
                    class="flex items-center justify-center bg-white border border-gray-200 rounded-lg w-10 h-10 hover:shadow-md transition-shadow">
                    <img src="images/menu.png" class="h-5 w-5">
                </button>
                
                <div x-show="open" 
                    x-transition
                    @click.away="open = false">
                    @include('components.hamburger-menu')
                </div>
            </div>
        </div>
    </div>

    {{-- Search Bar --}}
    <div class="hidden md:flex justify-center mt-5">
        <div class="w-full max-w-4xl border rounded-full shadow-xl px-6 py-3">
            <div class="flex justify-between items-center">
                <div class="flex flex-col">
                    <h2>Where</h2>
                    <input type="text" placeholder="Search city or landmark" class="flex-1 outline-none bg-[#f7f7f7]">
                </div>   
                <div class="h-6 w-px bg-gray-300"></div>
                <div class="flex flex-col m-[10px]">
                    <h2>When</h2>
                    <input type="text" placeholder="Add dates" class="flex-1 outline-none border-0 bg-[#f7f7f7]">
                </div>
                <div class="h-6 w-px bg-gray-300"></div>
                <div class="flex flex-col m-[10px]">
                    <h2>Who</h2>
                    <input type="text" placeholder="Add guests" class="flex-1 outline-none bg-[#f7f7f7]">
                </div>
                <button class="flex justify-center items-center rounded-full hover:bg-red-800 bg-red-600 w-[60px] h-[60px]">
                    <img src="{{ asset('images/find.png') }}" alt="search" class="w-auto h-[45px]">
                </button>
            </div>
        </div>
    </div>

    <!-- Category bar  -->
    <div class="flex gap-4 py-6 px-4 overflow-x-auto scrollbar-hide md:justify-center">
        <button wire:click="setAnimalFilter('')" class="group filter_button_container flex-shrink">
            <div class="flex items-center justify-center rounded-full h-16 w-16 border-2 transition-colors
                {{ $animalFilter === '' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 bg-white group-hover:border-red-500' }}">
                
                <img src="{{ asset('images/infinity.png') }}" class="h-8 w-8" alt="">
            </div>
                <span class="text-xs text-gray-600 group-hover:text-red-600">Tout</span>
        </button>

        <button wire:click="setAnimalFilter('poulet')" class="group filter_button_container flex-shrink">
            <div class="flex items-center justify-center rounded-full h-16 w-16 border-2 transition-colors
                {{ $animalFilter === 'poulet' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 bg-white group-hover:border-red-500' }}">
                
                <img src="{{ asset('images/chicken.png') }}" class="h-8 w-8" alt="Poulets">
            </div>
            <span class="text-xs text-gray-600 group-hover:text-red-600">Poulets</span>
        </button>
        
        <button wire:click="setAnimalFilter('boeuf')" class="group filter_button_container flex-shrink">
            <div class="flex items-center justify-center rounded-full h-16 w-16 border-2 transition-colors
                {{ $animalFilter === 'boeuf' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 bg-white group-hover:border-red-500' }}">
                
                <img src="{{ asset('images/cow.png') }}" class="h-8 w-8" alt="Boeufs">
            </div>
            <span class="text-xs text-gray-600 group-hover:text-red-600">Bovins</span>
        </button>
        
        <button wire:click="setAnimalFilter('mouton')" class="group filter_button_container flex-shrink">
            <div class="flex items-center justify-center rounded-full h-16 w-16 border-2 transition-colors
                {{ $animalFilter === 'mouton' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 bg-white group-hover:border-red-500' }}">
                
                <img src="{{ asset('images/sheep.png') }}" class="h-8 w-8" alt="Mountons">
            </div>
            <span class="text-xs text-gray-600 group-hover:text-red-600">Moutons</span>
        </button>
        
        <button wire:click="setAnimalFilter('porc')" class="group filter_button_container flex-shrink">
            <div class="flex items-center justify-center rounded-full h-16 w-16 border-2 transition-colors
                {{ $animalFilter === 'porc' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 bg-white group-hover:border-red-500' }}">
                
                <img src="{{ asset('images/pig.png') }}" class="h-8 w-8" alt="Porcs">
            </div>
            <span class="text-xs text-gray-600 group-hover:text-red-600">Porcs</span>
        </button>
    </div>

</div>