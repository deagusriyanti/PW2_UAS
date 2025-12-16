<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use Illuminate\Http\Request;

class PasienController extends Controller
{
    public function index()
    {
        return response()->json(Pasien::all());
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
            'nama_kontak_darurat' => 'nullable|string',
            'telepon_kontak_darurat' => 'nullable|string',
            'tanggal_periksa_terakhir' => 'nullable|date'
        ]);

        $pasien = Pasien::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Data pasien berhasil ditambahkan',
            'data' => $pasien
        ]);
    }

    public function show($id)
    {
        return response()->json(Pasien::findOrFail($id));
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
            'telepon_kontak_darurat' => 'nullable|string',
            'tanggal_periksa_terakhir' => 'nullable|date'
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
