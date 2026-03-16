<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Listing;

class ListingSeeder extends Seeder
{
    public function run(): void
    {
        // Créer 10 annonces pour chaque ville principale
        $cities = ['Abidjan', 'Bouaké', 'Korhogo', 'Ferkessédougou'];
        
        foreach ($cities as $city) {
            Listing::factory()
                ->count(10)
                ->create(['location' => $city]);
        }

        // Créer 20 annonces supplémentaires aléatoires
        Listing::factory()->count(20)->create();
    }
}