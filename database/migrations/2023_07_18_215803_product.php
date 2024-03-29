<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
     {
        Schema::create('products', function(Blueprint $table){
          $table->id();
          $table->string('name');
          $table->string('price_unit');
          $table->string('image');
          $table->integer('quantity');
          $table->unsignedBigInteger('brand_id');
          $table->text('product_description')->nullable();
          $table->boolean('logical_delete')->nullable();
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::dropIfExists('products');
    }
};
