<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('kunjungans', function (Blueprint $table) {
        $table->id();
        $table->foreignId('pasien_id')->constrained('pasiens')->onDelete('cascade');
        $table->date('tanggal_kunjungan');
        $table->text('keluhan')->nullable();
        $table->text('diagnosa')->nullable();
        $table->text('tindakan')->nullable();
        $table->string('dokter')->nullable();
        $table->text('catatan')->nullable();
        $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kunjungans');
    }
};
