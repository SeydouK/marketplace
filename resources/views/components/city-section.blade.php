@props(['city', 'listings'])

<section class="mb-12">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6 px-4 lg:px-8">
        <div class="flex items-center gap-3">
            <h2 class="text-2xl lg:text-3xl font-semibold text-gray-900">{{ $city }}</h2>
            <a href="#" class="text-gray-600 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </a>
        </div>

        <!-- Desktop navigation buttons -->
        <div class="hidden lg:flex gap-2">
            <button 
                class="scroll-btn-prev p-2 rounded-full border border-gray-300 hover:border-gray-900 hover:shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                data-target="{{ Str::slug($city) }}-scroll"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
            </button>
            <button 
                class="scroll-btn-next p-2 rounded-full border border-gray-300 hover:border-gray-900 hover:shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                data-target="{{ Str::slug($city) }}-scroll"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </button>
        </div>
    </div>

    <script>

    </script>

    <!-- Scrollable grid -->
    <div 
        id="{{ Str::slug($city) }}-scroll"
        class="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[45%] lg:auto-cols-[calc(25%-12px)] gap-4 overflow-x-auto scrollbar-hide px-4 lg:px-8 scroll-smooth snap-x snap-mandatory"
    >
        @foreach($listings as $listing)
            <div class="snap-start">
                <x-listing-card 
                    :image="$listing['image']"
                    :title="$listing['title']"
                    :location="$listing['location']"
                    :price="$listing['price']"
                    :rating="$listing['rating'] ?? null"
                    :animalType="$listing['animalType'] ?? null"
                />
            </div>
        @endforeach
    </div>
</section>