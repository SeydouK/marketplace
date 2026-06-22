<main class="flex-1 overflow-auto bg-white">
    <div class="max-w-[2520px] mx-auto py-8">
        
        <!-- Abidjan Section -->
        <x-city-section 
            city="Abidjan" 
            :listings="$abidjanListings"
        />

        <!-- Bouaké Section -->
        <x-city-section 
            city="Bouaké" 
            :listings="$bouakeListings"
        />

        <!-- Korhogo Section -->
        <x-city-section 
            city="Korhogo" 
            :listings="$korhogoListings"
        />

        <!-- Ferkessédougou Section -->
        <x-city-section 
            city="Ferkessédougou" 
            :listings="$ferkeListings"
        />

    </div>

    <!-- JavaScript centralisé -->
    @push('scripts')
    <script>
        // Gestion universelle du scroll
        document.addEventListener('DOMContentLoaded', function() {
            // Pour chaque bouton précédent
            document.querySelectorAll('.scroll-btn-prev').forEach(btn => {
                btn.addEventListener('click', function() {
                    const targetId = this.dataset.target;
                    const container = document.getElementById(targetId);
                    if (container) {
                        container.scrollBy({ left: -400, behavior: 'smooth' });
                    }
                });
            });

            // Pour chaque bouton suivant
            document.querySelectorAll('.scroll-btn-next').forEach(btn => {
                btn.addEventListener('click', function() {
                    const targetId = this.dataset.target;
                    const container = document.getElementById(targetId);
                    if (container) {
                        container.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                });
            });

            // Observer pour activer/désactiver les boutons selon la position
            document.querySelectorAll('[id$="-scroll"]').forEach(container => {
                const updateButtons = () => {
                    const scrollLeft = container.scrollLeft;
                    const maxScroll = container.scrollWidth - container.clientWidth;
                    
                    const cityName = container.id.replace('-scroll', '');
                    const prevBtn = document.querySelector(`.scroll-btn-prev[data-target="${container.id}"]`);
                    const nextBtn = document.querySelector(`.scroll-btn-next[data-target="${container.id}"]`);
                    
                    if (prevBtn) prevBtn.disabled = scrollLeft <= 0;
                    if (nextBtn) nextBtn.disabled = scrollLeft >= maxScroll - 1;
                };

                container.addEventListener('scroll', updateButtons);
                updateButtons(); 
            });
        });
    </script>
    @endpush
</main>