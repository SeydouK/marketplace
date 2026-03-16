@props(['image', 'title', 'location', 'price', 'rating', 'animalType' => null])

<a href="#" class="group cursor-pointer">
    <div class="relative aspect-square rounded-xl overflow-hidden mb-3">
        <!-- Image -->
        <img 
            src="{{ $image }}" 
            alt="{{ $title }}"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        >
        
        <!-- Favorite button -->
        <button class="absolute top-3 right-3 p-2 hover:scale-110 transition-transform">
            <svg class="w-6 h-6 fill-none stroke-white stroke-2 hover:fill-red-500 hover:stroke-red-500" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
        </button>

        @if($rating)
        <!-- Rating badge -->
        <div class="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
            <svg class="w-4 h-4 fill-current text-red-600" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span class="text-sm font-semibold">{{ $rating }}</span>
        </div>
        @endif
    </div>

    <!-- Info -->
    <div class="space-y-1">
        <div class="flex justify-between items-start">
            <h3 class="font-semibold text-gray-900 line-clamp-1">{{ $title }}</h3>
        </div>
        <p class="text-gray-500 text-sm">{{ $location }}</p>
        <p class="text-gray-500 text-sm">{{ $animalType }}</p>
        <div class="flex items-baseline gap-1">
            <span class="font-semibold text-gray-900">{{ number_format($price, 0, ',', ' ') }} FCFA</span>
            <span class="text-gray-500 text-sm">/ unité</span>
        </div>
    </div>
</a>