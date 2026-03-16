<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('animal_type'); // poulet, mouton, boeuf, chèvre, etc.
            $table->decimal('price', 10, 2);
            $table->string('location'); // Abidjan, Bouaké, Korhogo, etc.
            $table->string('seller_name');
            $table->string('seller_phone');
            $table->string('image')->nullable();
            $table->decimal('rating', 2, 1)->nullable(); // 4.5, 5.0, etc.
            $table->integer('age_months')->nullable(); // âge en mois
            $table->string('breed')->nullable(); // race de l'animal
            $table->enum('status', ['disponible', 'réservé', 'vendu'])->default('disponible');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};