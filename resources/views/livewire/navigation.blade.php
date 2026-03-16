<div class="min-h-screen bg-white">

    {{-- Header - Passez la variable $page --}}
    <header>
        @include('components.header', ['page' => $page])
    </header>

    {{-- Body --}}
    <main class="mt-6 px-6">
        @if($page === 'homes')
            @include('homes', [
                'abidjanListings' => $abidjanListings ?? [],
                'bouakeListings' => $bouakeListings ?? [],
                'korhogoListings' => $korhogoListings ?? [],
                'ferkeListings' => $ferkeListings ?? [],
            ])
        @elseif($page === 'dashboard')
            @include('dashboard-marketplace')
        @elseif($page === 'experiences')
            @include('experiences')
        @elseif($page === 'services')
            @include('services')
        @endif
    </main>

    {{-- Footer --}}
    <footer>
        @include('components.footer')
    </footer>

</div>