<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ListingFactory extends Factory
{
    public function definition(): array
    {
        $animalTypes = [
            'mouton' => [
                'breeds' => ['Tabaski', 'Djallonké', 'Peul', 'Touareg'],
                'price_range' => [80000, 250000],
                'age_range' => [6, 24],
            ],
            'boeuf' => [
                'breeds' => ['Zébu', 'N\'Dama', 'Baoulé', 'Taurin'],
                'price_range' => [350000, 800000],
                'age_range' => [12, 60],
            ],
            'chèvre' => [
                'breeds' => ['Naine', 'Sahélienne', 'Djallonké'],
                'price_range' => [35000, 120000],
                'age_range' => [6, 18],
            ],
            'poulet' => [
                'breeds' => ['Fermier', 'Bicyclette', 'Chair', 'Pondeuse'],
                'price_range' => [2500, 8000],
                'age_range' => [2, 12],
            ],
            'porc' => [
                'breeds' => ['Local', 'Large White', 'Duroc', 'Landrace'],
                'price_range' => [45000, 180000],
                'age_range' => [4, 18],
            ],
        ];

        $animalType = $this->faker->randomElement(array_keys($animalTypes));
        $animalData = $animalTypes[$animalType];
        $breed = $this->faker->randomElement($animalData['breeds']);
        $price = $this->faker->numberBetween($animalData['price_range'][0], $animalData['price_range'][1]);
        $ageMonths = $this->faker->numberBetween($animalData['age_range'][0], $animalData['age_range'][1]);

        $locations = ['Abidjan', 'Bouaké', 'Korhogo', 'Ferkessédougou', 'Yamoussoukro', 'San-Pédro'];
        $location = $this->faker->randomElement($locations);

        $titles = [
            'mouton' => "Mouton {$breed} de qualité",
            'boeuf' => "Bœuf {$breed} excellent état",
            'chèvre' => "Chèvre {$breed} en bonne santé",
            'poulet' => "Poulets {$breed} élevés en plein air",
            'porc' => "Porc {$breed} prêt à la vente",
        ];

        $imageUrls = [
            'mouton' => 'https://placehold.co/400x400/e5e7eb/6b7280?text=Mouton',
            'boeuf' => 'https://placehold.co/400x400/e5e7eb/6b7280?text=Boeuf',
            'chèvre' => 'https://placehold.co/400x400/e5e7eb/6b7280?text=Chevre',
            'poulet' => 'https://placehold.co/400x400/e5e7eb/6b7280?text=Poulet',
            'porc' => 'https://placehold.co/400x400/e5e7eb/6b7280?text=Porc',
        ];

        return [
            'title' => $titles[$animalType],
            'description' => $this->faker->paragraph(3),
            'animal_type' => $animalType,
            'price' => $price,
            'location' => $location,
            'seller_name' => $this->faker->name(),
            'seller_phone' => '+225 ' . $this->faker->numerify('## ## ## ##'),
            'image' => $imageUrls[$animalType],
            'rating' => $this->faker->randomFloat(1, 4.0, 5.0),
            'age_months' => $ageMonths,
            'breed' => $breed,
            'status' => $this->faker->randomElement(['disponible', 'disponible', 'disponible', 'réservé']), // 75% disponible
        ];
    }
}