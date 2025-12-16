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
    Schema::create('pasiens', function (Blueprint $table) {
        $table->id();
        $table->string('nama');
        $table->string('nik')->unique();
        $table->enum('jenis_kelamin', ['L', 'P']);
        $table->date('tanggal_lahir');
        $table->string('golongan_darah')->nullable();
        $table->string('alamat');
        $table->string('no_telepon')->nullable();
        $table->string('riwayat_penyakit')->nullable();
        $table->string('alergi_obat')->nullable();
        $table->string('telepon_kontak_darurat')->nullable();
        $table->date('tanggal_periksa_terakhir')->nullable();
        $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasiens');
    }
};
