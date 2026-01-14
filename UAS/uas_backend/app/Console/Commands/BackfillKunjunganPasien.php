<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Pasien;
use App\Models\Kunjungan;
use Carbon\Carbon;

class BackfillKunjunganPasien extends Command
{
    protected $signature = 'kunjungan:backfill';
    protected $description = 'Buat kunjungan awal untuk pasien lama yang belum punya kunjungan';

    public function handle()
    {
        $this->info('Mulai backfill kunjungan pasien...');

        $pasienTanpaKunjungan = Pasien::doesntHave('kunjungans')->get();

        if ($pasienTanpaKunjungan->isEmpty()) {
            $this->info('Semua pasien sudah punya kunjungan 👍');
            return;
        }

        foreach ($pasienTanpaKunjungan as $pasien) {
            Kunjungan::create([
                'pasien_id' => $pasien->id,
                'tanggal_kunjungan' => $pasien->created_at,
                'keluhan' => 'Kunjungan awal (auto)',
                'status' => 'SELESAI',
                'nomor_antrian' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            $this->line("✔ Kunjungan dibuat untuk: {$pasien->nama}");
        }

        $this->info('Backfill selesai ✅');
    }
}
