<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use Illuminate\Http\Request;
use App\Models\Kunjungan;
use Carbon\Carbon;


class PasienController extends Controller
{
    public function index()
    {
        return response()->json(
        Pasien::with('kunjungans')->get()
    );
    }

    public function store(Request $request)
{
    $data = $request->validate([
        'nama' => 'required|string|max:100',
        'nik' => 'required|string|unique:pasiens',
        'jenis_kelamin' => 'required|in:L,P',
        'tanggal_lahir' => 'required|date',
        'golongan_darah' => 'nullable|string',
        'alamat' => 'required|string',
        'no_telepon' => 'nullable|string',
        'riwayat_penyakit' => 'nullable|string',
        'alergi_obat' => 'nullable|string',
        'telepon_kontak_darurat' => 'nullable|string'
    ]);

    // 1. SIMPAN PASIEN (LOGIKA LAMA — TIDAK DIUBAH)
    $pasien = Pasien::create($data);

    // 2. BUAT KUNJUNGAN OTOMATIS (JALUR A)
    $today = Carbon::today();

    $lastQueue = Kunjungan::whereDate('tanggal_kunjungan', $today)
        ->max('nomor_antrian');

    $nomorAntrian = $lastQueue ? $lastQueue + 1 : 1;

    Kunjungan::create([
        'pasien_id' => $pasien->id,
        'tanggal_kunjungan' => Carbon::now(),
        'status' => 'MENUNGGU',
        'nomor_antrian' => $nomorAntrian
    ]);

    // 3. RESPONSE TETAP
    return response()->json([
        'status' => true,
        'message' => 'Data pasien berhasil ditambahkan dan masuk antrian',
        'data' => $pasien->load('kunjungans')
    ]);
}

    public function show($id)
{
    return response()->json(
        Pasien::with('kunjungans')->findOrFail($id)
    );
}

    public function update(Request $request, $id)
    {
        $pasien = Pasien::findOrFail($id);

        $data = $request->validate([
            'nama' => 'required|string|max:100',
            'nik' => 'required|string|unique:pasiens,nik,' . $id,
            'jenis_kelamin' => 'required|in:L,P',
            'tanggal_lahir' => 'required|date',
            'golongan_darah' => 'nullable|string',
            'alamat' => 'required|string',
            'no_telepon' => 'nullable|string',
            'riwayat_penyakit' => 'nullable|string',
            'alergi_obat' => 'nullable|string',
            'telepon_kontak_darurat' => 'nullable|string'
        ]);

        $pasien->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Data pasien berhasil diperbarui',
            'data' => $pasien
        ]);
    }

    public function destroy($id)
    {
        Pasien::findOrFail($id)->delete();

        return response()->json([
            'status' => true,
            'message' => 'Data pasien berhasil dihapus'
        ]);
    }
}
