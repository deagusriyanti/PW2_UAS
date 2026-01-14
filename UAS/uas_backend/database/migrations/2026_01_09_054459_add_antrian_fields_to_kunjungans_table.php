<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('kunjungans', function (Blueprint $table) {
    $table->string('status', 30)->nullable()->after('tindakan');
    $table->integer('nomor_antrian')->nullable()->after('status');
});
    }

    public function down()
    {
        Schema::table('kunjungans', function (Blueprint $table) {
            $table->dropColumn(['status', 'nomor_antrian']);
        });
    }
};
