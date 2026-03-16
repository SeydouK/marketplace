<div class="absolute right-0 top-full mt-2 bg-white w-80 shadow-xl rounded-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
    
    {{-- Header avec icône --}}
    <div class="flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
        <div class="flex items-center justify-center w-10 h-10 bg-red-50 rounded-full">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        </div>
        <div class="flex-1">
            <h2 class="font-semibold text-gray-900">Centre d'aide</h2>
            <p class="text-xs text-gray-500">Besoin d'assistance ?</p>
        </div>
    </div>

    {{-- Section vendeur mise en avant --}}
    <div class="p-4 bg-gradient-to-br from-red-50 to-orange-50 border-b border-gray-100">
        <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </div>
            <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-1">Devenir vendeur</h3>
                <p class="text-xs text-gray-600 leading-relaxed mb-2">
                    Rejoignez notre marketplace et commencez à vendre !
                </p>
                <button class="text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1 group">
                    En savoir plus
                    <svg class="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    {{-- Menu items --}}
    <div class="py-2">
        <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Parrainez un vendeur</span>
        </a>
        
        <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Trouver un co-vendeur</span>
        </a>
        
        <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
            </svg>
            <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Cartes cadeaux</span>
        </a>
    </div>

    {{-- Login/Signup section --}}
    <div class="border-t border-gray-100 p-4">
        @guest
            {{-- Boutons pour utilisateurs non connectés --}}
            <div class="flex flex-col gap-3">
                <a href="{{ route('login') }}" class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                    </svg>      
                    Connexion
                </a>
                
                <a href="{{ route('register') }}" class="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                    </svg>
                    Inscription
                </a>
            </div>
        @endguest

        @auth
            {{-- Menu pour utilisateurs connectés --}}
            <div class="flex flex-col gap-3">
                {{-- Info utilisateur --}}
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {{ strtoupper(substr(Auth::user()->name, 0, 1)) }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-medium text-gray-900 truncate">{{ Auth::user()->name }}</p>
                        <p class="text-sm text-gray-500 truncate">{{ Auth::user()->email }}</p>
                    </div>
                </div>

                {{-- Liens dashboard --}}
                <a href="{{ route('dashboard') }}" class="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                    </svg>
                    Mon Dashboard
                </a>

                <a href="{{ route('profile.edit') }}" class="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    Mon Profil
                </a>

                {{-- Ces routes n'existent pas encore, à créer plus tard --}}
                {{-- 
                <a href="/mes-annonces" class="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Mes Annonces
                </a>

                <a href="/creer-annonce" class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Créer une Annonce
                </a>
                --}}

                {{-- Déconnexion - VERSION CORRECTE avec formulaire POST --}}
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="w-full bg-white hover:bg-red-50 text-red-600 font-medium py-2.5 px-4 rounded-lg transition-colors border border-red-200 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        Déconnexion
                    </button>
                </form>
            </div>
        @endauth
    </div>

</div>

{{-- Animation CSS --}}
<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fadeIn {
        animation: fadeIn 0.2s ease-out;
    }
</style>