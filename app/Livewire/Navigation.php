<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Listing;

class Navigation extends Component
{
    public $page = 'homes';

    public $menu = false;
    public $abidjanListings = [];
    public $bouakeListings = [];
    public $korhogoListings = [];
    public $ferkeListings = [];
    public $animalFilter = '';


    public function mount()
    {
        $this->loadListings();
    }

    public function switchPage($page)
    {
        // Vérifier si c'est une page auth
        if ($page === 'dashboard' && Auth::check()) {
            return redirect()->route('dashboard');
        }
        
        $this->page = $page;
        
        if ($page === 'homes') {
            $this->loadListings();
        }
    }

    /*public function toggleMenu()
    {
        $this->menu = !$this->menu;
    }*/

    private function loadListings()
    {
        try {
            $this->abidjanListings = Listing::where('location', 'Abidjan')
                ->when($this->animalFilter, function ($query) {
                    $query->where('animal_type', $this->animalFilter);
                })
                ->get();

            $this->bouakeListings = Listing::where('location', 'Bouaké')
                ->when($this->animalFilter, function ($query) {
                    $query->where('animal_type', $this->animalFilter);
                })
                ->get();

            $this->korhogoListings = Listing::where('location', 'Korhogo')
                ->when($this->animalFilter, function ($query) {
                    $query->where('animal_type', $this->animalFilter);
                })
                ->get();

            $this->ferkeListings = Listing::where('location', 'Ferkessédougou')
                ->when($this->animalFilter, function ($query) {
                    $query->where('animal_type', $this->animalFilter);
                })
                ->get();

        } catch (\Exception $e) {
            $this->abidjanListings = collect([]);
            $this->bouakeListings = collect([]);
            $this->korhogoListings = collect([]);
            $this->ferkeListings = collect([]);
        }
    }
    public function setAnimalFilter($type)
    {
        $this->animalFilter = $type;
        $this->loadListings();
    }

    public function render()
    {
        $data = [];
        
        if ($this->page === 'homes') {
            $data = [
                'abidjanListings' => $this->abidjanListings,
                'bouakeListings' => $this->bouakeListings,
                'korhogoListings' => $this->korhogoListings,
                'ferkeListings' => $this->ferkeListings,
            ];
        }
        
        if ($this->page === 'dashboard' && !Auth::check()) {
            return redirect()->route('login');
        }
        
        return view('livewire.navigation', $data);
    }
}