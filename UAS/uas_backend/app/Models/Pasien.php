<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    protected $fillable = [
        'nama',
        'nik',
        'jenis_kelamin',
        'tanggal_lahir',
        'golongan_darah',
        'alamat',
        'no_telepon',
        'riwayat_penyakit',
        'alergi_obat',
        'telepon_kontak_darurat',
        'tanggal_periksa_terakhir'
    ];

    public function kunjungan()
    {
        return $this->hasMany(Kunjungan::class);
    }
}
